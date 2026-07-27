import SwiftUI

/// Screen 09 — Skin analysis with metric overlay modes.
/// Motion spec: overlay switch is a 0.3s cross-fade; chip, gauge, and status
/// pill recolor together.
struct SkinAnalysisView: View {
    /// When embedded in the onboarding flow, the parent supplies the CTA.
    var embedded = false
    @Environment(AppRouter.self) private var router
    private let scan = MockDataService.shared.latestScan
    @State private var selected: MetricScore.Kind = .redness

    private var current: MetricScore {
        scan.skin.first { $0.kind == selected } ?? scan.skin[0]
    }

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            ScrollView {
                VStack(spacing: 16) {
                    MicroLabel(text: "Skin analysis")
                        .padding(.top, 14)

                    // face with metric overlay tint — 0.3s cross-fade on switch
                    ZStack {
                        Image("scan-demo")
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                        Rectangle()
                            .fill(color(for: selected).opacity(0.28))
                            .blendMode(.multiply)
                    }
                    .frame(width: 250, height: 300)
                    .clipShape(RoundedRectangle(cornerRadius: DS.Radius.card, style: .continuous))
                    .shadow(color: DS.Colors.cardShadow, radius: DS.Shadow.cardBlur / 2, x: 0, y: DS.Shadow.cardY)
                    .animation(DS.Motion.overlayFade, value: selected)

                    // metric chips — selected chip carries the metric color
                    HStack(spacing: 8) {
                        ForEach(MetricScore.Kind.allCases, id: \.self) { kind in
                            Button {
                                withAnimation(DS.Motion.overlayFade) { selected = kind }
                            } label: {
                                Text(kind.rawValue)
                                    .font(DS.Typo.chip)
                                    .foregroundStyle(selected == kind ? .white : DS.Colors.ink)
                                    .padding(.horizontal, 14)
                                    .padding(.vertical, 9)
                                    .background(selected == kind ? color(for: kind) : .white)
                                    .clipShape(Capsule())
                                    .overlay(
                                        Capsule().strokeBorder(
                                            selected == kind ? .clear : DS.Colors.hairline, lineWidth: 1)
                                    )
                            }
                            .buttonStyle(.plain)
                        }
                    }

                    // gauge + status pill recolor with the chip
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text(current.kind.rawValue)
                                .font(DS.Typo.title)
                                .foregroundStyle(DS.Colors.ink)
                            Spacer()
                            StatusPill(level: current.status)
                        }
                        HStack(alignment: .firstTextBaseline, spacing: 4) {
                            Text("\(current.score)")
                                .font(DS.Typo.score(40))
                                .foregroundStyle(color(for: selected))
                                .contentTransition(.numericText())
                            Text("/ 100")
                                .font(DS.Typo.caption)
                                .foregroundStyle(DS.Colors.secondary)
                        }
                        GeometryReader { geo in
                            ZStack(alignment: .leading) {
                                Capsule().fill(DS.Colors.hairline.opacity(0.5))
                                Capsule()
                                    .fill(color(for: selected))
                                    .frame(width: geo.size.width * CGFloat(current.score) / 100)
                            }
                        }
                        .frame(height: 8)
                        Text(current.insight)
                            .font(DS.Typo.body)
                            .foregroundStyle(DS.Colors.secondary)
                    }
                    .padding(20)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .cardStyle()
                    .padding(.horizontal, 20)
                    .animation(DS.Motion.overlayFade, value: selected)

                    Button("Build my routine") {
                        router.push(.paywall)
                    }
                    .buttonStyle(PrimaryCTAStyle())
                    .padding(.horizontal, 20)
                    .padding(.top, 6)

                    Text("Cosmetic guidance only — not medical advice.")
                        .font(DS.Typo.sans(11))
                        .foregroundStyle(DS.Colors.micro)
                        .padding(.bottom, 30)
                }
            }
            .scrollIndicators(.hidden)
        }
    }

    private func color(for kind: MetricScore.Kind) -> Color {
        switch kind {
        case .redness: DS.Colors.redness
        case .texture: DS.Colors.texture
        case .tone: DS.Colors.tone
        case .oil: DS.Colors.oil
        }
    }
}

#Preview {
    NavigationStack { SkinAnalysisView() }.environment(AppRouter())
}
