import SwiftUI
import AVFoundation

/// Screen 06 — Scan capture: front camera preview inside a blob mask,
/// 3-2-1 countdown (scale 1.15→1.0 + light haptic each second), tick ring
/// while capturing, then on to Analysing. Vision landmark overlay lands in
/// the fidelity pass; the simulator (no camera) shows the porcelain static.
struct ScanCaptureView: View {
    @Environment(AppRouter.self) private var router
    @State private var camera = CameraController()
    @State private var countdown: Int?
    @State private var capturing = false
    @State private var captureProgress: CGFloat = 0

    var body: some View {
        ZStack {
            DS.Colors.ink.ignoresSafeArea()

            VStack(spacing: 20) {
                MicroLabel(text: "Keep your face inside the shape")
                    .foregroundStyle(.white.opacity(0.8))
                    .padding(.top, 18)

                ZStack {
                    Group {
                        if camera.isRunning {
                            CameraPreview(session: camera.session)
                        } else {
                            Image("porcelain-mask-static")
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                        }
                    }
                    .frame(width: 300, height: 380)
                    .clipShape(FaceBlobShape())
                    .overlay(
                        FaceBlobShape()
                            .strokeBorder(.white.opacity(0.9), lineWidth: 2)
                    )

                    // tick ring while capturing
                    if capturing {
                        FaceBlobShape()
                            .trim(from: 0, to: captureProgress)
                            .stroke(DS.Colors.azure, style: StrokeStyle(lineWidth: 4, lineCap: .round))
                            .frame(width: 300, height: 380)
                            .animation(.linear(duration: 0.1), value: captureProgress)
                    }

                    if let n = countdown {
                        Text("\(n)")
                            .font(DS.Typo.score(88))
                            .foregroundStyle(.white)
                            .id(n)
                            .transition(.scale(scale: DS.Motion.countdownScale).combined(with: .opacity))
                            .sensoryFeedback(.impact(weight: .light), trigger: n)
                    }
                }

                Text("Scans are analysed on your iPhone and stay on this device.")
                    .font(DS.Typo.caption)
                    .foregroundStyle(.white.opacity(0.65))

                Spacer()

                Button(capturing ? "Hold still…" : "Start scan") {
                    guard countdown == nil, !capturing else { return }
                    runCapture()
                }
                .buttonStyle(ScanCTAStyle())
                .padding(.horizontal, 20)
                .padding(.bottom, 30)
            }
        }
        .toolbar(.hidden, for: .navigationBar)
        .onAppear { camera.start() }
        .onDisappear { camera.stop() }
    }

    private func runCapture() {
        Task { @MainActor in
            for n in [3, 2, 1] {
                withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) { countdown = n }
                try? await Task.sleep(for: .seconds(1))
            }
            withAnimation { countdown = nil }
            capturing = true
            for step in 1...30 {
                try? await Task.sleep(for: .milliseconds(60))
                captureProgress = CGFloat(step) / 30
            }
            router.push(.analysing)
            capturing = false
            captureProgress = 0
        }
    }
}

/// White CTA on the dark scan screen (inverse of PrimaryCTAStyle).
struct ScanCTAStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(DS.Typo.cta)
            .foregroundStyle(DS.Colors.ink)
            .frame(maxWidth: .infinity)
            .frame(height: DS.Size.ctaHeight)
            .background(.white)
            .clipShape(RoundedRectangle(cornerRadius: DS.Radius.cta, style: .continuous))
            .scaleEffect(configuration.isPressed ? DS.Motion.pressScale : 1)
    }
}

/// Organic face-window blob (superellipse-ish egg).
struct FaceBlobShape: InsettableShape {
    var inset: CGFloat = 0

    func inset(by amount: CGFloat) -> FaceBlobShape {
        var s = self
        s.inset += amount
        return s
    }

    func path(in rect: CGRect) -> Path {
        let r = rect.insetBy(dx: inset, dy: inset)
        var p = Path()
        let w = r.width, h = r.height
        p.move(to: CGPoint(x: r.minX + w * 0.5, y: r.minY))
        p.addCurve(to: CGPoint(x: r.minX + w, y: r.minY + h * 0.45),
                   control1: CGPoint(x: r.minX + w * 0.85, y: r.minY),
                   control2: CGPoint(x: r.minX + w, y: r.minY + h * 0.18))
        p.addCurve(to: CGPoint(x: r.minX + w * 0.5, y: r.minY + h),
                   control1: CGPoint(x: r.minX + w, y: r.minY + h * 0.78),
                   control2: CGPoint(x: r.minX + w * 0.78, y: r.minY + h))
        p.addCurve(to: CGPoint(x: r.minX, y: r.minY + h * 0.45),
                   control1: CGPoint(x: r.minX + w * 0.22, y: r.minY + h),
                   control2: CGPoint(x: r.minX, y: r.minY + h * 0.78))
        p.addCurve(to: CGPoint(x: r.minX + w * 0.5, y: r.minY),
                   control1: CGPoint(x: r.minX, y: r.minY + h * 0.18),
                   control2: CGPoint(x: r.minX + w * 0.15, y: r.minY))
        p.closeSubpath()
        return p
    }
}

// MARK: - Camera plumbing

@Observable
final class CameraController {
    let session = AVCaptureSession()
    var isRunning = false

    func start() {
        Task.detached { [session] in
            guard await AVCaptureDevice.requestAccess(for: .video) else { return }
            guard session.inputs.isEmpty else {
                session.startRunning()
                await MainActor.run { self.isRunning = session.isRunning }
                return
            }
            session.beginConfiguration()
            session.sessionPreset = .high
            if let device = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .front),
               let input = try? AVCaptureDeviceInput(device: device),
               session.canAddInput(input) {
                session.addInput(input)
            }
            session.commitConfiguration()
            session.startRunning()
            await MainActor.run { self.isRunning = session.isRunning }
        }
    }

    func stop() {
        Task.detached { [session] in
            session.stopRunning()
            await MainActor.run { self.isRunning = false }
        }
    }
}

struct CameraPreview: UIViewRepresentable {
    let session: AVCaptureSession

    final class PreviewView: UIView {
        override class var layerClass: AnyClass { AVCaptureVideoPreviewLayer.self }
        var previewLayer: AVCaptureVideoPreviewLayer { layer as! AVCaptureVideoPreviewLayer }
    }

    func makeUIView(context: Context) -> PreviewView {
        let view = PreviewView()
        view.previewLayer.session = session
        view.previewLayer.videoGravity = .resizeAspectFill
        return view
    }

    func updateUIView(_ uiView: PreviewView, context: Context) {}
}

#Preview {
    ScanCaptureView().environment(AppRouter())
}
