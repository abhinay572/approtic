import SwiftUI
import UIKit

// MARK: - CompilingRoutineView

public struct CompilingRoutineView: View {
    private let onDone: () -> Void
    public init(onDone: @escaping () -> Void) { self.onDone = onDone }

    @State private var page = 0
    @State private var value = 0
    @State private var rolling = false

    private let targets = [3847, 184, 8]

    public var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()
            VStack(spacing: 0) {
                (Text("Compiling your ") + Text("routine").foregroundColor(DS.Colors.azure))
                    .font(DS.Typo.sans(30, .semibold))
                    .foregroundColor(DS.Colors.ink)
                    .multilineTextAlignment(.center)
                    .padding(.top, 24)
                Text("Matching the science to your face.")
                    .font(DS.Typo.sans(15, .regular))
                    .foregroundColor(DS.Colors.secondary)
                    .padding(.top, 8)
                Spacer()
                Text(value.formatted())
                    .font(DS.Typo.score(76, .bold))
                    .foregroundColor(DS.Colors.azure)
                    .contentTransition(.numericText(value: Double(value)))
                    .blur(radius: rolling ? 2.5 : 0)
                caption(for: page)
                    .font(DS.Typo.sans(15, .regular))
                    .foregroundColor(DS.Colors.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 40)
                    .padding(.top, 12)
                    .id(page)
                Spacer()
                HStack(spacing: 8) {
                    ForEach(0..<3, id: \.self) { i in
                        Circle()
                            .fill(i == page ? DS.Colors.azure : DS.Colors.ink.opacity(0.1))
                            .frame(width: 8, height: 8)
                    }
                }
                .padding(.bottom, 32)
            }
            .padding(.horizontal, 20)
        }
        .task { await run() }
    }

    private func caption(for page: Int) -> Text {
        switch page {
        case 0:
            return Text("exercises in the FaceKit library")
        case 1:
            return Text("are matched to ")
                + Text("your facial structure").foregroundColor(DS.Colors.azure)
        default:
            return Text("are the most effective ")
                + Text("for you").foregroundColor(DS.Colors.azure)
                + Text(" in targeting ")
                + Text("jawline").foregroundColor(DS.Colors.azure)
        }
    }

    private func run() async {
        for p in 0..<targets.count {
            withAnimation(.easeInOut(duration: 0.25)) { page = p }
            await roll(to: targets[p])
            try? await Task.sleep(nanoseconds: 1_200_000_000)
        }
        onDone()
    }

    /// Slot-machine style roll: ~20 easing steps with increasing delay (~1.1s total),
    /// numericText transition per step plus slight blur while rolling.
    private func roll(to target: Int) async {
        rolling = true
        let start = value
        let steps = 20
        for i in 1...steps {
            let t = Double(i) / Double(steps)
            let eased = 1 - pow(1 - t, 3)
            withAnimation(.easeOut(duration: 0.06)) {
                value = start + Int(Double(target - start) * eased)
            }
            let delay = 0.015 + 0.085 * t * t
            try? await Task.sleep(nanoseconds: UInt64(delay * 1_000_000_000))
        }
        withAnimation(.easeOut(duration: 0.2)) {
            value = target
            rolling = false
        }
    }
}

// MARK: - SocialProofView

private struct Testimonial: Identifiable {
    let id = UUID()
    let avatarA: String
    let avatarB: String
    let quote: String
    let name: String
}

public struct SocialProofView: View {
    private let onContinue: () -> Void
    public init(onContinue: @escaping () -> Void) { self.onContinue = onContinue }

    private let testimonials: [Testimonial] = [
        Testimonial(avatarA: "avatar-01", avatarB: "avatar-02",
                    quote: "I went from being scared to take photos to actually liking how I look. Hard data made it...",
                    name: "JAMES · 23"),
        Testimonial(avatarA: "avatar-03", avatarB: "avatar-04",
                    quote: "It told me my jawline angle was already in the top 20%. I'd been worried about the wrong thing.",
                    name: "ARIA · 28"),
        Testimonial(avatarA: "avatar-05", avatarB: "avatar-06",
                    quote: "The scan caught asymmetry I never noticed in the mirror. Routine fixed it in three weeks.",
                    name: "DEVON · 31"),
        Testimonial(avatarA: "avatar-02", avatarB: "avatar-05",
                    quote: "Three weeks in and people treat me differently.",
                    name: "LUKE · 19")
    ]

    public var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()
            VStack(spacing: 0) {
                MicroLabel(text: "JOINING 250K+ TRANSFORMING THEIR LOOKS")
                    .padding(.top, 16)
                (Text("250K+ users ") + Text("just like you").foregroundColor(DS.Colors.azure))
                    .font(DS.Typo.sans(30, .semibold))
                    .foregroundColor(DS.Colors.ink)
                    .multilineTextAlignment(.center)
                    .padding(.top, 12)
                Text("Same age. Same goals. Same starting point.")
                    .font(DS.Typo.sans(15, .regular))
                    .foregroundColor(DS.Colors.secondary)
                    .padding(.top, 8)
                ScrollView(showsIndicators: false) {
                    LazyVGrid(columns: [GridItem(.flexible(), spacing: 12),
                                        GridItem(.flexible(), spacing: 12)],
                              spacing: 12) {
                        ForEach(testimonials) { item in
                            TestimonialCard(item: item)
                        }
                    }
                    .padding(.top, 20)
                    Text("Your results are private and secure. We never share your data.")
                        .font(DS.Typo.micro)
                        .tracking(DS.Typo.microTracking)
                        .foregroundColor(DS.Colors.micro)
                        .multilineTextAlignment(.center)
                        .padding(.vertical, 16)
                        .frame(maxWidth: .infinity)
                }
                Button {
                    onContinue()
                } label: {
                    Text("Continue").frame(maxWidth: .infinity)
                }
                .buttonStyle(PrimaryCTAStyle())
                .padding(.bottom, 12)
            }
            .padding(.horizontal, 20)
        }
    }
}

private struct TestimonialCard: View {
    let item: Testimonial

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 8) {
                avatar(item.avatarA)
                avatar(item.avatarB)
            }
            HStack(spacing: 2) {
                ForEach(0..<5, id: \.self) { _ in
                    Image(systemName: "star.fill")
                        .font(.system(size: 9))
                        .foregroundColor(DS.Colors.azure)
                }
            }
            Text(item.quote)
                .font(DS.Typo.sans(13, .regular))
                .foregroundColor(DS.Colors.ink)
                .lineLimit(3)
                .fixedSize(horizontal: false, vertical: true)
            Text(item.name)
                .font(DS.Typo.micro)
                .tracking(DS.Typo.microTracking)
                .foregroundColor(DS.Colors.micro)
        }
        .padding(12)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(DS.Colors.cardSurface)
                .shadow(color: DS.Colors.cardShadow, radius: 12, y: 4)
        )
    }

    private func avatar(_ name: String) -> some View {
        Image(name)
            .resizable()
            .scaledToFill()
            .frame(width: 64, height: 64)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .clipped()
    }
}

// MARK: - DashboardReadyView

public struct DashboardReadyView: View {
    private let onWant: () -> Void
    public init(onWant: @escaping () -> Void) { self.onWant = onWant }

    public var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()
            VStack(spacing: 0) {
                (Text("Your dashboard is ready and ")
                    + Text("waiting for you").foregroundColor(DS.Colors.azure))
                    .font(DS.Typo.sans(30, .semibold))
                    .foregroundColor(DS.Colors.ink)
                    .multilineTextAlignment(.center)
                    .padding(.top, 24)
                Spacer()
                phoneMockup
                (Text("Dashboard is ") + Text("waiting").foregroundColor(DS.Colors.azure))
                    .font(DS.Typo.sans(13, .regular))
                    .foregroundColor(DS.Colors.secondary)
                    .padding(.top, 16)
                Spacer()
                Button {
                    onWant()
                } label: {
                    Text("I want this").frame(maxWidth: .infinity)
                }
                .buttonStyle(PrimaryCTAStyle())
                .padding(.bottom, 12)
            }
            .padding(.horizontal, 20)
        }
    }

    private var phoneMockup: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Good afternoon.")
                .font(DS.Typo.sans(12, .regular))
                .foregroundColor(DS.Colors.secondary)
            Image("porcelain-mask-static")
                .resizable()
                .scaledToFit()
                .frame(height: 90)
                .frame(maxWidth: .infinity)
            HStack(spacing: 8) {
                Text("Start →")
                    .font(DS.Typo.sans(12, .medium))
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .frame(height: 48)
                    .background(RoundedRectangle(cornerRadius: 16).fill(DS.Colors.ink))
                Text("+7")
                    .font(DS.Typo.score(16, .bold))
                    .foregroundColor(.white)
                    .frame(width: 56, height: 48)
                    .background(RoundedRectangle(cornerRadius: 16).fill(DS.Colors.azure))
            }
            VStack(alignment: .leading, spacing: 4) {
                Text("3 / 5")
                    .font(DS.Typo.score(20, .bold))
                    .foregroundColor(DS.Colors.ink)
                Text("Completed Today")
                    .font(DS.Typo.micro)
                    .tracking(DS.Typo.microTracking)
                    .foregroundColor(DS.Colors.micro)
            }
            .padding(12)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(
                RoundedRectangle(cornerRadius: 16)
                    .fill(DS.Colors.cardSurface)
                    .shadow(color: DS.Colors.cardShadow, radius: 8, y: 2)
            )
            Text("What am I doing wrong?")
                .font(DS.Typo.sans(11, .medium))
                .foregroundColor(.white)
                .padding(12)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(RoundedRectangle(cornerRadius: 16).fill(DS.Colors.azure))
            Spacer(minLength: 0)
        }
        .padding(18)
        .frame(width: 250, height: 420)
        .background(
            RoundedRectangle(cornerRadius: 44)
                .fill(DS.Colors.cardSurface)
                .shadow(color: DS.Colors.cardShadow, radius: 24, y: 10)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 44)
                .stroke(DS.Colors.hairline, lineWidth: 1)
        )
    }
}

// MARK: - CommitSlideView

public struct CommitSlideView: View {
    private let onCommitted: () -> Void
    public init(onCommitted: @escaping () -> Void) { self.onCommitted = onCommitted }

    @State private var offset: CGFloat = 0
    @State private var committed = false

    private let trackHeight: CGFloat = 64
    private let knobSize: CGFloat = 52

    public var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()
            VStack(spacing: 0) {
                Spacer()
                (Text("Commit to your ")
                    + Text("Dream Face today.").foregroundColor(DS.Colors.azure))
                    .font(DS.Typo.sans(30, .semibold))
                    .foregroundColor(DS.Colors.ink)
                    .multilineTextAlignment(.center)
                Text("Your daily promise to yourself.")
                    .font(DS.Typo.sans(15, .regular))
                    .foregroundColor(DS.Colors.secondary)
                    .padding(.top, 8)
                slider
                    .padding(.top, 48)
                Spacer()
                Spacer()
            }
            .padding(.horizontal, 20)
        }
    }

    private var slider: some View {
        GeometryReader { geo in
            let inset = (trackHeight - knobSize) / 2
            let maxOffset = max(1, geo.size.width - knobSize - inset * 2)
            let progress = Double(offset / maxOffset)
            ZStack(alignment: .leading) {
                Capsule().fill(DS.Colors.cardSurface)
                Capsule()
                    .fill(DS.Colors.azure)
                    .frame(width: offset + knobSize + inset * 2)
                Capsule().stroke(DS.Colors.hairline, lineWidth: 1)
                ZStack {
                    Text("Slide to commit")
                        .font(DS.Typo.sans(15, .medium))
                        .foregroundColor(DS.Colors.secondary)
                        .opacity(committed ? 0 : max(0, 1 - progress * 1.5))
                    Text("Committed")
                        .font(DS.Typo.sans(15, .semibold))
                        .foregroundColor(.white)
                        .opacity(committed ? 1 : 0)
                }
                .frame(maxWidth: .infinity)
                HStack {
                    Spacer()
                    Text("› › ›")
                        .font(DS.Typo.sans(14, .medium))
                        .foregroundColor(DS.Colors.micro)
                        .opacity(max(0, 1 - progress * 2))
                        .padding(.trailing, 20)
                }
                Circle()
                    .fill(DS.Colors.cardSurface)
                    .frame(width: knobSize, height: knobSize)
                    .shadow(color: DS.Colors.cardShadow, radius: 8, y: 2)
                    .overlay(
                        Image(systemName: committed ? "checkmark" : "chevron.right")
                            .font(.system(size: 16, weight: .semibold))
                            .foregroundColor(committed ? DS.Colors.azure : DS.Colors.ink)
                    )
                    .offset(x: inset + offset)
                    .gesture(dragGesture(maxOffset: maxOffset))
            }
        }
        .frame(height: trackHeight)
    }

    private func dragGesture(maxOffset: CGFloat) -> some Gesture {
        DragGesture()
            .onChanged { drag in
                guard !committed else { return }
                offset = min(max(0, drag.translation.width), maxOffset)
            }
            .onEnded { _ in
                guard !committed else { return }
                if offset / maxOffset > 0.9 {
                    withAnimation(.spring(response: 0.35, dampingFraction: 0.8)) {
                        offset = maxOffset
                        committed = true
                    }
                    UINotificationFeedbackGenerator().notificationOccurred(.success)
                    Task {
                        try? await Task.sleep(nanoseconds: 700_000_000)
                        onCommitted()
                    }
                } else {
                    withAnimation(.spring(response: 0.35, dampingFraction: 0.8)) {
                        offset = 0
                    }
                }
            }
    }
}

// MARK: - Previews

#Preview("Compiling Routine") {
    CompilingRoutineView(onDone: {})
}

#Preview("Social Proof") {
    SocialProofView(onContinue: {})
}

#Preview("Dashboard Ready") {
    DashboardReadyView(onWant: {})
}

#Preview("Commit Slide") {
    CommitSlideView(onCommitted: {})
}
