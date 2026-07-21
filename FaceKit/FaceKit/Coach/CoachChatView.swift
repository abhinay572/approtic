import SwiftUI

/// Coach chat, styled exactly per the competitor recording:
/// white → azure radial glow, thin progress line, compact left-aligned chips
/// that auto-send, azure user bubbles with "Just now ✓", typing dots,
/// chip→bubble matchedGeometryEffect morph, bottom azure CTA on action steps.
struct CoachChatView: View {
    @State private var vm: CoachChatViewModel
    @Namespace private var morph
    var isOnboarding = true
    /// Flow hook: called with the interstitial id + a resume closure.
    var onInterstitial: ((String, @escaping () -> Void) -> Void)?

    init(isOnboarding: Bool = true,
         userName: String? = nil,
         onInterstitial: ((String, @escaping () -> Void) -> Void)? = nil) {
        _vm = State(initialValue: CoachChatViewModel(userName: userName))
        self.isOnboarding = isOnboarding
        self.onInterstitial = onInterstitial
    }

    var body: some View {
        ZStack {
            DS.Gradients.chatBackground

            VStack(spacing: 0) {
                header
                if isOnboarding { progressLine }

                ScrollViewReader { proxy in
                    ScrollView {
                        VStack(spacing: 8) {
                            ForEach(vm.messages) { message in
                                bubble(for: message).id(message.id)
                            }
                            if vm.isTyping {
                                HStack {
                                    TypingDots()
                                    Spacer(minLength: 60)
                                }
                                .transition(.opacity)
                                .id("typing")
                            }
                            answersArea
                                .padding(.top, 4)
                                .id("answers")
                        }
                        .padding(.horizontal, 20)
                        .padding(.top, 14)
                        .padding(.bottom, 16)
                    }
                    .scrollIndicators(.hidden)
                    .onChange(of: vm.messages.count) {
                        withAnimation(DS.Motion.bubbleSpring) {
                            proxy.scrollTo("answers", anchor: .bottom)
                        }
                    }
                    .onChange(of: vm.isTyping) {
                        if vm.isTyping {
                            withAnimation(DS.Motion.bubbleSpring) {
                                proxy.scrollTo("typing", anchor: .bottom)
                            }
                        }
                    }
                    .onChange(of: vm.visibleChipCount) {
                        withAnimation(DS.Motion.bubbleSpring) {
                            proxy.scrollTo("answers", anchor: .bottom)
                        }
                    }
                }

                if isOnboarding { actionCTA }
            }
        }
        .onAppear { vm.start() }
        .onDisappear { vm.stop() }
        .onChange(of: vm.pendingInterstitial) {
            guard let id = vm.pendingInterstitial else { return }
            onInterstitial?(id) { vm.resume() }
        }
    }

    // MARK: Header

    private var header: some View {
        HStack(spacing: 12) {
            Spacer()
            VStack(spacing: 4) {
                Image("coach-mascot")
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: 44, height: 44)
                    .clipShape(Circle())
                Text(vm.coachName)
                    .font(DS.Typo.sans(15, .semibold))
                    .foregroundStyle(DS.Colors.ink)
                HStack(spacing: 5) {
                    Circle()
                        .fill(DS.Colors.success)
                        .frame(width: 6, height: 6)
                    Text("your personal coach")
                        .font(DS.Typo.sans(12))
                        .foregroundStyle(DS.Colors.secondary)
                }
            }
            Spacer()
        }
        .padding(.top, 4)
        .padding(.bottom, 8)
    }

    // MARK: Thin progress line (video: single azure bar, grows per step)

    private var progressLine: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                Capsule().fill(DS.Colors.ink.opacity(0.07))
                Capsule()
                    .fill(DS.Colors.azure)
                    .frame(width: max(8, geo.size.width * vm.progress))
                    .animation(DS.Motion.bubbleSpring, value: vm.progress)
            }
        }
        .frame(width: 120, height: 3)
        .frame(maxWidth: .infinity)
        .padding(.bottom, 6)
    }

    // MARK: Bubbles

    @ViewBuilder
    private func bubble(for message: ChatMessage) -> some View {
        HStack {
            if message.role == .user { Spacer(minLength: 56) }

            VStack(alignment: .trailing, spacing: 3) {
                Text(message.text)
                    .font(DS.Typo.sans(15))
                    .foregroundStyle(message.role == .coach ? DS.Colors.ink : .white)
                if message.role == .user {
                    Text("Just now ✓")
                        .font(DS.Typo.sans(10, .medium))
                        .foregroundStyle(.white.opacity(0.7))
                }
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 10)
            .background(message.role == .coach ? Color.white : DS.Colors.azure)
            .clipShape(BubbleShape(isUser: message.role == .user))
            .shadow(color: DS.Colors.cardShadow, radius: 8, x: 0, y: 3)
            .modifier(MorphTag(id: message.role == .user ? message.id : nil, namespace: morph))

            if message.role == .coach { Spacer(minLength: 56) }
        }
        .transition(
            .asymmetric(
                insertion: .offset(y: DS.Motion.bubbleSlide).combined(with: .opacity),
                removal: .opacity
            )
        )
    }

    // MARK: Answer chips — compact, left-aligned, auto-send

    @ViewBuilder
    private var answersArea: some View {
        if let step = vm.currentStep, !vm.chips.isEmpty {
            VStack(alignment: .leading, spacing: 8) {
                switch step.layout {
                case .stack:
                    ForEach(visibleChips) { chip in
                        answerChip(chip)
                    }
                case .flow:
                    FlowLayout(spacing: 8) {
                        ForEach(visibleChips) { chip in
                            answerChip(chip)
                        }
                    }
                }
                if step.kind == .multiChips, !vm.selected.isEmpty {
                    Button { vm.commitMulti() } label: {
                        Text("Done ✓")
                            .font(DS.Typo.sans(15, .semibold))
                            .foregroundStyle(.white)
                            .padding(.horizontal, 18)
                            .padding(.vertical, 10)
                            .background(DS.Colors.ink)
                            .clipShape(Capsule())
                    }
                    .buttonStyle(.plain)
                    .transition(.offset(y: 8).combined(with: .opacity))
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .animation(DS.Motion.bubbleSpring, value: vm.visibleChipCount)
            .animation(DS.Motion.bubbleSpring, value: vm.selected)
            .sensoryFeedback(.impact(weight: .light), trigger: vm.selected)
        }
    }

    private var visibleChips: [ChatChip] {
        Array(vm.chips.prefix(vm.visibleChipCount))
    }

    private func answerChip(_ chip: ChatChip) -> some View {
        let isSelected = vm.selected.contains(chip.id)
        return Button { vm.tap(chip) } label: {
            HStack(spacing: 6) {
                Text(chip.label)
                    .font(DS.Typo.sans(14, .medium))
                    .foregroundStyle(DS.Colors.ink)
                if isSelected {
                    Image(systemName: "checkmark")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundStyle(DS.Colors.azure)
                }
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 9)
            .background(Color.white)
            .clipShape(Capsule())
            .overlay(
                Capsule().strokeBorder(
                    isSelected ? DS.Colors.azure : DS.Colors.hairline,
                    lineWidth: isSelected ? 1.5 : 1
                )
            )
            .shadow(color: DS.Colors.cardShadow.opacity(0.6), radius: 6, x: 0, y: 2)
        }
        .buttonStyle(.plain)
        .matchedGeometryEffect(id: chip.id, in: morph, isSource: true)
        .transition(
            .asymmetric(
                insertion: .offset(y: DS.Motion.bubbleSlide).combined(with: .opacity),
                removal: .opacity.combined(with: .scale(scale: 0.85))
            )
        )
    }

    // MARK: Action CTA — "Show me" renders as black chip; others azure pill

    @ViewBuilder
    private var actionCTA: some View {
        if let step = vm.currentStep, step.kind == .action, let cta = step.cta {
            if cta == "Show me" {
                HStack {
                    Button { vm.actionTapped() } label: {
                        Text(cta)
                            .font(DS.Typo.sans(15, .semibold))
                            .foregroundStyle(.white)
                            .padding(.horizontal, 20)
                            .padding(.vertical, 11)
                            .background(DS.Colors.ink)
                            .clipShape(Capsule())
                    }
                    .buttonStyle(.plain)
                    .disabled(!vm.actionReady)
                    Spacer()
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 14)
                .opacity(vm.actionReady ? 1 : 0)
                .allowsHitTesting(vm.actionReady)
                .animation(DS.Motion.overlayFade, value: vm.actionReady)
            } else {
                Button { vm.actionTapped() } label: {
                    Text(cta)
                        .font(DS.Typo.cta)
                        .foregroundStyle(.white)
                        .frame(maxWidth: .infinity)
                        .frame(height: DS.Size.ctaHeight)
                        .background(DS.Colors.azure.opacity(vm.actionReady ? 1 : 0.35))
                        .clipShape(RoundedRectangle(cornerRadius: DS.Radius.cta, style: .continuous))
                }
                .buttonStyle(.plain)
                .disabled(!vm.actionReady)
                .padding(.horizontal, 20)
                .padding(.bottom, 14)
                .animation(DS.Motion.overlayFade, value: vm.actionReady)
            }
        }
    }
}

/// Applies a matched-geometry id only when one is relevant (user bubbles),
/// so the chip→bubble hero morph pairs cleanly with the departing chip.
struct MorphTag: ViewModifier {
    let id: UUID?
    let namespace: Namespace.ID

    func body(content: Content) -> some View {
        if let id {
            content.matchedGeometryEffect(id: id, in: namespace)
        } else {
            content
        }
    }
}

/// Chat bubble with one squared-off corner on the sender side.
struct BubbleShape: Shape {
    let isUser: Bool

    func path(in rect: CGRect) -> Path {
        let r: CGFloat = 16
        let small: CGFloat = 5
        return Path(
            roundedRect: rect,
            cornerRadii: RectangleCornerRadii(
                topLeading: r,
                bottomLeading: isUser ? r : small,
                bottomTrailing: isUser ? small : r,
                topTrailing: r
            ),
            style: .continuous
        )
    }
}

/// Minimal leading-aligned wrap layout for the chip rail.
struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let width = proposal.width ?? .infinity
        var x: CGFloat = 0, y: CGFloat = 0, rowHeight: CGFloat = 0
        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if x + size.width > width, x > 0 {
                x = 0
                y += rowHeight + spacing
                rowHeight = 0
            }
            x += size.width + spacing
            rowHeight = max(rowHeight, size.height)
        }
        return CGSize(width: width, height: y + rowHeight)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        var x = bounds.minX, y = bounds.minY, rowHeight: CGFloat = 0
        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if x + size.width > bounds.maxX, x > bounds.minX {
                x = bounds.minX
                y += rowHeight + spacing
                rowHeight = 0
            }
            subview.place(at: CGPoint(x: x, y: y), proposal: ProposedViewSize(size))
            x += size.width + spacing
            rowHeight = max(rowHeight, size.height)
        }
    }
}

#Preview {
    CoachChatView()
        .environment(AppRouter())
}
