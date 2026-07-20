import SwiftUI

/// Screen 11 — Paywall scaffold. Clouds/glow/grain are programmatic
/// (CloudField). StoreKit 2 wiring lands in the build loop; plans render
/// from mocks so the flow is walkable today.
struct PaywallView: View {
    @Environment(AppRouter.self) private var router
    private let service: DataService = MockDataService.shared
    @State private var selectedPlanID: UUID?

    var body: some View {
        ZStack {
            CloudField()

            VStack(spacing: 18) {
                HStack {
                    Spacer()
                    Button {
                        router.pop()
                    } label: {
                        Image("icon-close")
                            .resizable().renderingMode(.template)
                            .frame(width: 18, height: 18)
                            .foregroundStyle(DS.Colors.secondary)
                            .padding(10)
                            .background(.white.opacity(0.8))
                            .clipShape(Circle())
                    }
                    .buttonStyle(.plain)
                }
                .padding(.horizontal, 20)

                Spacer()

                CoachMascotView(size: 72)

                (Text("Unlock your ").foregroundStyle(DS.Colors.ink)
                 + Text("routine").foregroundStyle(DS.Colors.azure))
                    .font(DS.Typo.headline)

                Text("Daily coaching, full analysis, unlimited scans.")
                    .font(DS.Typo.body)
                    .foregroundStyle(DS.Colors.secondary)

                VStack(spacing: 10) {
                    ForEach(service.paywallPlans) { plan in
                        planRow(plan)
                    }
                }
                .padding(.horizontal, 20)

                Button("Continue") {}
                    .buttonStyle(PrimaryCTAStyle())
                    .padding(.horizontal, 20)

                HStack(spacing: 18) {
                    Text("Restore").underline()
                    Text("Terms")
                    Text("Privacy")
                }
                .font(DS.Typo.caption)
                .foregroundStyle(DS.Colors.secondary)
                .padding(.bottom, 18)
            }
        }
        .toolbar(.hidden, for: .navigationBar)
        .onAppear { selectedPlanID = service.paywallPlans.first?.id }
    }

    private func planRow(_ plan: PaywallPlan) -> some View {
        Button {
            selectedPlanID = plan.id
        } label: {
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    HStack(spacing: 8) {
                        Text(plan.name)
                            .font(DS.Typo.bodyMedium)
                            .foregroundStyle(DS.Colors.ink)
                        if let badge = plan.badge {
                            Text(badge)
                                .font(DS.Typo.sans(9, .semibold))
                                .tracking(1)
                                .foregroundStyle(.white)
                                .padding(.horizontal, 7)
                                .padding(.vertical, 3)
                                .background(DS.Colors.azure)
                                .clipShape(Capsule())
                        }
                    }
                    if let equivalent = plan.perWeekEquivalent {
                        Text(equivalent)
                            .font(DS.Typo.caption)
                            .foregroundStyle(DS.Colors.secondary)
                    }
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 2) {
                    Text(plan.price)
                        .font(DS.Typo.score(17, .bold))
                        .foregroundStyle(DS.Colors.ink)
                    Text(plan.period)
                        .font(DS.Typo.caption)
                        .foregroundStyle(DS.Colors.secondary)
                }
            }
            .padding(16)
            .background(Color.white)
            .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .strokeBorder(selectedPlanID == plan.id ? DS.Colors.azure : DS.Colors.hairline,
                                  lineWidth: selectedPlanID == plan.id ? 2 : 1)
            )
        }
        .buttonStyle(.plain)
    }
}

#Preview {
    PaywallView().environment(AppRouter())
}
