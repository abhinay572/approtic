import SwiftUI

/// Coach intro, per the competitor recording: mascot top-left, three big
/// staggered headline lines, pill name input with azure round send button,
/// azure glow anchored bottom.
struct CoachIntroView: View {
    @Environment(AppRouter.self) private var router
    /// Flow hook — receives the typed name. Falls back to router.pop().
    var onDone: ((String) -> Void)? = nil

    @State private var visibleLines = 0
    @State private var name = ""
    @FocusState private var nameFocused: Bool

    private var trimmed: String {
        name.trimmingCharacters(in: .whitespaces)
    }

    var body: some View {
        ZStack {
            DS.Gradients.chatBackground

            VStack(alignment: .leading, spacing: 0) {
                Spacer().frame(height: 24)

                Image("coach-mascot")
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: 72, height: 72)
                    .clipShape(Circle())
                    .padding(.bottom, 28)

                VStack(alignment: .leading, spacing: 6) {
                    if visibleLines > 0 {
                        Text("Hey 👋")
                            .font(DS.Typo.sans(30, .semibold))
                            .foregroundStyle(DS.Colors.secondary)
                            .transition(.offset(y: 10).combined(with: .opacity))
                    }
                    if visibleLines > 1 {
                        Text("I\u{2019}m FaceKit Coach")
                            .font(DS.Typo.sans(30, .semibold))
                            .foregroundStyle(DS.Colors.secondary)
                            .transition(.offset(y: 10).combined(with: .opacity))
                    }
                    if visibleLines > 2 {
                        Text("What should I call you?")
                            .font(DS.Typo.sans(30, .semibold))
                            .foregroundStyle(DS.Colors.ink)
                            .transition(.offset(y: 10).combined(with: .opacity))
                    }
                }

                Spacer()

                HStack(spacing: 10) {
                    TextField("Type your name…", text: $name)
                        .font(DS.Typo.body)
                        .foregroundStyle(DS.Colors.ink)
                        .textInputAutocapitalization(.words)
                        .focused($nameFocused)
                        .padding(.horizontal, 18)
                        .padding(.vertical, 15)
                        .background(Color.white)
                        .clipShape(Capsule())
                        .overlay(Capsule().strokeBorder(DS.Colors.hairline, lineWidth: 1))
                        .onSubmit(submit)

                    Button(action: submit) {
                        Image(systemName: "arrow.right")
                            .font(.system(size: 17, weight: .semibold))
                            .foregroundStyle(.white)
                            .frame(width: 50, height: 50)
                            .background(DS.Colors.azure.opacity(trimmed.isEmpty ? 0.35 : 1))
                            .clipShape(Circle())
                    }
                    .buttonStyle(.plain)
                    .disabled(trimmed.isEmpty)
                    .animation(DS.Motion.overlayFade, value: trimmed.isEmpty)
                }
                .padding(.bottom, 16)
            }
            .padding(.horizontal, 24)
        }
        .toolbar(.hidden, for: .navigationBar)
        .task {
            for i in 1...3 {
                try? await Task.sleep(for: .milliseconds(i == 1 ? 350 : 420))
                withAnimation(DS.Motion.bubbleSpring) { visibleLines = i }
            }
            try? await Task.sleep(for: .milliseconds(250))
            nameFocused = true
        }
    }

    private func submit() {
        guard !trimmed.isEmpty else { return }
        nameFocused = false
        if let onDone { onDone(trimmed) } else { router.pop() }
    }
}

#Preview {
    CoachIntroView().environment(AppRouter())
}
