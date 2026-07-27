import SwiftUI

/// Coach "typing" indicator — three dots pulsing in a chat bubble.
/// Shown for DS.Motion.typingDots (900ms) before each coach message.
struct TypingDots: View {
    @State private var phase = 0

    var body: some View {
        HStack(spacing: 5) {
            ForEach(0..<3, id: \.self) { i in
                Circle()
                    .fill(DS.Colors.micro)
                    .frame(width: 7, height: 7)
                    .offset(y: phase == i ? -3.5 : 0)
                    .opacity(phase == i ? 1 : 0.55)
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 14)
        .background(Color.white)
        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
        .shadow(color: DS.Colors.cardShadow, radius: 10, x: 0, y: 4)
        .task {
            while !Task.isCancelled {
                try? await Task.sleep(for: .milliseconds(220))
                withAnimation(.easeInOut(duration: 0.2)) {
                    phase = (phase + 1) % 3
                }
            }
        }
    }
}

#Preview {
    TypingDots().padding().background(DS.Colors.cream)
}
