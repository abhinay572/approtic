import SwiftUI

/// Screen 05 — Interstitials: proof stats + before/after compare slider.
/// Product rule honored: no AI-generated transformation promises — the slider
/// shows an example of tracking framing, labeled as an example.
struct InterstitialsView: View {
    /// When embedded in the onboarding flow, the parent supplies the CTA.
    var embedded = false
    @Environment(AppRouter.self) private var router
    @State private var appearedCards = 0

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            VStack(spacing: 18) {
                VStack(spacing: 6) {
                    (Text("Small daily work. ").foregroundStyle(DS.Colors.ink)
                     + Text("Visible").foregroundStyle(DS.Colors.azure)
                     + Text(" change.").foregroundStyle(DS.Colors.ink))
                        .font(DS.Typo.headline)
                    Text("Example of how FaceKit tracks your scans over time.")
                        .font(DS.Typo.caption)
                        .foregroundStyle(DS.Colors.secondary)
                }
                .padding(.top, 20)

                BeforeAfterSlider()
                    .frame(height: 340)
                    .padding(.horizontal, 20)

                HStack(spacing: 12) {
                    proofCard(value: "21", unit: "days", label: "avg. to first change", index: 0)
                    proofCard(value: "5", unit: "min", label: "per day", index: 1)
                    proofCard(value: "94%", unit: "", label: "keep their streak", index: 2)
                }
                .padding(.horizontal, 20)

                Spacer()

                Button("Continue") {
                    router.pop()
                }
                .buttonStyle(PrimaryCTAStyle())
                .padding(.horizontal, 20)
                .padding(.bottom, 28)
            }
        }
        .toolbar(.hidden, for: .navigationBar)
        .task {
            // card entrances staggered 60ms
            for i in 1...3 {
                try? await Task.sleep(for: .seconds(DS.Motion.cardStagger))
                withAnimation(DS.Motion.cardSpring) { appearedCards = i }
            }
        }
    }

    private func proofCard(value: String, unit: String, label: String, index: Int) -> some View {
        VStack(spacing: 3) {
            HStack(alignment: .firstTextBaseline, spacing: 2) {
                Text(value)
                    .font(DS.Typo.score(24))
                    .foregroundStyle(DS.Colors.ink)
                if !unit.isEmpty {
                    Text(unit)
                        .font(DS.Typo.caption)
                        .foregroundStyle(DS.Colors.secondary)
                }
            }
            Text(label)
                .font(DS.Typo.sans(11))
                .foregroundStyle(DS.Colors.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 14)
        .cardStyle()
        .opacity(index < appearedCards ? 1 : 0)
        .offset(y: index < appearedCards ? 0 : 16)
    }
}

/// Draggable before/after compare: azure divider, round handle.
struct BeforeAfterSlider: View {
    @State private var fraction: CGFloat = 0.5

    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width
            ZStack {
                Image("after-demo")
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: w, height: geo.size.height)
                    .clipped()

                Image("before-demo")
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: w, height: geo.size.height)
                    .clipped()
                    .mask(alignment: .leading) {
                        Rectangle().frame(width: w * fraction)
                    }

                // divider + handle
                ZStack {
                    Rectangle()
                        .fill(DS.Colors.azure)
                        .frame(width: 2)
                    Circle()
                        .fill(.white)
                        .frame(width: 36, height: 36)
                        .shadow(color: DS.Colors.cardShadow, radius: 8, x: 0, y: 4)
                        .overlay(
                            HStack(spacing: 2) {
                                Image("icon-chevron-left")
                                    .resizable().renderingMode(.template)
                                    .frame(width: 11, height: 11)
                                Image("icon-chevron-right")
                                    .resizable().renderingMode(.template)
                                    .frame(width: 11, height: 11)
                            }
                            .foregroundStyle(DS.Colors.azure)
                        )
                }
                .position(x: w * fraction, y: geo.size.height / 2)

                // labels
                VStack {
                    Spacer()
                    HStack {
                        MicroLabel(text: "Week 1")
                            .padding(.horizontal, 10).padding(.vertical, 5)
                            .background(.white.opacity(0.9)).clipShape(Capsule())
                        Spacer()
                        MicroLabel(text: "Week 4")
                            .padding(.horizontal, 10).padding(.vertical, 5)
                            .background(.white.opacity(0.9)).clipShape(Capsule())
                    }
                    .padding(12)
                }
            }
            .clipShape(RoundedRectangle(cornerRadius: DS.Radius.card, style: .continuous))
            .shadow(color: DS.Colors.cardShadow, radius: DS.Shadow.cardBlur / 2, x: 0, y: DS.Shadow.cardY)
            .gesture(
                DragGesture(minimumDistance: 0)
                    .onChanged { drag in
                        fraction = min(max(drag.location.x / w, 0.05), 0.95)
                    }
            )
        }
    }
}

#Preview {
    InterstitialsView().environment(AppRouter())
}
