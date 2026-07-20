import SwiftUI

/// SwiftUI-animated mascot fallback (shapes) until the Rive .riv exists.
/// Mirrors the layered SVG in assets/brand/coach-mascot.svg:
/// body blob → highlight → eyes (blink) → blush → mouth.
struct CoachMascotView: View {
    var size: CGFloat = 44
    @State private var blink = false

    var body: some View {
        ZStack {
            // body blob
            BlobShape()
                .fill(
                    RadialGradient(
                        colors: [DS.Colors.azure.opacity(0.85), DS.Colors.azure],
                        center: UnitPoint(x: 0.35, y: 0.25),
                        startRadius: size * 0.05,
                        endRadius: size * 0.9
                    )
                )

            // highlight
            Ellipse()
                .fill(.white.opacity(0.3))
                .frame(width: size * 0.32, height: size * 0.16)
                .rotationEffect(.degrees(-18))
                .offset(x: -size * 0.14, y: -size * 0.26)

            // eyes
            HStack(spacing: size * 0.16) {
                eye
                eye
            }
            .offset(y: -size * 0.02)

            // mouth
            SmileShape()
                .stroke(.white, style: StrokeStyle(lineWidth: size * 0.055, lineCap: .round))
                .frame(width: size * 0.2, height: size * 0.08)
                .offset(y: size * 0.2)
        }
        .frame(width: size, height: size)
        .task {
            // idle blink loop
            while !Task.isCancelled {
                try? await Task.sleep(for: .seconds(Double.random(in: 2.2...4.0)))
                withAnimation(.easeInOut(duration: 0.09)) { blink = true }
                try? await Task.sleep(for: .milliseconds(110))
                withAnimation(.easeInOut(duration: 0.09)) { blink = false }
            }
        }
    }

    private var eye: some View {
        ZStack {
            Ellipse()
                .fill(.white)
                .frame(width: size * 0.17, height: size * 0.22)
            Circle()
                .fill(DS.Colors.ink)
                .frame(width: size * 0.09)
                .offset(x: size * 0.015, y: size * 0.02)
        }
        .scaleEffect(y: blink ? 0.08 : 1, anchor: .center)
    }
}

/// Rounded mascot body with the two little "feet" tucked in.
struct BlobShape: Shape {
    func path(in rect: CGRect) -> Path {
        var p = Path()
        p.addEllipse(in: rect.insetBy(dx: rect.width * 0.04, dy: rect.height * 0.06))
        return p
    }
}

struct SmileShape: Shape {
    func path(in rect: CGRect) -> Path {
        var p = Path()
        p.move(to: CGPoint(x: 0, y: 0))
        p.addQuadCurve(to: CGPoint(x: rect.width, y: 0),
                       control: CGPoint(x: rect.width / 2, y: rect.height * 2))
        return p
    }
}

#Preview {
    CoachMascotView(size: 120)
        .padding()
        .background(Color.white)
}
