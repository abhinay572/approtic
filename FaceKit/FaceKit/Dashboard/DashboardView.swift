import SwiftUI

/// Screen 10 — Dashboard (Home tab). Scaffold version: score ring with the
/// 1.4s decelerating count-up, metric cards, today's routine. Enters the
/// full build loop at its slot in the screen order.
struct DashboardView: View {
    @Environment(AppRouter.self) private var router
    private let service: DataService = MockDataService.shared
    @State private var appeared = false
    @State private var displayedScore = 0

    private var scan: ScanResult { service.latestScan }

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            ScrollView {
                VStack(spacing: 16) {
                    greeting
                    scoreCard
                    metricGrid
                    routineCard
                }
                .padding(.horizontal, 20)
                .padding(.bottom, DS.Size.tabBarHeight + 40)
            }
            .scrollIndicators(.hidden)
        }
        .onAppear { animateIn() }
    }

    private var greeting: some View {
        HStack {
            VStack(alignment: .leading, spacing: 2) {
                MicroLabel(text: "Day \(service.profile.streakDays)")
                Text("Morning, \(service.profile.name)")
                    .font(DS.Typo.headline)
                    .foregroundStyle(DS.Colors.ink)
            }
            Spacer()
            HStack(spacing: 5) {
                Image("icon-streak-flame")
                    .resizable().renderingMode(.template)
                    .frame(width: 18, height: 18)
                    .foregroundStyle(DS.Colors.oil)
                Text("\(service.profile.streakDays)")
                    .font(DS.Typo.score(17, .bold))
                    .foregroundStyle(DS.Colors.ink)
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(Color.white)
            .clipShape(Capsule())
            .overlay(Capsule().strokeBorder(DS.Colors.hairline, lineWidth: 1))
        }
        .padding(.top, 12)
    }

    private var scoreCard: some View {
        VStack(spacing: 14) {
            ZStack {
                Circle()
                    .stroke(DS.Colors.hairline.opacity(0.6), lineWidth: 10)
                Circle()
                    .trim(from: 0, to: appeared ? CGFloat(scan.displayedOverall) / 100 : 0)
                    .stroke(DS.Colors.azure, style: StrokeStyle(lineWidth: 10, lineCap: .round))
                    .rotationEffect(.degrees(-90))
                    .animation(DS.Motion.ringSpring, value: appeared)
                VStack(spacing: 0) {
                    // SF Pro Rounded for all score numerals
                    Text("\(displayedScore)")
                        .font(DS.Typo.score(44))
                        .foregroundStyle(DS.Colors.ink)
                        .contentTransition(.numericText())
                    MicroLabel(text: "Overall")
                }
            }
            .frame(width: 148, height: 148)
            .sensoryFeedback(.success, trigger: displayedScore == scan.displayedOverall && appeared)

            Text("Potential \(scan.potential) — your routine is closing the gap.")
                .font(DS.Typo.caption)
                .foregroundStyle(DS.Colors.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(24)
        .cardStyle()
    }

    private var metricGrid: some View {
        LazyVGrid(columns: [GridItem(.flexible(), spacing: 12), GridItem(.flexible())], spacing: 12) {
            ForEach(scan.skin) { metric in
                VStack(alignment: .leading, spacing: 8) {
                    HStack {
                        Text(metric.kind.rawValue)
                            .font(DS.Typo.bodyMedium)
                            .foregroundStyle(DS.Colors.ink)
                        Spacer()
                        StatusPill(level: metric.status)
                    }
                    Text("\(metric.score)")
                        .font(DS.Typo.score(28))
                        .foregroundStyle(metricColor(metric.kind))
                }
                .padding(16)
                .frame(maxWidth: .infinity, alignment: .leading)
                .cardStyle()
            }
        }
    }

    private var routineCard: some View {
        Button {
            router.tab = .progress
        } label: {
            HStack(spacing: 14) {
                Image(service.todayRoutine.exercises[0].illustration)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 56, height: 56)
                VStack(alignment: .leading, spacing: 3) {
                    MicroLabel(text: "Today · \(service.todayRoutine.minutes) min")
                    Text(service.todayRoutine.title)
                        .font(DS.Typo.bodyMedium)
                        .foregroundStyle(DS.Colors.ink)
                }
                Spacer()
                Image("icon-chevron-right")
                    .resizable().renderingMode(.template)
                    .frame(width: 20, height: 20)
                    .foregroundStyle(DS.Colors.micro)
            }
            .padding(16)
            .cardStyle()
        }
        .buttonStyle(.plain)
    }

    private func metricColor(_ kind: MetricScore.Kind) -> Color {
        switch kind {
        case .redness: DS.Colors.redness
        case .texture: DS.Colors.texture
        case .tone: DS.Colors.tone
        case .oil: DS.Colors.oil
        }
    }

    private func animateIn() {
        guard !appeared else { return }
        appeared = true
        // Score count-up: 1.4s decelerating
        let target = scan.displayedOverall
        Task { @MainActor in
            let steps = 30
            for i in 1...steps {
                let t = Double(i) / Double(steps)
                let eased = 1 - pow(1 - t, 3) // decelerate
                withAnimation(.linear(duration: 0.02)) {
                    displayedScore = Int(Double(target) * eased)
                }
                try? await Task.sleep(for: .seconds(DS.Motion.scoreCountUp / Double(steps)))
            }
            displayedScore = target
        }
    }
}

#Preview {
    DashboardView().environment(AppRouter())
}
