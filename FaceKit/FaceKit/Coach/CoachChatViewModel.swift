import SwiftUI

/// Drives the scripted coach conversation (reference screens 04–05).
/// Motion contract (CLAUDE.md): 900ms typing dots before each coach message;
/// options cascade 50ms apart; committed selection morphs to a user bubble;
/// the rest fade → collapse.
@Observable
final class CoachChatViewModel {
    private let service: DataService
    private var stepIndex = 0
    private var script: [ChatScriptStep] { service.coachScript }

    var coachName: String { service.coachName }
    var messages: [ChatMessage] = []
    var isTyping = false
    var chips: [ChatChip] = []
    var visibleChipCount = 0
    /// Selected option ids (single- or multi-select per step).
    var selected: Set<UUID> = []
    /// The chip currently morphing into a user bubble.
    var morphingChipID: UUID?
    var finished = false
    /// Onboarding progress bar fill 0...1.
    var progress: Double = 0.25

    var currentStep: ChatScriptStep? {
        stepIndex < script.count ? script[stepIndex] : nil
    }
    var ctaEnabled: Bool { !selected.isEmpty }

    private var runner: Task<Void, Never>?

    init(service: DataService = MockDataService.shared) {
        self.service = service
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
        guard let step = currentStep else { return }

        for line in step.coachLines {
            withAnimation(DS.Motion.bubbleSpring) { isTyping = true }
            try? await Task.sleep(for: .seconds(DS.Motion.typingDots))
            guard !Task.isCancelled else { return }
            withAnimation(DS.Motion.bubbleSpring) {
                isTyping = false
                messages.append(ChatMessage(role: .coach, text: line))
            }
            try? await Task.sleep(for: .milliseconds(350))
        }

        guard !step.chips.isEmpty else {
            withAnimation(DS.Motion.bubbleSpring) { finished = true }
            return
        }

        chips = step.chips.map { ChatChip(label: $0) }
        selected = []
        visibleChipCount = 0
        for i in 1...chips.count {
            try? await Task.sleep(for: .seconds(DS.Motion.chipCascade))
            guard !Task.isCancelled else { return }
            withAnimation(DS.Motion.bubbleSpring) { visibleChipCount = i }
        }
    }

    /// Tap an option row / chip: toggles selection (single-select replaces).
    @MainActor
    func toggle(_ chip: ChatChip) {
        guard let step = currentStep else { return }
        if step.multiSelect {
            if selected.contains(chip.id) { selected.remove(chip.id) }
            else { selected.insert(chip.id) }
        } else {
            selected = [chip.id]
        }
    }

    /// CTA tap: committed selection morphs to an azure user bubble.
    @MainActor
    func commit() {
        guard let step = currentStep, !selected.isEmpty else { return }
        let picked = chips.filter { selected.contains($0.id) }
        let label = picked.map(\.label).joined(separator: "  ·  ") + " ✓"
        let morphID = picked.first!.id
        morphingChipID = morphID

        withAnimation(DS.Motion.bubbleSpring) {
            messages.append(ChatMessage(id: morphID, role: .user, text: label))
            chips = []
            visibleChipCount = 0
            selected = []
            progress = step.progress
        }

        stepIndex += 1
        runner = Task {
            try? await Task.sleep(for: .milliseconds(450))
            morphingChipID = nil
            await playCurrentStep()
        }
    }
}
