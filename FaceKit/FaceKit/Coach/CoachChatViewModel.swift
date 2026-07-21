import SwiftUI

/// Drives the scripted coach conversation exactly as in the competitor
/// recording: typing dots before every coach line, chips cascade in,
/// single-select chips auto-send (morph to azure user bubble), multi-select
/// shows a black "Done ✓" chip, action steps end in a CTA that presents an
/// interstitial, then the script resumes.
@Observable
final class CoachChatViewModel {
    private let service: DataService
    private var stepIndex = 0
    private var script: [ChatScriptStep] { service.coachScript }

    var coachName: String { service.coachName }
    var userName: String
    var messages: [ChatMessage] = []
    var isTyping = false
    var chips: [ChatChip] = []
    var visibleChipCount = 0
    var selected: Set<UUID> = []
    var morphingChipID: UUID?
    /// Set when an .action CTA fires and the flow should present a cover.
    var pendingInterstitial: String?
    /// Action CTA is enabled only once all coach lines have landed.
    var actionReady = false
    var finished = false
    var progress: Double = 0.06

    var currentStep: ChatScriptStep? {
        stepIndex < script.count ? script[stepIndex] : nil
    }

    private var runner: Task<Void, Never>?

    init(service: DataService = MockDataService.shared, userName: String? = nil) {
        self.service = service
        self.userName = userName ?? service.profile.name
    }

    private func personalize(_ line: String) -> String {
        line.replacingOccurrences(of: "{name}", with: userName)
    }

    func start() {
        guard runner == nil else { return }
        runner = Task { await playCurrentStep() }
    }

    func stop() {
        runner?.cancel()
        runner = nil
    }

    @MainActor
    private func playCurrentStep() async {
        guard let step = currentStep else {
            withAnimation(DS.Motion.bubbleSpring) { finished = true }
            return
        }
        actionReady = false
        withAnimation(DS.Motion.bubbleSpring) { progress = step.progress }

        for line in step.coachLines {
            withAnimation(DS.Motion.bubbleSpring) { isTyping = true }
            try? await Task.sleep(for: .seconds(DS.Motion.typingDots))
            guard !Task.isCancelled else { return }
            withAnimation(DS.Motion.bubbleSpring) {
                isTyping = false
                messages.append(ChatMessage(role: .coach, text: personalize(line)))
            }
            try? await Task.sleep(for: .milliseconds(350))
        }

        switch step.kind {
        case .action:
            withAnimation(DS.Motion.bubbleSpring) { actionReady = true }
        case .chips, .multiChips:
            chips = step.chips.map { ChatChip(label: $0) }
            selected = []
            visibleChipCount = 0
            for i in 1...chips.count {
                try? await Task.sleep(for: .seconds(DS.Motion.chipCascade))
                guard !Task.isCancelled else { return }
                withAnimation(DS.Motion.bubbleSpring) { visibleChipCount = i }
            }
        }
    }

    /// Single-select: auto-send after a beat. Multi-select: toggle.
    @MainActor
    func tap(_ chip: ChatChip) {
        guard let step = currentStep else { return }
        switch step.kind {
        case .chips:
            guard morphingChipID == nil else { return }
            selected = [chip.id]
            Task {
                try? await Task.sleep(for: .milliseconds(220))
                await send(picked: [chip])
            }
        case .multiChips:
            if selected.contains(chip.id) { selected.remove(chip.id) }
            else { selected.insert(chip.id) }
        case .action:
            break
        }
    }

    /// Black "Done ✓" chip for multi-select steps.
    @MainActor
    func commitMulti() {
        let picked = chips.filter { selected.contains($0.id) }
        guard !picked.isEmpty else { return }
        Task { await send(picked: picked) }
    }

    /// Action CTA tapped: either presents an interstitial or just advances.
    @MainActor
    func actionTapped() {
        guard let step = currentStep, step.kind == .action, actionReady else { return }
        stepIndex += 1
        if let interstitial = step.interstitial {
            pendingInterstitial = interstitial
        } else {
            resume()
        }
    }

    /// Called by the flow when an interstitial cover is dismissed.
    @MainActor
    func resume() {
        pendingInterstitial = nil
        runner = Task { await playCurrentStep() }
    }

    @MainActor
    private func send(picked: [ChatChip]) async {
        guard let step = currentStep else { return }
        let label = picked.map(\.label).joined(separator: ", ")
        let morphID = picked.first!.id
        morphingChipID = morphID

        withAnimation(DS.Motion.bubbleSpring) {
            messages.append(ChatMessage(id: morphID, role: .user, text: label))
            chips = []
            visibleChipCount = 0
            selected = []
        }

        stepIndex += 1
        runner = Task {
            try? await Task.sleep(for: .milliseconds(450))
            morphingChipID = nil
            if let interstitial = step.interstitial {
                pendingInterstitial = interstitial
            } else {
                await playCurrentStep()
            }
        }
    }
}
