import SwiftUI

/// Screen 03 — Hero with typewriter headline. Scaffold: typewriter implemented
/// (~35ms/char, azure word pre-colored); full fidelity pass happens in the loop.
struct HeroView: View {
    @Environment(AppRouter.self) private var router
    @State private var visibleCharacters = 0

    private let headline = "Train your face like an athlete."
    /// The one azure word in this headline.
    private let accentWord = "face"

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            VStack(spacing: 24) {
                Spacer()

                CoachMascotView(size: 88)

                typewriterHeadline
                    .font(DS.Typo.sans(34, .semibold))
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 32)
                    .frame(minHeight: 130)

                Text("Scan, score, and improve — 5 minutes a day.")
                    .font(DS.Typo.body)
                    .foregroundStyle(DS.Colors.secondary)

                Spacer()

                Button("Get started") {
                    router.push(.coachIntro)
                }
                .buttonStyle(PrimaryCTAStyle())
                .padding(.horizontal, 20)

                Button("I already have an account") {
                    router.push(.signIn)
                }
                .font(DS.Typo.caption)
                .foregroundStyle(DS.Colors.secondary)
                .padding(.bottom, 28)
            }
        }
        .task {
            // typewriter ~35ms/char
            while visibleCharacters < headline.count, !Task.isCancelled {
                try? await Task.sleep(for: .seconds(DS.Motion.typewriterPerChar))
                visibleCharacters += 1
            }
        }
    }

    private var typewriterHeadline: Text {
        let shown = String(headline.prefix(visibleCharacters))
        guard let range = shown.range(of: accentWord) else {
            return Text(shown).foregroundStyle(DS.Colors.ink)
        }
        return Text(shown[..<range.lowerBound]).foregroundStyle(DS.Colors.ink)
            + Text(shown[range]).foregroundStyle(DS.Colors.azure)
            + Text(shown[range.upperBound...]).foregroundStyle(DS.Colors.ink)
    }
}

#Preview {
    HeroView().environment(AppRouter())
}
