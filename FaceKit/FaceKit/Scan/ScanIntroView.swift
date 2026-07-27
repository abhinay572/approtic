import SwiftUI

/// Scan tab landing. Screen 06 (AVCapture + Vision) enters the build loop at
/// its slot; this scaffold shows the pre-scan state with the mask static.
struct ScanIntroView: View {
    @Environment(AppRouter.self) private var router

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            VStack(spacing: 20) {
                Spacer()

                Image("porcelain-mask-static")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 240, height: 240)
                    .clipShape(RoundedRectangle(cornerRadius: DS.Radius.card, style: .continuous))
                    .shadow(color: DS.Colors.cardShadow, radius: DS.Shadow.cardBlur / 2, x: 0, y: DS.Shadow.cardY)

                VStack(spacing: 8) {
                    // one highlighted word per headline
                    (Text("Scan your ").foregroundStyle(DS.Colors.ink)
                     + Text("face").foregroundStyle(DS.Colors.azure)
                     + Text(".").foregroundStyle(DS.Colors.ink))
                        .font(DS.Typo.headline)

                    Text("90 seconds, on-device analysis. Your scan never leaves your iPhone.")
                        .font(DS.Typo.body)
                        .foregroundStyle(DS.Colors.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 40)
                }

                Spacer()

                Button("Start scan") {
                    router.push(.scanCapture)
                }
                .buttonStyle(PrimaryCTAStyle())
                .padding(.horizontal, 20)

                Text("Not medical advice. Analysis is cosmetic guidance only.")
                    .font(DS.Typo.sans(11))
                    .foregroundStyle(DS.Colors.micro)
                    .padding(.bottom, DS.Size.tabBarHeight + 28)
            }
        }
    }
}

#Preview {
    ScanIntroView().environment(AppRouter())
}
