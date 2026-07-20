import SwiftUI

/// Paywall clouds + glow + grain, generated programmatically
/// (SwiftUI gradients + Canvas noise) per the Asset Fallback Protocol.
struct CloudField: View {
    var body: some View {
        ZStack {
            DS.Gradients.paywallSky

            // soft cloud blobs
            Canvas { context, canvasSize in
                let clouds: [(CGFloat, CGFloat, CGFloat, CGFloat)] = [
                    (0.18, 0.30, 0.55, 0.16),
                    (0.75, 0.22, 0.45, 0.13),
                    (0.50, 0.52, 0.70, 0.18),
                    (0.12, 0.68, 0.50, 0.15),
                    (0.85, 0.62, 0.42, 0.12),
                ]
                for (cx, cy, w, h) in clouds {
                    let rect = CGRect(
                        x: canvasSize.width * cx - canvasSize.width * w / 2,
                        y: canvasSize.height * cy - canvasSize.height * h / 2,
                        width: canvasSize.width * w,
                        height: canvasSize.height * h
                    )
                    context.fill(Ellipse().path(in: rect), with: .color(.white.opacity(0.55)))
                }
            }
            .blur(radius: 28)

            // fine grain so gradients don't band
            NoiseView(opacity: 0.035)
        }
        .ignoresSafeArea()
    }
}

/// Deterministic value-noise grain overlay.
struct NoiseView: View {
    var opacity: Double = 0.04

    var body: some View {
        Canvas { context, canvasSize in
            var seed: UInt64 = 0x9E3779B97F4A7C15
            func next() -> Double {
                seed ^= seed << 13; seed ^= seed >> 7; seed ^= seed << 17
                return Double(seed % 1000) / 1000.0
            }
            let cell: CGFloat = 3
            var y: CGFloat = 0
            while y < canvasSize.height {
                var x: CGFloat = 0
                while x < canvasSize.width {
                    let v = next()
                    if v > 0.5 {
                        context.fill(
                            Path(CGRect(x: x, y: y, width: cell, height: cell)),
                            with: .color(.black.opacity((v - 0.5) * 2 * opacity))
                        )
                    }
                    x += cell
                }
                y += cell
            }
        }
        .allowsHitTesting(false)
    }
}

#Preview {
    CloudField()
}
