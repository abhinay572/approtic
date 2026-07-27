import SwiftUI

public struct FFPrimaryButton: View {
    let title: String
    let action: () -> Void

    public init(_ title: String, action: @escaping () -> Void) {
        self.title = title
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            Text(title)
                .font(FaceFormTheme.buttonFont)
                .foregroundStyle(.white)
                .frame(maxWidth: .infinity)
                .frame(height: FaceFormTheme.buttonHeight)
                .background(FaceFormTheme.ink)
                .clipShape(Capsule())
        }
        .buttonStyle(.plain)
    }
}

public struct FFCard<Content: View>: View {
    @ViewBuilder let content: Content

    public init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    public var body: some View {
        content
            .padding(FaceFormTheme.cardPadding)
            .background(.white)
            .clipShape(RoundedRectangle(cornerRadius: FaceFormTheme.cardRadius, style: .continuous))
            .shadow(color: Color.black.opacity(0.08), radius: 16, x: 0, y: 12)
    }
}

public struct FFChip: View {
    let title: String
    var selected = false

    public var body: some View {
        Text(title)
            .font(.system(size: 14, weight: .medium))
            .foregroundStyle(FaceFormTheme.ink)
            .padding(.horizontal, 16)
            .frame(minHeight: 44)
            .background(.white)
            .clipShape(Capsule())
            .overlay(Capsule().stroke(selected ? FaceFormTheme.azure : FaceFormTheme.line, lineWidth: selected ? 1.5 : 1))
            .shadow(color: selected ? FaceFormTheme.azure.opacity(0.20) : Color.black.opacity(0.05), radius: selected ? 14 : 9, y: 6)
    }
}

public struct FFProgressBar: View {
    let progress: Double

    public var body: some View {
        GeometryReader { proxy in
            ZStack(alignment: .leading) {
                Capsule().fill(Color(hex: "E7E9EE"))
                Capsule().fill(FaceFormTheme.azure).frame(width: proxy.size.width * max(0, min(progress, 1)))
            }
        }
        .frame(height: 4)
    }
}
