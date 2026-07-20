import SwiftUI

/// Screen 04 — Sign-in sheet. Product rule: account optional, never blocks
/// access after payment — copy says so.
struct SignInSheetView: View {
    @Environment(AppRouter.self) private var router

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            VStack(spacing: 14) {
                Capsule()
                    .fill(DS.Colors.hairline)
                    .frame(width: 40, height: 5)
                    .padding(.top, 10)

                Spacer()

                CoachMascotView(size: 64)

                (Text("Save your ").foregroundStyle(DS.Colors.ink)
                 + Text("progress").foregroundStyle(DS.Colors.azure))
                    .font(DS.Typo.headline)

                Text("An account is optional — your scans stay on this device either way.")
                    .font(DS.Typo.body)
                    .foregroundStyle(DS.Colors.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 36)

                Spacer()

                Button {
                    router.pop()
                } label: {
                    Label(" Continue with Apple", systemImage: "apple.logo")
                }
                .buttonStyle(PrimaryCTAStyle())
                .padding(.horizontal, 20)

                Button {
                    router.pop()
                } label: {
                    Text("Continue with Google")
                        .font(DS.Typo.cta)
                        .foregroundStyle(DS.Colors.ink)
                        .frame(maxWidth: .infinity)
                        .frame(height: DS.Size.ctaHeight)
                        .background(Color.white)
                        .clipShape(RoundedRectangle(cornerRadius: DS.Radius.cta, style: .continuous))
                        .overlay(
                            RoundedRectangle(cornerRadius: DS.Radius.cta, style: .continuous)
                                .strokeBorder(DS.Colors.hairline, lineWidth: 1)
                        )
                }
                .buttonStyle(.plain)
                .padding(.horizontal, 20)

                Button("Skip for now") {
                    router.pop()
                }
                .font(DS.Typo.caption)
                .foregroundStyle(DS.Colors.secondary)
                .padding(.bottom, 24)
            }
        }
        .toolbar(.hidden, for: .navigationBar)
    }
}

#Preview {
    SignInSheetView().environment(AppRouter())
}
