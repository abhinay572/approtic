import SwiftUI

public enum FaceFormTheme {
    public static let bone = Color(hex: "#F1EEE8")
    public static let surface = Color.white
    public static let ink = Color(hex: "#12151B")
    public static let body = Color(hex: "#6E7480")
    public static let muted = Color(hex: "#A4A9B2")
    public static let line = Color(hex: "#E4E0D8")
    public static let azure = Color(hex: "#2F80FF")
    public static let chatGlow = Color(hex: "#DCEBFF")
    public static let success = Color(hex: "#19B56B")
    public static let danger = Color(hex: "#E85D5D")

    public static let cardRadius: CGFloat = 24
    public static let sheetRadius: CGFloat = 32
    public static let buttonHeight: CGFloat = 56
    public static let tabBarHeight: CGFloat = 84

    public static let screenPadding: CGFloat = 20
    public static let cardPadding: CGFloat = 20

    public static func headline(_ size: CGFloat = 34) -> Font { .system(size: size, weight: .bold, design: .default) }
    public static let title = Font.system(size: 30, weight: .bold)
    public static let bodyFont = Font.system(size: 15, weight: .regular)
    public static let buttonFont = Font.system(size: 16, weight: .semibold)
    public static let micro = Font.system(size: 11, weight: .semibold)
}

public extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let r, g, b: UInt64
        switch hex.count {
        case 3: (r, g, b) = ((int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        default: (r, g, b) = (int >> 16, int >> 8 & 0xFF, int & 0xFF)
        }
        self.init(.sRGB, red: Double(r)/255, green: Double(g)/255, blue: Double(b)/255, opacity: 1)
    }
}
