import SwiftUI

/// Screen 01 — Coach chat. Feel-critical: typing dots, slide-up bubbles,
/// cascading chips, and the chip→bubble matchedGeometryEffect morph.
struct CoachChatView: View {
    @State private var vm = CoachChatViewModel()
    @Namespace private var morph

    var body: some View {
        ZStack {
            // white → radial #DCEBFF glow, lower half
            DS.Gradients.chatBackground

            VStack(spacing: 0) {
                header

                ScrollViewReader { proxy in
                    ScrollView {
                        VStack(spacing: 10) {
                            ForEach(vm.messages) { message in
                                bubble(for: message)
                                    .id(message.id)
                            }

                            if vm.isTyping {
                                HStack {
                                    TypingDots()
                                    Spacer(minLength: 60)
                                }
                                .transition(.opacity)
                                .id("typing")
                            }
                        }
                        .padding(.horizontal, 20)
                        .padding(.top, 12)
                        .padding(.bottom, 16)
                    }
                    .scrollIndicators(.hidden)
                    .onChange(of: vm.messages.count) {
                        withAnimation(DS.Motion.bubbleSpring) {
                            proxy.scrollTo(vm.messages.last?.id, anchor: .bottom)
                        }
                    }
                    .onChange(of: vm.isTyping) {
                        if vm.isTyping {
                            withAnimation(DS.Motion.bubbleSpring) {
                                proxy.scrollTo("typing", anchor: .bottom)
                            }
                        }
                    }
                }

                chipRail
                    .padding(.bottom, DS.Size.tabBarHeight + 24)
            }
        }
        .onAppear { vm.start() }
        .onDisappear { vm.stop() }
    }

    // MARK: Header

    private var header: some View {
        HStack(spacing: 12) {
            CoachMascotView(size: 40)
            VStack(alignment: .leading, spacing: 1) {
                Text(vm.coachName)
                    .font(DS.Typo.sans(17, .semibold))
                    .foregroundStyle(DS.Colors.ink)
                HStack(spacing: 5) {
                    Circle()
                        .fill(DS.Colors.success)
                        .frame(width: 7, height: 7)
                    Text("Your face coach")
                        .font(DS.Typo.caption)
                        .foregroundStyle(DS.Colors.secondary)
                }
            }
            Spacer()
            MicroLabel(text: "Day 12")
        }
        .padding(.horizontal, 20)
        .padding(.top, 8)
        .padding(.bottom, 10)
    }

    // MARK: Bubbles — slide-up 12pt spring(0.4/0.75)

    @ViewBuilder
    private func bubble(for message: ChatMessage) -> some View {
        HStack {
            if message.role == .user { Spacer(minLength: 60) }

            Text(message.text)
                .font(DS.Typo.chat)
                .foregroundStyle(message.role == .coach ? DS.Colors.ink : .white)
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
                .background(message.role == .coach ? Color.white : DS.Colors.ink)
                .clipShape(BubbleShape(isUser: message.role == .user))
                .shadow(color: DS.Colors.cardShadow, radius: 10, x: 0, y: 4)
                .modifier(MorphTag(id: message.role == .user ? message.id : nil, namespace: morph))

            if message.role == .coach { Spacer(minLength: 60) }
        }
        .transition(
            .asymmetric(
                insertion: .offset(y: DS.Motion.bubbleSlide).combined(with: .opacity),
                removal: .opacity
            )
        )
    }

    // MARK: Chip rail — cascade in, selected morphs out, rest fade+collapse

    private var chipRail: some View {
        FlowLayout(spacing: 8) {
            ForEach(Array(vm.chips.enumerated()), id: \.element.id) { index, chip in
                if index < vm.visibleChipCount {
                    Button {
                        vm.select(chip)
                    } label: {
                        Text(chip.label)
                            .chipStyle()
                    }
                    .buttonStyle(.plain)
                    .matchedGeometryEffect(id: chip.id, in: morph, isSource: true)
                    .transition(
                        .asymmetric(
                            insertion: .offset(y: DS.Motion.bubbleSlide).combined(with: .opacity),
                            removal: .opacity.combined(with: .scale(scale: 0.85))
                        )
                    )
                    .sensoryFeedback(.impact(weight: .light), trigger: vm.selectedChipID)
                }
            }
        }
        .padding(.horizontal, 20)
        .animation(DS.Motion.bubbleSpring, value: vm.visibleChipCount)
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
        let r: CGFloat = 18
        let small: CGFloat = 6
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
