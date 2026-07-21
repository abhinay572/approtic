import SwiftUI

/// Reference screens 04–05 — Coach chat (onboarding questions).
/// Typing dots, slide-up bubbles, cascading option rows, azure user bubbles,
/// option→bubble matchedGeometryEffect morph, segmented progress, bottom CTA.
struct CoachChatView: View {
    @State private var vm = CoachChatViewModel()
    @Namespace private var morph
    /// Onboarding shows progress segments + CTA and no tab bar.
    var isOnboarding = true

    var body: some View {
        ZStack {
            DS.Gradients.chatBackground

            VStack(spacing: 0) {
                header
                if isOnboarding { progressBar }

                ScrollViewReader { proxy in
                    ScrollView {
                        VStack(spacing: 10) {
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

                            // Options flow with the conversation, directly
                            // under the last coach bubble (reference 04/05).
                            answersArea
                                .padding(.top, 6)
                                .id("answers")
                        }
                        .padding(.horizontal, 20)
                        .padding(.top, 14)
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

                if isOnboarding { ctaButton }
            }
        }
        .onAppear { vm.start() }
        .onDisappear { vm.stop() }
    }

    // MARK: Header — mascot raster + name + presence

    private var header: some View {
        HStack(spacing: 12) {
            Image("coach-mascot")
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: 44, height: 44)
                .clipShape(Circle())
            VStack(alignment: .leading, spacing: 2) {
                Text(vm.coachName)
                    .font(DS.Typo.sans(17, .semibold))
                    .foregroundStyle(DS.Colors.ink)
                HStack(spacing: 5) {
                    Circle()
                        .fill(DS.Colors.success)
                        .frame(width: 7, height: 7)
                    Text("your personal coach")
                        .font(DS.Typo.caption)
                        .foregroundStyle(DS.Colors.secondary)
                }
            }
            Spacer()
        }
        .padding(.horizontal, 20)
        .padding(.top, 8)
        .padding(.bottom, 12)
    }

    // MARK: Segmented onboarding progress

    private var progressBar: some View {
        GeometryReader { geo in
            let w = geo.size.width
            HStack(spacing: 6) {
                Capsule()
                    .fill(DS.Colors.azure)
                    .frame(width: max(0, w * vm.progress))
                ForEach(0..<4, id: \.self) { _ in
                    Capsule()
                        .fill(DS.Colors.ink.opacity(0.08))
                        .frame(maxWidth: .infinity)
                }
            }
            .animation(DS.Motion.bubbleSpring, value: vm.progress)
        }
        .frame(height: 4)
        .padding(.horizontal, 20)
        .padding(.bottom, 4)
    }

    // MARK: Bubbles — coach white / user azure, slide-up 12pt spring

    @ViewBuilder
    private func bubble(for message: ChatMessage) -> some View {
        HStack {
            if message.role == .user { Spacer(minLength: 48) }

            VStack(alignment: .trailing, spacing: 4) {
                Text(message.text)
                    .font(DS.Typo.chat)
                    .foregroundStyle(message.role == .coach ? DS.Colors.ink : .white)
                if message.role == .user {
                    Text("Just now")
                        .font(DS.Typo.sans(11, .medium))
                        .foregroundStyle(.white.opacity(0.7))
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            .background(message.role == .coach ? Color.white : DS.Colors.azure)
            .clipShape(BubbleShape(isUser: message.role == .user))
            .shadow(color: DS.Colors.cardShadow, radius: 10, x: 0, y: 4)
            .modifier(MorphTag(id: message.role == .user ? message.id : nil, namespace: morph))

            if message.role == .coach { Spacer(minLength: 48) }
        }
        .transition(
            .asymmetric(
                insertion: .offset(y: DS.Motion.bubbleSlide).combined(with: .opacity),
                removal: .opacity
            )
        )
    }

    // MARK: Answers — vertical option rows (screen 04) or chip flow (screen 05)

    @ViewBuilder
    private var answersArea: some View {
        if let step = vm.currentStep, !vm.chips.isEmpty {
            Group {
                switch step.style {
                case .optionRows: optionRows
                case .chips: chipFlow
                }
            }
            .animation(DS.Motion.bubbleSpring, value: vm.visibleChipCount)
        }
    }

    private var optionRows: some View {
        VStack(spacing: 8) {
            ForEach(Array(vm.chips.enumerated()), id: \.element.id) { index, chip in
                if index < vm.visibleChipCount {
                    OptionRow(
                        chip: chip,
                        isSelected: vm.selected.contains(chip.id)
                    ) { vm.toggle(chip) }
                    .matchedGeometryEffect(id: chip.id, in: morph, isSource: true)
                    .transition(
                        .asymmetric(
                            insertion: .offset(y: DS.Motion.bubbleSlide).combined(with: .opacity),
                            removal: .opacity.combined(with: .scale(scale: 0.9))
                        )
                    )
                }
            }
        }
        .sensoryFeedback(.impact(weight: .light), trigger: vm.selected)
    }

    private var chipFlow: some View {
        FlowLayout(spacing: 8) {
            ForEach(Array(vm.chips.enumerated()), id: \.element.id) { index, chip in
                if index < vm.visibleChipCount {
                    ChipToggle(
                        chip: chip,
                        isSelected: vm.selected.contains(chip.id)
                    ) { vm.toggle(chip) }
                    .matchedGeometryEffect(id: chip.id, in: morph, isSource: true)
                    .transition(
                        .asymmetric(
                            insertion: .offset(y: DS.Motion.bubbleSlide).combined(with: .opacity),
                            removal: .opacity.combined(with: .scale(scale: 0.85))
                        )
                    )
                }
            }
        }
        .sensoryFeedback(.impact(weight: .light), trigger: vm.selected)
    }

    // MARK: CTA — pale azure disabled → azure enabled; step 2 uses black "Done ✓"

    @ViewBuilder
    private var ctaButton: some View {
        let step = vm.currentStep
        let isDone = step?.multiSelect == true
        Button {
            vm.commit()
        } label: {
            Text(step?.cta ?? "Continue")
                .font(DS.Typo.cta)
                .foregroundStyle(.white)
                .frame(maxWidth: .infinity)
                .frame(height: DS.Size.ctaHeight)
                .background(
                    isDone
                        ? AnyShapeStyle(DS.Colors.ink)
                        : AnyShapeStyle(DS.Colors.azure.opacity(vm.ctaEnabled ? 1 : 0.35))
                )
                .clipShape(RoundedRectangle(cornerRadius: DS.Radius.cta, style: .continuous))
        }
        .buttonStyle(.plain)
        .disabled(!vm.ctaEnabled)
        .opacity(step == nil ? 0 : 1)
        .padding(.horizontal, 20)
        .padding(.bottom, 12)
        .animation(DS.Motion.overlayFade, value: vm.ctaEnabled)
    }
}

// MARK: - Option row (screen 04): white card row, azure border + check when selected

struct OptionRow: View {
    let chip: ChatChip
    let isSelected: Bool
    let action: () -> Void

    private var emoji: String { String(chip.label.prefix(while: { !$0.isLetter })).trimmingCharacters(in: .whitespaces) }
    private var title: String { String(chip.label.drop(while: { !$0.isLetter })) }

    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                Text(emoji).font(.system(size: 18))
                Text(title)
                    .font(DS.Typo.sans(15, .medium))
                    .foregroundStyle(DS.Colors.ink)
                Spacer()
                // Reference: only the selected row shows the azure check circle.
                if isSelected {
                    ZStack {
                        Circle()
                            .fill(DS.Colors.azure)
                            .frame(width: 22, height: 22)
                        Image(systemName: "checkmark")
                            .font(.system(size: 11, weight: .bold))
                            .foregroundStyle(.white)
                    }
                    .transition(.scale.combined(with: .opacity))
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
            .background(Color.white)
            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .strokeBorder(isSelected ? DS.Colors.azure : DS.Colors.hairline, lineWidth: isSelected ? 1.5 : 1)
            )
            .shadow(color: DS.Colors.cardShadow.opacity(isSelected ? 1 : 0.5), radius: 8, x: 0, y: 4)
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Chip toggle (screen 05): white pill, azure border + trailing check when selected

struct ChipToggle: View {
    let chip: ChatChip
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 6) {
                Text(chip.label)
                    .font(DS.Typo.chip)
                    .foregroundStyle(DS.Colors.ink)
                if isSelected {
                    Image(systemName: "checkmark")
                        .font(.system(size: 11, weight: .bold))
                        .foregroundStyle(DS.Colors.azure)
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 10)
            .background(Color.white)
            .clipShape(Capsule())
            .overlay(
                Capsule().strokeBorder(
                    isSelected ? DS.Colors.azure : DS.Colors.hairline,
                    lineWidth: isSelected ? 1.5 : 1
                )
            )
        }
        .buttonStyle(.plain)
    }
}

/// Applies a matched-geometry id only when one is relevant (user bubbles),
/// so the option→bubble hero morph pairs cleanly with the departing row.
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
