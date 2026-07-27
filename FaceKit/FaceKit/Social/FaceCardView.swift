import SwiftUI

/// Screen 17 — FaceCard: shareable score card + ShareLink render.
struct FaceCardView: View {
    private let card = MockDataService.shared.faceCard

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            VStack(spacing: 24) {
                Spacer()

                cardBody
                    .frame(width: 300, height: 400)

                ShareLink(
                    item: renderedImage,
                    preview: SharePreview("My FaceKit card", image: renderedImage)
                ) {
                    Label("Share card", image: "icon-share")
                        .font(DS.Typo.cta)
                        .foregroundStyle(.white)
                        .frame(maxWidth: .infinity)
                        .frame(height: DS.Size.ctaHeight)
                        .background(DS.Colors.ink)
                        .clipShape(RoundedRectangle(cornerRadius: DS.Radius.cta, style: .continuous))
                }
                .padding(.horizontal, 20)

                Spacer()
            }
        }
        .navigationTitle("FaceCard")
        .navigationBarTitleDisplayMode(.inline)
    }

    private var cardBody: some View {
        VStack(spacing: 14) {
            HStack {
                Text("FaceKit")
                    .font(DS.Typo.sans(15, .semibold))
                    .foregroundStyle(.white.opacity(0.9))
                Spacer()
                MicroLabel(text: "Day \(card.streak)")
                    .foregroundStyle(.white.opacity(0.7))
            }

            Spacer()

            Text("\(card.overall)")
                .font(DS.Typo.score(88))
                .foregroundStyle(.white)
            MicroLabel(text: "Overall score")
                .foregroundStyle(.white.opacity(0.75))

            Spacer()

            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    MicroLabel(text: "Best metric")
                        .foregroundStyle(.white.opacity(0.6))
                    Text(card.topMetric)
                        .font(DS.Typo.bodyMedium)
                        .foregroundStyle(.white)
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 2) {
                    MicroLabel(text: "Percentile")
                        .foregroundStyle(.white.opacity(0.6))
                    Text("Top \(100 - card.percentile)%")
                        .font(DS.Typo.bodyMedium)
                        .foregroundStyle(.white)
                }
            }
        }
        .padding(24)
        .background(
            LinearGradient(colors: [DS.Colors.azure, DS.Colors.ink],
                           startPoint: .topLeading, endPoint: .bottomTrailing)
        )
        .clipShape(RoundedRectangle(cornerRadius: DS.Radius.card, style: .continuous))
        .shadow(color: DS.Colors.cardShadow, radius: DS.Shadow.cardBlur / 2, x: 0, y: DS.Shadow.cardY)
    }

    @MainActor
    private var renderedImage: Image {
        let renderer = ImageRenderer(content: cardBody.frame(width: 300, height: 400))
        renderer.scale = 3
        if let uiImage = renderer.uiImage {
            return Image(uiImage: uiImage)
        }
        return Image("coach-mascot")
    }
}

#Preview {
    NavigationStack { FaceCardView() }.environment(AppRouter())
}
