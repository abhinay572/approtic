import Foundation

// MARK: - Domain models (used by all 20 screens; every screen runs on mocks)

struct UserProfile {
    var name: String
    var age: Int
    var streakDays: Int
    var joinedAt: Date
    var isPro: Bool
}

// Screen 1–2: coach chat
struct ChatMessage: Identifiable, Equatable {
    enum Role { case coach, user }
    let id: UUID
    let role: Role
    let text: String

    init(id: UUID = UUID(), role: Role, text: String) {
        self.id = id
        self.role = role
        self.text = text
    }
}

struct ChatChip: Identifiable, Equatable {
    let id: UUID
    let label: String

    init(id: UUID = UUID(), label: String) {
        self.id = id
        self.label = label
    }
}

/// A scripted step: what the coach says, then which chips the user can pick.
struct ChatScriptStep {
    enum Style { case optionRows, chips }
    let coachLines: [String]
    let chips: [String]
    var style: Style = .optionRows
    var multiSelect = false
    var cta: String = "Continue"
    /// Progress through onboarding after this step completes (0...1).
    var progress: Double = 0.25
}

// Screens 8–9, 13–14: analysis
struct MetricScore: Identifiable {
    enum Kind: String, CaseIterable {
        case redness = "Redness"
        case texture = "Texture"
        case tone = "Tone"
        case oil = "Oil"
    }
    var id: String { kind.rawValue }
    let kind: Kind
    let score: Int          // 0–100, displayed floor 40 handled at view level
    let status: StatusLevel
    let insight: String
}

struct StructureScore: Identifiable {
    let id = UUID()
    let label: String       // e.g. Symmetry
    let score: Int
    let percentile: Int
    let note: String
}

struct ScanResult: Identifiable {
    let id: UUID
    let date: Date
    let overall: Int        // never displayed below 40 (product rule)
    let potential: Int
    let structure: [StructureScore]
    let skin: [MetricScore]

    /// Product rule: displayed overall never below 40; framing stays constructive.
    var displayedOverall: Int { max(40, overall) }
}

// Screens 15–16: routine
struct Exercise: Identifiable {
    let id: UUID
    let name: String
    let durationSeconds: Int
    let reps: String
    let illustration: String   // asset name, ex-*
    let coachCue: String
}

struct RoutineDay: Identifiable {
    let id: UUID
    let title: String
    let subtitle: String
    let exercises: [Exercise]
    let minutes: Int
    var completed: Bool
}

// Screen 12: progress calendar
struct CalendarDay: Identifiable {
    let id = UUID()
    let date: Date
    let didTrain: Bool
    let didScan: Bool
}

// Screen 18: battles
struct LeaderboardEntry: Identifiable {
    let id = UUID()
    let rank: Int
    let name: String
    let score: Int
    let streak: Int
    let avatar: String        // asset name avatar-XX
    let isYou: Bool
}

// Screen 19: learn hub
struct Article: Identifiable {
    let id = UUID()
    let category: String
    let title: String
    let minutes: Int
    let icon: String          // icon asset name
}

// Screen 11: paywall
struct PaywallPlan: Identifiable {
    let id = UUID()
    let productID: String
    let name: String
    let price: String
    let period: String
    let badge: String?
    let perWeekEquivalent: String?
}

// Screen 17: face card
struct FaceCard {
    let name: String
    let overall: Int
    let topMetric: String
    let percentile: Int
    let streak: Int
}

// MARK: - Service protocol (real Supabase-backed service lands later)

protocol DataService {
    var profile: UserProfile { get }
    var coachScript: [ChatScriptStep] { get }
    var coachName: String { get }
    var latestScan: ScanResult { get }
    var scanHistory: [ScanResult] { get }
    var todayRoutine: RoutineDay { get }
    var weekRoutine: [RoutineDay] { get }
    var calendar: [CalendarDay] { get }
    var leaderboard: [LeaderboardEntry] { get }
    var articles: [Article] { get }
    var paywallPlans: [PaywallPlan] { get }
    var faceCard: FaceCard { get }
}

// MARK: - Mock implementation

final class MockDataService: DataService {
    static let shared = MockDataService()
    private init() {}

    let coachName = "FaceKit Coach"

    let profile = UserProfile(
        name: "Abhinay",
        age: 24,
        streakDays: 12,
        joinedAt: Calendar.current.date(byAdding: .day, value: -34, to: .now) ?? .now,
        isPro: false
    )

    // Screens 04–05 of the reference sheet — exact copy from the kit copy deck.
    let coachScript: [ChatScriptStep] = [
        ChatScriptStep(
            coachLines: ["But first I need to know what you\u{2019}re actually trying to achieve.",
                         "So, what\u{2019}s the main thing holding you back right now?"],
            chips: ["📊 I can\u{2019}t see my progress",
                    "😕 I\u{2019}m unsure what to improve",
                    "🧭 I don\u{2019}t know where to start",
                    "📚 Too much conflicting info",
                    "🔋 I lack motivation"],
            style: .optionRows,
            multiSelect: false,
            cta: "Continue",
            progress: 0.25
        ),
        ChatScriptStep(
            coachLines: ["What do you actually want to work on?"],
            chips: ["💪 Jawline", "💎 Cheekbones", "👤 Side profile",
                    "⚖️ Symmetry", "👃 Nose", "👁 Eye area"],
            style: .chips,
            multiSelect: true,
            cta: "Done ✓",
            progress: 0.45
        ),
        ChatScriptStep(
            coachLines: ["Perfect. Let\u{2019}s scan your face so I can see what we\u{2019}re working with. 📸"],
            chips: [],
            progress: 0.6
        ),
    ]

    let latestScan: ScanResult = ScanResult(
        id: UUID(),
        date: .now,
        overall: 71,
        potential: 88,
        structure: [
            StructureScore(label: "Symmetry", score: 74, percentile: 68, note: "Left-right balance is strong; slight tilt at the jaw."),
            StructureScore(label: "Jawline", score: 63, percentile: 52, note: "Definition responds well to daily masseter work."),
            StructureScore(label: "Cheekbones", score: 77, percentile: 74, note: "High set with good projection."),
            StructureScore(label: "Eye area", score: 69, percentile: 61, note: "Mild morning puffiness pattern."),
        ],
        skin: [
            MetricScore(kind: .redness, score: 62, status: .nurture, insight: "Mild flush across the cheeks — barrier support will calm it."),
            MetricScore(kind: .texture, score: 74, status: .good, insight: "Smooth overall; light congestion in the T-zone."),
            MetricScore(kind: .tone, score: 78, status: .great, insight: "Even tone with good luminosity."),
            MetricScore(kind: .oil, score: 66, status: .good, insight: "Balanced by afternoon; slightly oily forehead."),
        ]
    )

    lazy var scanHistory: [ScanResult] = {
        let cal = Calendar.current
        return (0..<6).map { i in
            ScanResult(
                id: UUID(),
                date: cal.date(byAdding: .day, value: -i * 5, to: .now) ?? .now,
                overall: [71, 69, 68, 66, 65, 63][i],
                potential: 88,
                structure: latestScan.structure,
                skin: latestScan.skin
            )
        }
    }()

    let todayRoutine = RoutineDay(
        id: UUID(),
        title: "Day 12 — Jaw & Cheeks",
        subtitle: "Definition block",
        exercises: [
            Exercise(id: UUID(), name: "Jaw Release", durationSeconds: 45, reps: "3 × 15s", illustration: "ex-jaw-release", coachCue: "Drop the jaw slowly, tongue resting low."),
            Exercise(id: UUID(), name: "Cheek Lift", durationSeconds: 60, reps: "2 × 10", illustration: "ex-cheek-lift", coachCue: "Smile with the mid-face, not the mouth corners."),
            Exercise(id: UUID(), name: "Tongue Press", durationSeconds: 45, reps: "3 × 12", illustration: "ex-tongue-press", coachCue: "Press flat to the palate, hold two counts."),
            Exercise(id: UUID(), name: "Smile Hold", durationSeconds: 30, reps: "2 × 15s", illustration: "ex-smile-hold", coachCue: "Wide, even, ears back. Breathe."),
            Exercise(id: UUID(), name: "Neck Stretch", durationSeconds: 60, reps: "2 × 20s", illustration: "ex-neck-stretch", coachCue: "Long neck, chin to the ceiling, no shoulder creep."),
        ],
        minutes: 5,
        completed: false
    )

    lazy var weekRoutine: [RoutineDay] = {
        let titles = [
            ("Day 12 — Jaw & Cheeks", "Definition block"),
            ("Day 13 — Eyes & Brow", "De-puff block"),
            ("Day 14 — Full face", "Circulation block"),
            ("Day 15 — Jaw & Neck", "Definition block"),
            ("Day 16 — Recovery", "Massage + lymph"),
            ("Day 17 — Cheeks", "Lift block"),
            ("Day 18 — Assessment", "Re-scan + compare"),
        ]
        return titles.enumerated().map { i, t in
            RoutineDay(id: UUID(), title: t.0, subtitle: t.1,
                       exercises: todayRoutine.exercises.shuffled(),
                       minutes: [5, 5, 7, 5, 4, 5, 3][i],
                       completed: false)
        }
    }()

    lazy var calendar: [CalendarDay] = {
        let cal = Calendar.current
        return (0..<28).reversed().map { i in
            let date = cal.date(byAdding: .day, value: -i, to: .now) ?? .now
            let trained = i == 0 ? false : (i % 7 != 3 && i % 11 != 5)
            return CalendarDay(date: date, didTrain: trained, didScan: i % 5 == 0)
        }
    }()

    let leaderboard: [LeaderboardEntry] = [
        LeaderboardEntry(rank: 1, name: "Marco", score: 84, streak: 41, avatar: "avatar-02", isYou: false),
        LeaderboardEntry(rank: 2, name: "Jess", score: 82, streak: 28, avatar: "avatar-03", isYou: false),
        LeaderboardEntry(rank: 3, name: "Tomas", score: 79, streak: 35, avatar: "avatar-04", isYou: false),
        LeaderboardEntry(rank: 4, name: "Abhinay", score: 71, streak: 12, avatar: "avatar-01", isYou: true),
        LeaderboardEntry(rank: 5, name: "Lena", score: 70, streak: 9, avatar: "avatar-05", isYou: false),
        LeaderboardEntry(rank: 6, name: "Ravi", score: 68, streak: 17, avatar: "avatar-06", isYou: false),
    ]

    let articles: [Article] = [
        Article(category: "Training", title: "Why jawline change takes 21 days", minutes: 4, icon: "icon-metric-structure"),
        Article(category: "Skin", title: "Redness: barrier first, actives second", minutes: 3, icon: "icon-metric-redness"),
        Article(category: "Habits", title: "Mewing, posture and your resting face", minutes: 5, icon: "icon-face-outline"),
        Article(category: "Skin", title: "Oil is not the enemy", minutes: 3, icon: "icon-metric-oil"),
        Article(category: "Recovery", title: "Sleep position and morning puffiness", minutes: 4, icon: "icon-sleep-moon"),
        Article(category: "Training", title: "The 5-minute rule that keeps streaks alive", minutes: 2, icon: "icon-streak-flame"),
    ]

    let paywallPlans: [PaywallPlan] = [
        PaywallPlan(productID: "com.approtic.facekit.pro.yearly", name: "Yearly", price: "₹2,499", period: "per year", badge: "BEST VALUE", perWeekEquivalent: "₹48/week"),
        PaywallPlan(productID: "com.approtic.facekit.pro.weekly", name: "Weekly", price: "₹199", period: "per week", badge: nil, perWeekEquivalent: nil),
    ]

    var faceCard: FaceCard {
        FaceCard(name: profile.name, overall: latestScan.displayedOverall,
                 topMetric: "Tone", percentile: 74, streak: profile.streakDays)
    }
}
