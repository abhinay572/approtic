import SwiftUI

/// Screen 08 — Structure analysis: overall ring + per-feature bars.
/// Product rules: score floor 40, constructive framing, not-medical footer.
struct StructureAnalysisView: View {
    /// When embedded in the onboarding flow, the parent supplies the CTA.
    var embedded = false
    @Environment(AppRouter.self) private var router
    private let scan = MockDataService.shared.latestScan
    @State private var appeared = false
    @State private var displayedScore = 0

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            ScrollView {
                VStack(spacing: 16) {
                    MicroLabel(text: "Structure analysis")
                        .padding(.top, 14)

                    // Overall ring — count-up 1.4s decelerating, ring spring(1.1/0.85)
                    ZStack {
                        Circle()
                            .stroke(DS.Colors.hairline.opacity(0.6), lineWidth: 12)
                        Circle()
                            .trim(from: 0, to: appeared ? CGFloat(scan.displayedOverall) / 100 : 0)
                            .stroke(DS.Colors.azure, style: StrokeStyle(lineWidth: 12, lineCap: .round))
                            .rotationEffect(.degrees(-90))
                            .animation(DS.Motion.ringSpring, value: appeared)
                        VStack(spacing: 2) {
                            Text("\(displayedScore)")
                                .font(DS.Typo.score(52))
                                .foregroundStyle(DS.Colors.ink)
                                .contentTransition(.numericText())
                            MicroLabel(text: "Potential \(scan.potential)")
                        }
                    }
                    .frame(width: 170, height: 170)
                    .padding(.vertical, 10)
                    .sensoryFeedback(.success, trigger: displayedScore == scan.displayedOverall && appeared)

                    ForEach(Array(scan.structure.enumerated()), id: \.element.id) { index, item in
                        structureRow(item)
                            .opacity(appeared ? 1 : 0)
                            .offset(y: appeared ? 0 : 16)
                            .animation(DS.Motion.cardSpring.delay(Double(index) * DS.Motion.cardStagger), value: appeared)
                    }
                    .padding(.horizontal, 20)

                    Button("See skin analysis") {
                        router.push(.skinAnalysis)
                    }
                    .buttonStyle(PrimaryCTAStyle())
                    .padding(.horizontal, 20)
                    .padding(.top, 8)

                    Text("Cosmetic guidance only — not medical advice.")
                        .font(DS.Typo.sans(11))
                        .foregroundStyle(DS.Colors.micro)
                        .padding(.bottom, 30)
                }
            }
            .scrollIndicators(.hidden)
        }
        .navigationBarBackButtonHidden(false)
        .onAppear {
            guard !appeared else { return }
            appeared = true
            Task { @MainActor in
                let steps = 30
                for i in 1...steps {
                    let t = Double(i) / Double(steps)
                    let eased = 1 - pow(1 - t, 3)
                    withAnimation(.linear(duration: 0.02)) {
                        displayedScore = Int(Double(scan.displayedOverall) * eased)
                    }
                    try? await Task.sleep(for: .seconds(DS.Motion.scoreCountUp / Double(steps)))
                }
                displayedScore = scan.displayedOverall
            }
        }
    }

    private func structureRow(_ item: StructureScore) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text(item.label)
                    .font(DS.Typo.bodyMedium)
                    .foregroundStyle(DS.Colors.ink)
                Spacer()
                Text("\(item.score)")
                    .font(DS.Typo.score(20))
                    .foregroundStyle(DS.Colors.ink)
                MicroLabel(text: "Top \(100 - item.percentile)%")
            }
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule().fill(DS.Colors.hairline.opacity(0.5))
                    Capsule()
                        .fill(DS.Colors.azure)
                        .frame(width: appeared ? geo.size.width * CGFloat(item.score) / 100 : 0)
                        .animation(DS.Motion.ringSpring, value: appeared)
                }
            }
            .frame(height: 8)
            Text(item.note)
                .font(DS.Typo.caption)
                .foregroundStyle(DS.Colors.secondary)
        }
        .padding(18)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle()
    }
}

#Preview {
    NavigationStack { StructureAnalysisView() }.environment(AppRouter())
}
