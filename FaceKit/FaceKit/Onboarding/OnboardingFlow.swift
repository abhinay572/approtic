import SwiftUI

/// Onboarding coordinator matching the competitor recording's sequence:
/// coach intro (name) → scripted chat, which presents interstitial covers at
/// scripted moments and resumes when each cover chain completes.
struct OnboardingFlowView: View {
    @Environment(AppRouter.self) private var router
    @State private var userName: String?
    @State private var cover: InterstitialCoverID?
    @State private var resumeChat: (() -> Void)?

    var body: some View {
        Group {
            if let userName {
                CoachChatView(isOnboarding: true, userName: userName) { id, resume in
                    resumeChat = resume
                    cover = InterstitialCoverID(id: id)
                }
                .transition(.opacity)
            } else {
                CoachIntroView { name in
                    withAnimation(DS.Motion.cardSpring) { userName = name }
                }
            }
        }
        .fullScreenCover(item: $cover) { c in
            InterstitialCoverView(id: c.id) {
                cover = nil
                resumeChat?()
            }
            .environment(router)
        }
    }
}

struct InterstitialCoverID: Identifiable {
    let id: String
}

/// Renders the correct interstitial chain for a scripted trigger.
struct InterstitialCoverView: View {
    let id: String
    let onDone: () -> Void
    @State private var stage = 0

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()
            switch id {
            case "leverage":
                FaceLeverageView(onContinue: onDone)
            case "glowProof":
                GlowProofCover(onContinue: onDone)
            case "demo":
                demoChain
            case "dashboardBuilt":
                finishChain
            default:
                VStack { Spacer(); Button("Continue", action: onDone).buttonStyle(PrimaryCTAStyle()).padding(20) }
            }
        }
    }

    /// demo: intro → structure → skin → feature tour → resume chat.
    @ViewBuilder
    private var demoChain: some View {
        switch stage {
        case 0: DemoIntroView { advance() }
        case 1: DemoAnalysisWrapper(kind: .structure) { advance() }
        case 2: DemoAnalysisWrapper(kind: .skin) { advance() }
        default: FeatureTourView { onDone() }
        }
    }

    /// dashboardBuilt: built screen → compiling → social proof → ready → commit → paywall.
    @ViewBuilder
    private var finishChain: some View {
        switch stage {
        case 0: DashboardBuiltView { advance() }
        case 1: CompilingRoutineView { advance() }
        case 2: SocialProofView { advance() }
        case 3: DashboardReadyView { advance() }
        case 4: CommitSlideView { advance() }
        default: PaywallCover { onDone() }
        }
    }

    private func advance() {
        withAnimation(DS.Motion.cardSpring) { stage += 1 }
    }
}

// MARK: - "Your face is your leverage" (video 4:33)

struct FaceLeverageView: View {
    var name: String = MockDataService.shared.profile.name
    let onContinue: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Spacer().frame(height: 20)
            HStack(alignment: .top, spacing: 14) {
                VStack(alignment: .leading, spacing: 2) {
                    Text("\(name),")
                        .font(DS.Typo.sans(28, .semibold))
                        .foregroundStyle(DS.Colors.secondary)
                    (Text("Your face is ").foregroundStyle(DS.Colors.ink)
                        + Text("your leverage.").foregroundStyle(DS.Colors.azure))
                        .font(DS.Typo.sans(28, .semibold))
                    Text("Better looks tilt every interaction in your favor.")
                        .font(DS.Typo.sans(14))
                        .foregroundStyle(DS.Colors.secondary)
                        .padding(.top, 6)
                }
                Spacer()
                Image("scan-demo")
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: 84, height: 84)
                    .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
            }

            MicroLabel(text: "Why it matters")
                .padding(.top, 26)
                .padding(.bottom, 10)

            VStack(alignment: .leading, spacing: 12) {
                HStack(spacing: -8) {
                    ForEach(1...4, id: \.self) { i in
                        Image("avatar-0\(i)")
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .frame(width: 30, height: 30)
                            .clipShape(Circle())
                            .overlay(Circle().strokeBorder(.white, lineWidth: 2))
                    }
                    Text("120k+ users")
                        .font(DS.Typo.sans(13, .semibold))
                        .foregroundStyle(DS.Colors.ink)
                        .padding(.leading, 16)
                    Text("already on the program")
                        .font(DS.Typo.sans(12))
                        .foregroundStyle(DS.Colors.secondary)
                        .padding(.leading, 6)
                }
                (Text("\u{201C}Three weeks in and people ").foregroundStyle(DS.Colors.ink)
                    + Text("treat me differently.").foregroundStyle(DS.Colors.azure)
                    + Text("\u{201D}").foregroundStyle(DS.Colors.ink))
                    .font(DS.Typo.sans(16, .medium))
                HStack(spacing: 6) {
                    ForEach(0..<5, id: \.self) { _ in
                        Image(systemName: "star.fill")
                            .font(.system(size: 10))
                            .foregroundStyle(DS.Colors.azure)
                    }
                    Text("4.9 · 2,100 reviews")
                        .font(DS.Typo.sans(12))
                        .foregroundStyle(DS.Colors.secondary)
                }
            }
            .padding(18)
            .frame(maxWidth: .infinity, alignment: .leading)
            .cardStyle()

            HStack(spacing: 12) {
                VStack(alignment: .leading, spacing: 6) {
                    Image(systemName: "person.fill")
                        .foregroundStyle(.white.opacity(0.9))
                    Text("First impressions")
                        .font(DS.Typo.sans(15, .semibold))
                        .foregroundStyle(.white)
                    Text("People judge before you speak.")
                        .font(DS.Typo.sans(11))
                        .foregroundStyle(.white.opacity(0.7))
                }
                .padding(16)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(DS.Colors.ink)
                .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))

                VStack(alignment: .leading, spacing: 6) {
                    Image(systemName: "sparkles")
                        .foregroundStyle(.white.opacity(0.9))
                    Text("Status")
                        .font(DS.Typo.sans(15, .semibold))
                        .foregroundStyle(.white)
                    Text("Lead the room.")
                        .font(DS.Typo.sans(11))
                        .foregroundStyle(.white.opacity(0.8))
                }
                .padding(16)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(DS.Colors.azure)
                .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
            }
            .padding(.top, 14)

            Spacer()

            Button("Continue", action: onContinue)
                .buttonStyle(PrimaryCTAStyle())
        }
        .padding(.horizontal, 20)
        .padding(.bottom, 16)
    }
}

// MARK: - Glow-up proof cover (wraps existing interstitial content)

struct GlowProofCover: View {
    let onContinue: () -> Void

    var body: some View {
        VStack(spacing: 0) {
            InterstitialsView(embedded: true)
            Button("Continue", action: onContinue)
                .buttonStyle(PrimaryCTAStyle())
                .padding(.horizontal, 20)
                .padding(.bottom, 16)
        }
    }
}

// MARK: - Demo analysis wrapper (Luke Swan's scan + floating Continue)

struct DemoAnalysisWrapper: View {
    enum Kind { case structure, skin }
    let kind: Kind
    let onContinue: () -> Void

    var body: some View {
        ZStack(alignment: .bottom) {
            Group {
                switch kind {
                case .structure: StructureAnalysisView(embedded: true)
                case .skin: SkinAnalysisView(embedded: true)
                }
            }
            Button("Continue", action: onContinue)
                .buttonStyle(PrimaryCTAStyle())
                .padding(.horizontal, 20)
                .padding(.bottom, 16)
        }
    }
}

// MARK: - Paywall cover

struct PaywallCover: View {
    let onDone: () -> Void

    var body: some View {
        ZStack(alignment: .topTrailing) {
            PaywallView()
            Button {
                onDone()
            } label: {
                Image(systemName: "xmark")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundStyle(DS.Colors.secondary)
                    .frame(width: 34, height: 34)
                    .background(.white.opacity(0.8))
                    .clipShape(Circle())
            }
            .buttonStyle(.plain)
            .padding(.top, 18)
            .padding(.trailing, 18)
        }
    }
}

#Preview {
    OnboardingFlowView().environment(AppRouter())
}
