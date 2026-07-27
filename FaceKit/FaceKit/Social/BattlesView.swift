import SwiftUI

/// Screen 18 — Battles (mock leaderboard). Scaffold version.
struct BattlesView: View {
    private let service: DataService = MockDataService.shared

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            ScrollView {
                VStack(spacing: 10) {
                    ForEach(service.leaderboard) { entry in
                        HStack(spacing: 14) {
                            Text("\(entry.rank)")
                                .font(DS.Typo.score(16, .bold))
                                .foregroundStyle(entry.rank <= 3 ? DS.Colors.azure : DS.Colors.micro)
                                .frame(width: 24)
                            Image(entry.avatar)
                                .resizable()
                                .frame(width: 42, height: 42)
                                .clipShape(Circle())
                            VStack(alignment: .leading, spacing: 2) {
                                Text(entry.isYou ? "\(entry.name) (you)" : entry.name)
                                    .font(DS.Typo.bodyMedium)
                                    .foregroundStyle(DS.Colors.ink)
                                HStack(spacing: 4) {
                                    Image("icon-streak-flame")
                                        .resizable().renderingMode(.template)
                                        .frame(width: 12, height: 12)
                                        .foregroundStyle(DS.Colors.oil)
                                    Text("\(entry.streak) days")
                                        .font(DS.Typo.caption)
                                        .foregroundStyle(DS.Colors.secondary)
                                }
                            }
                            Spacer()
                            Text("\(entry.score)")
                                .font(DS.Typo.score(22))
                                .foregroundStyle(DS.Colors.ink)
                        }
                        .padding(14)
                        .background(entry.isYou ? DS.Colors.azure.opacity(0.06) : .white)
                        .clipShape(RoundedRectangle(cornerRadius: DS.Radius.card, style: .continuous))
                        .shadow(color: DS.Colors.cardShadow, radius: DS.Shadow.cardBlur / 2, x: 0, y: DS.Shadow.cardY)
                    }
                }
                .padding(.horizontal, 20)
                .padding(.top, 12)
                .padding(.bottom, 40)
            }
            .scrollIndicators(.hidden)
        }
        .navigationTitle("Battles")
        .navigationBarTitleDisplayMode(.inline)
    }
}

#Preview {
    NavigationStack { BattlesView() }.environment(AppRouter())
}
