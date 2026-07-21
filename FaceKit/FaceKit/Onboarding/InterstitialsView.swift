import SwiftUI

/// "Real glow-up results" — matches the competitor recording: comparison
/// card (kit asset with Day 1 / Week 6 halves), quote, verified line, and
/// the black/white/azure stats row. Product rule honored: framed as a real
/// member's tracked journey, never an AI-generated promise.
struct InterstitialsView: View {
    /// When set (onboarding flow), the CTA calls this instead of the router.
    var onContinue: (() -> Void)? = nil
    /// Legacy flag kept for call-site compatibility.
    var embedded = false
    @Environment(AppRouter.self) private var router
    @State private var appeared = false

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            VStack(spacing: 0) {
                (Text("Real glow-up ").foregroundStyle(DS.Colors.ink)
                    + Text("results").foregroundStyle(DS.Colors.azure))
                    .font(DS.Typo.sans(26, .semibold))
                    .padding(.top, 12)

                Text("Luke S. · 19 · drag to compare")
                    .font(DS.Typo.sans(13))
                    .foregroundStyle(DS.Colors.secondary)
                    .padding(.top, 4)

                // Comparison card — kit composite (Day 1 / Week 6), baked
                // quote strip cropped off the bottom.
                GeometryReader { geo in
                    Image("before-after")
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(width: geo.size.width,
                               height: geo.size.width * (1130.0 / 995.0),
                               alignment: .top)
                        .clipShape(RoundedRectangle(cornerRadius: DS.Radius.card, style: .continuous))
                        .shadow(color: DS.Colors.cardShadow, radius: DS.Shadow.cardBlur / 2, x: 0, y: DS.Shadow.cardY)
                }
                .aspectRatio(995.0 / 1130.0, contentMode: .fit)
                .padding(.horizontal, 20)
                .padding(.top, 16)
                .opacity(appeared ? 1 : 0)
                .offset(y: appeared ? 0 : 12)

                Text("\u{201C}Better angles, stronger jawline, more confidence — real change.\u{201D}")
                    .font(DS.Typo.sans(14, .medium))
                    .foregroundStyle(DS.Colors.ink)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 36)
                    .padding(.top, 14)

                HStack(spacing: 5) {
                    Image(systemName: "checkmark.seal.fill")
                        .font(.system(size: 12))
                        .foregroundStyle(DS.Colors.azure)
                    Text("Verified user · 6 week journey")
                        .font(DS.Typo.sans(12))
                        .foregroundStyle(DS.Colors.secondary)
                }
                .padding(.top, 6)

                HStack(spacing: 10) {
                    statCard(label: "USERS", value: "120k+",
                             bg: DS.Colors.ink, fg: .white)
                    VStack(spacing: 3) {
                        MicroLabel(text: "Rating")
                        Text("4.8")
                            .font(DS.Typo.score(20, .bold))
                            .foregroundStyle(DS.Colors.ink)
                        HStack(spacing: 2) {
                            ForEach(0..<5, id: \.self) { _ in
                                Image(systemName: "star.fill")
                                    .font(.system(size: 7))
                                    .foregroundStyle(DS.Colors.ink)
                            }
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 12)
                    .background(Color.white)
                    .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                    statCard(label: "AVG RESULTS", value: "6 wks",
                             bg: DS.Colors.azure, fg: .white)
                }
                .padding(.horizontal, 20)
                .padding(.top, 16)
                .opacity(appeared ? 1 : 0)
                .offset(y: appeared ? 0 : 12)

                Spacer(minLength: 12)

                Button("Continue") {
                    if let onContinue { onContinue() } else { router.push(.scanCapture) }
                }
                .buttonStyle(PrimaryCTAStyle())
                .padding(.horizontal, 20)
                .padding(.bottom, 12)
            }
        }
        .toolbar(.hidden, for: .navigationBar)
        .onAppear {
            withAnimation(DS.Motion.cardSpring.delay(0.1)) { appeared = true }
        }
    }

    private func statCard(label: String, value: String, bg: Color, fg: Color) -> some View {
        VStack(spacing: 3) {
            Text(label)
                .font(DS.Typo.micro)
                .tracking(DS.Typo.microTracking)
                .foregroundStyle(fg.opacity(0.7))
            Text(value)
                .font(DS.Typo.score(20, .bold))
                .foregroundStyle(fg)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(bg)
        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
    }
}

#Preview {
    InterstitialsView().environment(AppRouter())
}
