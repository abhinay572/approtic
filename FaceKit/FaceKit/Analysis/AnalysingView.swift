import SwiftUI

/// Screen 07 — Analysing: porcelain mask + progress rows ticking through.
struct AnalysingView: View {
    @Environment(AppRouter.self) private var router
    @State private var completedRows = 0
    @State private var percent = 0

    private let rows = [
        "Mapping facial landmarks",
        "Measuring structure & symmetry",
        "Reading skin metrics",
        "Compiling your routine",
    ]

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            VStack(spacing: 24) {
                Spacer()

                Image("porcelain-mask-static")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 210, height: 210)
                    .clipShape(RoundedRectangle(cornerRadius: DS.Radius.card, style: .continuous))
                    .shadow(color: DS.Colors.cardShadow, radius: DS.Shadow.cardBlur / 2, x: 0, y: DS.Shadow.cardY)

                Text("\(percent)%")
                    .font(DS.Typo.score(40))
                    .foregroundStyle(DS.Colors.ink)
                    .contentTransition(.numericText())

                VStack(alignment: .leading, spacing: 14) {
                    ForEach(Array(rows.enumerated()), id: \.offset) { index, row in
                        HStack(spacing: 12) {
                            ZStack {
                                Circle()
                                    .strokeBorder(DS.Colors.hairline, lineWidth: 1.5)
                                    .frame(width: 24, height: 24)
                                if index < completedRows {
                                    Circle()
                                        .fill(DS.Colors.success)
                                        .frame(width: 24, height: 24)
                                    Image("icon-check")
                                        .resizable().renderingMode(.template)
                                        .frame(width: 13, height: 13)
                                        .foregroundStyle(.white)
                                        .transition(.scale.combined(with: .opacity))
                                }
                            }
                            Text(row)
                                .font(DS.Typo.body)
                                .foregroundStyle(index < completedRows ? DS.Colors.ink : DS.Colors.secondary)
                        }
                    }
                }
                .padding(22)
                .frame(maxWidth: .infinity, alignment: .leading)
                .cardStyle()
                .padding(.horizontal, 20)

                Spacer()
            }
        }
        .toolbar(.hidden, for: .navigationBar)
        .task {
            for i in 1...rows.count {
                for _ in 0..<8 {
                    try? await Task.sleep(for: .milliseconds(85))
                    withAnimation(.linear(duration: 0.08)) {
                        percent = min(100, percent + 3)
                    }
                }
                withAnimation(DS.Motion.cardSpring) { completedRows = i }
            }
            withAnimation(.linear(duration: 0.2)) { percent = 100 }
            try? await Task.sleep(for: .milliseconds(500))
            router.push(.structureAnalysis)
        }
    }
}

#Preview {
    AnalysingView().environment(AppRouter())
}
