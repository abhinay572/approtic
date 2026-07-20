import SwiftUI

/// Screen 14 — Compare two scans: slider + score deltas.
struct CompareView: View {
    private let service: DataService = MockDataService.shared

    private var latest: ScanResult { service.scanHistory.first ?? service.latestScan }
    private var oldest: ScanResult { service.scanHistory.last ?? service.latestScan }

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            ScrollView {
                VStack(spacing: 16) {
                    BeforeAfterSlider()
                        .frame(height: 320)
                        .padding(.horizontal, 20)
                        .padding(.top, 14)

                    HStack(spacing: 12) {
                        deltaCard(label: "Overall",
                                  from: oldest.displayedOverall, to: latest.displayedOverall)
                        deltaCard(label: "Jawline", from: 55, to: 63)
                        deltaCard(label: "Tone", from: 71, to: 78)
                    }
                    .padding(.horizontal, 20)

                    VStack(alignment: .leading, spacing: 6) {
                        MicroLabel(text: "\(daysBetween) days between scans")
                        Text("Consistent daily work is showing in your jaw definition and tone.")
                            .font(DS.Typo.body)
                            .foregroundStyle(DS.Colors.secondary)
                    }
                    .padding(18)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .cardStyle()
                    .padding(.horizontal, 20)
                    .padding(.bottom, 30)
                }
            }
            .scrollIndicators(.hidden)
        }
        .navigationTitle("Compare")
        .navigationBarTitleDisplayMode(.inline)
    }

    private var daysBetween: Int {
        Calendar.current.dateComponents([.day], from: oldest.date, to: latest.date).day ?? 0
    }

    private func deltaCard(label: String, from: Int, to: Int) -> some View {
        VStack(spacing: 4) {
            MicroLabel(text: label)
            Text("\(to)")
                .font(DS.Typo.score(26))
                .foregroundStyle(DS.Colors.ink)
            Text("+\(to - from)")
                .font(DS.Typo.score(13, .semibold))
                .foregroundStyle(DS.Colors.success)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 14)
        .cardStyle()
    }
}

#Preview {
    NavigationStack { CompareView() }.environment(AppRouter())
}
