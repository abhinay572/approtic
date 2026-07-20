import SwiftUI

/// Drives the scripted coach conversation (screen 1).
/// Motion contract (CLAUDE.md): 900ms typing dots before each coach message;
/// chips cascade 50ms apart; selected chip morphs to user bubble; the rest
/// fade → collapse.
@Observable
final class CoachChatViewModel {
    private let service: DataService
    private var stepIndex = 0
    private var script: [ChatScriptStep] { service.coachScript }

    var coachName: String { service.coachName }
    var messages: [ChatMessage] = []
    var isTyping = false
    var chips: [ChatChip] = []
    /// How many chips have cascaded in so far.
    var visibleChipCount = 0
    /// The chip currently morphing into a user bubble (kept for geometry match).
    var selectedChipID: UUID?
    var finished = false

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
        guard stepIndex < script.count else { return }
        let step = script[stepIndex]

        for line in step.coachLines {
            // 900ms typing dots before each coach message
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

        // chips cascade 50ms apart
        chips = step.chips.map { ChatChip(label: $0) }
        visibleChipCount = 0
        for i in 1...chips.count {
            try? await Task.sleep(for: .seconds(DS.Motion.chipCascade))
            guard !Task.isCancelled else { return }
            withAnimation(DS.Motion.bubbleSpring) { visibleChipCount = i }
        }
    }

    @MainActor
    func select(_ chip: ChatChip) {
        guard selectedChipID == nil else { return }
        selectedChipID = chip.id

        // Selected chip morphs to user bubble (matchedGeometryEffect shares
        // chip.id); unselected chips fade → collapse.
        withAnimation(DS.Motion.bubbleSpring) {
            messages.append(ChatMessage(id: chip.id, role: .user, text: chip.label))
            chips = []
            visibleChipCount = 0
        }

        stepIndex += 1
        runner = Task {
            try? await Task.sleep(for: .milliseconds(450))
            selectedChipID = nil
            await playCurrentStep()
        }
    }
}
