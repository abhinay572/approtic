import SwiftUI

/// Screen 02 — Coach intro: the coach asks your name; input in a white pill.
struct CoachIntroView: View {
    @Environment(AppRouter.self) private var router
    @State private var showBubble = false
    @State private var isTyping = false
    @State private var name = ""
    @FocusState private var nameFocused: Bool

    var body: some View {
        ZStack {
            DS.Gradients.chatBackground

            VStack(spacing: 0) {
                Spacer()

                CoachMascotView(size: 96)
                    .padding(.bottom, 24)

                if isTyping {
                    TypingDots()
                        .transition(.opacity)
                }

                if showBubble {
                    Text("Nice to meet you. What should I call you?")
                        .font(DS.Typo.chat)
                        .foregroundStyle(DS.Colors.ink)
                        .padding(.horizontal, 18)
                        .padding(.vertical, 13)
                        .background(Color.white)
                        .clipShape(BubbleShape(isUser: false))
                        .shadow(color: DS.Colors.cardShadow, radius: 10, x: 0, y: 4)
                        .transition(.offset(y: DS.Motion.bubbleSlide).combined(with: .opacity))
                }

                Spacer()

                TextField("Your name", text: $name)
                    .font(DS.Typo.body)
                    .foregroundStyle(DS.Colors.ink)
                    .multilineTextAlignment(.center)
                    .textInputAutocapitalization(.words)
                    .focused($nameFocused)
                    .padding(.vertical, 16)
                    .background(Color.white)
                    .clipShape(Capsule())
                    .overlay(Capsule().strokeBorder(DS.Colors.hairline, lineWidth: 1))
                    .padding(.horizontal, 40)
                    .padding(.bottom, 14)

                Button("Continue") {
                    router.pop()
                }
                .buttonStyle(PrimaryCTAStyle())
                .padding(.horizontal, 20)
                .padding(.bottom, 28)
                .disabled(name.trimmingCharacters(in: .whitespaces).isEmpty)
                .opacity(name.trimmingCharacters(in: .whitespaces).isEmpty ? 0.4 : 1)
            }
        }
        .toolbar(.hidden, for: .navigationBar)
        .task {
            withAnimation(DS.Motion.bubbleSpring) { isTyping = true }
            try? await Task.sleep(for: .seconds(DS.Motion.typingDots))
            withAnimation(DS.Motion.bubbleSpring) {
                isTyping = false
                showBubble = true
            }
            nameFocused = true
        }
    }
}

#Preview {
    CoachIntroView().environment(AppRouter())
}
