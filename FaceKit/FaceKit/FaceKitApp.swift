import SwiftUI

@main
struct FaceKitApp: App {
    @State private var router = AppRouter()

    /// Screenshot/deep-link harness: `simctl launch booted com.approtic.facekit -screen coachChat`
    private var screenOverride: String? {
        UserDefaults.standard.string(forKey: "screen")
    }

    var body: some Scene {
        WindowGroup {
            Group {
                if let screen = screenOverride {
                    ScreenPreviewHost(screen: screen)
                } else {
                    RootView()
                }
            }
            .environment(router)
            .preferredColorScheme(.light)
            .tint(DS.Colors.azure)
        }
    }
}

/// Renders any single screen standalone (no tab shell) for the fidelity loop.
struct ScreenPreviewHost: View {
    let screen: String

    var body: some View {
        NavigationStack {
            switch screen {
            case "hero": HeroView()
            case "signIn": SignInSheetView()
            case "coachIntro": CoachIntroView()
            case "coachChat": CoachChatView(isOnboarding: true)
            case "interstitials": InterstitialsView()
            case "scanCapture": ScanCaptureView()
            case "analysing": AnalysingView()
            case "structure": StructureAnalysisView()
            case "skin": SkinAnalysisView()
            case "dashboard": DashboardView()
            case "paywall": PaywallView()
            case "progress": ProgressCalendarView()
            case "history": ScanHistoryView()
            case "compare": CompareView()
            case "routine": RoutineView()
            case "player": ExercisePlayerView(exerciseIndex: 0)
            case "facecard": FaceCardView()
            case "battles": BattlesView()
            case "learn": LearnHubView()
            case "settings": ProfileSettingsView()
            default: Text("Unknown screen: \(screen)")
            }
        }
    }
}
