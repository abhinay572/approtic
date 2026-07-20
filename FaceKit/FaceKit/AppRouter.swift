import SwiftUI

// MARK: - Single enum-driven router. 5 tabs: Home / Progress / Scan (center) / Coach / Profile.

enum Tab: String, CaseIterable, Identifiable {
    case home, progress, scan, coach, profile
    var id: String { rawValue }

    var title: String {
        switch self {
        case .home: "Home"
        case .progress: "Progress"
        case .scan: "Scan"
        case .coach: "Coach"
        case .profile: "Profile"
        }
    }

    var icon: String {
        switch self {
        case .home: "icon-tab-home"
        case .progress: "icon-tab-progress"
        case .scan: "icon-tab-scan"
        case .coach: "icon-tab-coach"
        case .profile: "icon-tab-profile"
        }
    }
}

/// Full-screen routes pushed over the tab shell (screens 2–20 as they land).
enum Route: Hashable {
    case coachIntro          // 02
    case hero                // 03
    case signIn              // 04
    case interstitials       // 05
    case scanCapture         // 06
    case analysing           // 07
    case structureAnalysis   // 08
    case skinAnalysis        // 09
    case paywall             // 11
    case scanHistory         // 13
    case compare             // 14
    case routine             // 15
    case exercisePlayer(exerciseIndex: Int) // 16
    case faceCard            // 17
    case battles             // 18
    case learnHub            // 19
    case learnArticle(articleIndex: Int)    // 19 detail
}

@Observable
final class AppRouter {
    var tab: Tab = .coach          // screen 1 first — feel-critical
    var path = NavigationPath()

    func push(_ route: Route) { path.append(route) }
    func pop() { if !path.isEmpty { path.removeLast() } }
    func popToRoot() { path = NavigationPath() }
}

// MARK: - Root shell

struct RootView: View {
    @Environment(AppRouter.self) private var router

    var body: some View {
        @Bindable var router = router
        NavigationStack(path: $router.path) {
            ZStack(alignment: .bottom) {
                Group {
                    switch router.tab {
                    case .home: DashboardView()
                    case .progress: ProgressCalendarView()
                    case .scan: ScanIntroView()
                    case .coach: CoachChatView()
                    case .profile: ProfileSettingsView()
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)

                FaceKitTabBar()
            }
            .ignoresSafeArea(.keyboard)
            .navigationDestination(for: Route.self) { route in
                destination(for: route)
            }
        }
    }

    @ViewBuilder
    private func destination(for route: Route) -> some View {
        switch route {
        case .hero: HeroView()
        case .coachIntro: CoachIntroView()
        case .signIn: SignInSheetView()
        case .interstitials: InterstitialsView()
        case .scanCapture: ScanCaptureView()
        case .analysing: AnalysingView()
        case .structureAnalysis: StructureAnalysisView()
        case .skinAnalysis: SkinAnalysisView()
        case .paywall: PaywallView()
        case .scanHistory: ScanHistoryView()
        case .compare: CompareView()
        case .routine: RoutineView()
        case .exercisePlayer(let index): ExercisePlayerView(exerciseIndex: index)
        case .faceCard: FaceCardView()
        case .battles: BattlesView()
        case .learnHub: LearnHubView()
        case .learnArticle: ComingSoonView(route: route)
        }
    }
}

// MARK: - Custom tab bar (white pill dock, center azure scan button)

struct FaceKitTabBar: View {
    @Environment(AppRouter.self) private var router

    var body: some View {
        HStack(spacing: 0) {
            tabButton(.home)
            tabButton(.progress)
            scanButton
            tabButton(.coach)
            tabButton(.profile)
        }
        .padding(.horizontal, 10)
        .frame(height: DS.Size.tabBarHeight)
        .background(DS.Colors.cardSurface)
        .clipShape(Capsule())
        .shadow(color: DS.Colors.cardShadow, radius: DS.Shadow.cardBlur / 2, x: 0, y: DS.Shadow.cardY)
        .padding(.horizontal, 24)
        .padding(.bottom, 8)
    }

    private func tabButton(_ tab: Tab) -> some View {
        Button {
            router.tab = tab
        } label: {
            VStack(spacing: 3) {
                Image(tab.icon)
                    .resizable()
                    .renderingMode(.template)
                    .aspectRatio(contentMode: .fit)
                    .frame(width: DS.Size.iconGrid, height: DS.Size.iconGrid)
                Text(tab.title)
                    .font(DS.Typo.sans(10, .medium))
            }
            .foregroundStyle(router.tab == tab ? DS.Colors.ink : DS.Colors.micro)
            .frame(maxWidth: .infinity)
        }
        .buttonStyle(.plain)
        .sensoryFeedback(.impact(weight: .light), trigger: router.tab)
    }

    private var scanButton: some View {
        Button {
            router.tab = .scan
        } label: {
            Image("icon-tab-scan")
                .resizable()
                .renderingMode(.template)
                .aspectRatio(contentMode: .fit)
                .frame(width: 26, height: 26)
                .foregroundStyle(.white)
                .frame(width: DS.Size.scanButton, height: DS.Size.scanButton)
                .background(DS.Colors.azure)
                .clipShape(Circle())
                .shadow(color: DS.Colors.azure.opacity(0.35), radius: 12, x: 0, y: 6)
        }
        .buttonStyle(.plain)
        .offset(y: -14)
    }
}

// MARK: - Temporary destination for not-yet-built screens

struct ComingSoonView: View {
    let route: Route

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()
            VStack(spacing: 12) {
                MicroLabel(text: "In the build loop")
                Text(String(describing: route))
                    .font(DS.Typo.title)
                    .foregroundStyle(DS.Colors.ink)
                Text("This screen is queued per the CLAUDE.md screen order.")
                    .font(DS.Typo.caption)
                    .foregroundStyle(DS.Colors.secondary)
            }
        }
    }
}
