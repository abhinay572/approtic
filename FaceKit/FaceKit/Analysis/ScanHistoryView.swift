import SwiftUI

/// Screen 13 — Scan history scaffold.
struct ScanHistoryView: View {
    private let service: DataService = MockDataService.shared

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            ScrollView {
                VStack(spacing: 12) {
                    ForEach(service.scanHistory) { scan in
                        HStack(spacing: 14) {
                            Image("scan-demo")
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                                .frame(width: 52, height: 52)
                                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                            VStack(alignment: .leading, spacing: 3) {
                                Text(scan.date, format: .dateTime.day().month(.wide))
                                    .font(DS.Typo.bodyMedium)
                                    .foregroundStyle(DS.Colors.ink)
                                MicroLabel(text: "Full scan")
                            }
                            Spacer()
                            Text("\(scan.displayedOverall)")
                                .font(DS.Typo.score(24))
                                .foregroundStyle(DS.Colors.azure)
                        }
                        .padding(14)
                        .cardStyle()
                    }
                }
                .padding(.horizontal, 20)
                .padding(.top, 12)
                .padding(.bottom, 40)
            }
            .scrollIndicators(.hidden)
        }
        .navigationTitle("Scan history")
        .navigationBarTitleDisplayMode(.inline)
    }
}

#Preview {
    NavigationStack { ScanHistoryView() }.environment(AppRouter())
}
