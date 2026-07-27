import SwiftUI

/// Interactive before/after comparison: drag the azure divider to reveal.
/// Uses the kit's real scan photos; labels overlay bottom corners.
struct BeforeAfterSlider: View {
    var beforeImage = "before-demo"
    var afterImage = "scan-demo"
    @State private var fraction: CGFloat = 0.5

    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width
            ZStack(alignment: .leading) {
                Image(afterImage)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: w, height: geo.size.height)
                    .clipped()

                Image(beforeImage)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: w, height: geo.size.height, alignment: .leading)
                    .clipped()
                    .mask(
                        HStack(spacing: 0) {
                            Rectangle().frame(width: w * fraction)
                            Spacer(minLength: 0)
                        }
                    )

                // Divider + handle
                Rectangle()
                    .fill(DS.Colors.azure)
                    .frame(width: 2)
                    .offset(x: w * fraction - 1)

                ZStack {
                    Circle()
                        .fill(.white)
                        .frame(width: 44, height: 44)
                        .shadow(color: DS.Colors.cardShadow, radius: 8, x: 0, y: 3)
                    HStack(spacing: 5) {
                        Image(systemName: "chevron.left")
                        Image(systemName: "chevron.right")
                    }
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundStyle(DS.Colors.azure)
                }
                .position(x: w * fraction, y: geo.size.height / 2)

                // Corner labels
                VStack {
                    Spacer()
                    HStack {
                        cornerLabel("WEEK 1", bg: .white.opacity(0.85), fg: DS.Colors.secondary)
                        Spacer()
                        cornerLabel("WEEK 4", bg: DS.Colors.azure, fg: .white)
                    }
                    .padding(12)
                }
            }
            .clipShape(RoundedRectangle(cornerRadius: DS.Radius.card, style: .continuous))
            .contentShape(Rectangle())
            .gesture(
                DragGesture(minimumDistance: 0)
                    .onChanged { value in
                        fraction = min(0.95, max(0.05, value.location.x / w))
                    }
            )
        }
    }

    private func cornerLabel(_ text: String, bg: Color, fg: Color) -> some View {
        Text(text)
            .font(DS.Typo.micro)
            .tracking(DS.Typo.microTracking)
            .foregroundStyle(fg)
            .padding(.horizontal, 10)
            .padding(.vertical, 5)
            .background(bg)
            .clipShape(Capsule())
    }
}

#Preview {
    BeforeAfterSlider()
        .frame(height: 320)
        .padding(20)
}
