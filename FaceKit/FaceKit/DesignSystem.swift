import SwiftUI
import UIKit

// MARK: - DesignSystem — single source of truth for every token in CLAUDE.md.
// NO raw hex/pt values in views: everything routes through DS.

enum DS {

    // MARK: Colors
    enum Colors {
        /// App background cream #F1EEE8
        static let cream = Color(red: 0xF1 / 255, green: 0xEE / 255, blue: 0xE8 / 255)
        /// Chat glow tint #DCEBFF (radial, lower half, over white)
        static let chatGlow = Color(red: 0xDC / 255, green: 0xEB / 255, blue: 0xFF / 255)
        /// The one accent. Azure #2F80FF — ≤10% of any screen.
        static let azure = Color(red: 0x2F / 255, green: 0x80 / 255, blue: 0xFF / 255)
        /// Primary text near-black #16181D
        static let ink = Color(red: 0x16 / 255, green: 0x18 / 255, blue: 0x1D / 255)
        /// Secondary text #6E7480
        static let secondary = Color(red: 0x6E / 255, green: 0x74 / 255, blue: 0x80 / 255)
        /// Micro-label gray #9AA0AB
        static let micro = Color(red: 0x9A / 255, green: 0xA0 / 255, blue: 0xAB / 255)
        /// Chip hairline border #E4E0D8
        static let hairline = Color(red: 0xE4 / 255, green: 0xE0 / 255, blue: 0xD8 / 255)
        /// Card shadow rgba(20,24,32,0.08)
        static let cardShadow = Color(red: 20 / 255, green: 24 / 255, blue: 32 / 255).opacity(0.08)
        static let cardSurface = Color.white

        // Metric colors
        static let redness = Color(red: 0xFF / 255, green: 0x6B / 255, blue: 0x7A / 255) // coral
        static let texture = Color(red: 0x2E / 255, green: 0xC5 / 255, blue: 0xA8 / 255) // teal
        static let tone = Color(red: 0xA8 / 255, green: 0x55 / 255, blue: 0xF7 / 255)    // purple
        static let oil = Color(red: 0xF5 / 255, green: 0xA6 / 255, blue: 0x23 / 255)     // amber
        static let success = Color(red: 0x34 / 255, green: 0xC7 / 255, blue: 0x59 / 255) // green

        // Status pills
        static let statusGood = azure
        static let statusGreat = success
        static let statusNurture = oil
    }

    // MARK: Radii & sizes
    enum Radius {
        static let card: CGFloat = 24
        static let cta: CGFloat = 28
        static let chip: CGFloat = 100 // full pill
    }

    enum Size {
        static let ctaHeight: CGFloat = 56
        static let tabBarHeight: CGFloat = 64
        static let scanButton: CGFloat = 58
        static let iconGrid: CGFloat = 24
    }

    // MARK: Shadows — cards: (0,12,32, rgba(20,24,32,0.08)), no borders
    enum Shadow {
        static let cardY: CGFloat = 12
        static let cardBlur: CGFloat = 32
    }

    // MARK: Typography — General Sans (bundled) for headlines/body,
    // SF Pro Rounded for all score numerals. Falls back to the system font
    // until the Fontshare .otf files land in Resources/Fonts (see ASSETS-TODO).
    enum Typo {
        static var generalSansAvailable: Bool {
            UIFont(name: "GeneralSans-Regular", size: 12) != nil
        }

        static func sans(_ size: CGFloat, _ weight: Font.Weight = .regular) -> Font {
            guard generalSansAvailable else { return .system(size: size, weight: weight) }
            let name: String = switch weight {
            case .bold, .heavy, .black: "GeneralSans-Bold"
            case .semibold: "GeneralSans-Semibold"
            case .medium: "GeneralSans-Medium"
            case .light, .ultraLight, .thin: "GeneralSans-Light"
            default: "GeneralSans-Regular"
            }
            return .custom(name, size: size)
        }

        /// SF Pro Rounded — every score numeral, no exceptions.
        static func score(_ size: CGFloat, _ weight: Font.Weight = .bold) -> Font {
            .system(size: size, weight: weight, design: .rounded)
        }

        // Scale
        static let headline = sans(28, .semibold)
        static let title = sans(22, .semibold)
        static let body = sans(16)
        static let bodyMedium = sans(16, .medium)
        static let chat = sans(16)
        static let cta = sans(17, .semibold)         // white 17pt semibold on black pill
        static let chip = sans(15, .medium)
        static let caption = sans(13)
        static let micro = sans(11, .semibold)       // uppercase +2 tracking, DS.Colors.micro
        static let microTracking: CGFloat = 2
    }

    // MARK: Motion spec (implement, don't approximate)
    enum Motion {
        /// 900ms typing dots before each coach message
        static let typingDots: TimeInterval = 0.9
        /// bubbles slide-up 12pt
        static let bubbleSlide: CGFloat = 12
        /// spring(0.4/0.75) for chat bubbles
        static let bubbleSpring = Animation.spring(response: 0.4, dampingFraction: 0.75)
        /// chips cascade 50ms apart
        static let chipCascade: TimeInterval = 0.05
        /// typewriter ~35ms/char
        static let typewriterPerChar: TimeInterval = 0.035
        /// score count-up 1.4s decelerating
        static let scoreCountUp: TimeInterval = 1.4
        /// ring trim spring(1.1/0.85)
        static let ringSpring = Animation.spring(response: 1.1, dampingFraction: 0.85)
        /// metric overlay switch cross-fade
        static let overlayFade = Animation.easeInOut(duration: 0.3)
        /// card entrances staggered 60ms, spring(0.45)
        static let cardStagger: TimeInterval = 0.06
        static let cardSpring = Animation.spring(response: 0.45, dampingFraction: 0.8)
        /// button press scale
        static let pressScale: CGFloat = 0.97
        /// countdown numeral scale
        static let countdownScale: CGFloat = 1.15
    }

    // MARK: Gradients (programmatic — no stretched PNGs)
    enum Gradients {
        /// Chat screens: white → radial #DCEBFF glow anchored in the lower half.
        static var chatBackground: some View {
            ZStack {
                Color.white
                RadialGradient(
                    colors: [Colors.chatGlow, Colors.chatGlow.opacity(0)],
                    center: UnitPoint(x: 0.5, y: 0.92),
                    startRadius: 0,
                    endRadius: 460
                )
            }
            .ignoresSafeArea()
        }

        static var paywallSky: LinearGradient {
            LinearGradient(
                colors: [Color.white, Colors.chatGlow, Colors.azure.opacity(0.25)],
                startPoint: .top, endPoint: .bottom
            )
        }
    }
}

// MARK: - Reusable style primitives

/// White card, 24 radius, (0,12,32, 8%) shadow, no border.
struct CardStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(DS.Colors.cardSurface)
            .clipShape(RoundedRectangle(cornerRadius: DS.Radius.card, style: .continuous))
            .shadow(color: DS.Colors.cardShadow, radius: DS.Shadow.cardBlur / 2, x: 0, y: DS.Shadow.cardY)
    }
}

/// Micro-label: 11pt uppercase, +2 tracking, #9AA0AB.
struct MicroLabel: View {
    let text: String
    var body: some View {
        Text(text.uppercased())
            .font(DS.Typo.micro)
            .tracking(DS.Typo.microTracking)
            .foregroundStyle(DS.Colors.micro)
    }
}

/// Primary CTA: black pill, 56pt tall, 28 radius, white 17pt semibold.
struct PrimaryCTAStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(DS.Typo.cta)
            .foregroundStyle(.white)
            .frame(maxWidth: .infinity)
            .frame(height: DS.Size.ctaHeight)
            .background(DS.Colors.ink)
            .clipShape(RoundedRectangle(cornerRadius: DS.Radius.cta, style: .continuous))
            .scaleEffect(configuration.isPressed ? DS.Motion.pressScale : 1)
            .animation(.spring(response: 0.25, dampingFraction: 0.7), value: configuration.isPressed)
            .sensoryFeedback(.impact(weight: .light), trigger: configuration.isPressed) { old, new in !old && new }
    }
}

/// Chip: white pill, hairline #E4E0D8 border.
struct ChipStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(DS.Typo.chip)
            .foregroundStyle(DS.Colors.ink)
            .padding(.horizontal, 16)
            .padding(.vertical, 10)
            .background(Color.white)
            .clipShape(Capsule())
            .overlay(Capsule().strokeBorder(DS.Colors.hairline, lineWidth: 1))
    }
}

/// Status pill: GOOD blue / GREAT green / NURTURE amber.
enum StatusLevel: String {
    case good = "GOOD", great = "GREAT", nurture = "NURTURE"

    var color: Color {
        switch self {
        case .good: DS.Colors.statusGood
        case .great: DS.Colors.statusGreat
        case .nurture: DS.Colors.statusNurture
        }
    }
}

struct StatusPill: View {
    let level: StatusLevel
    var body: some View {
        Text(level.rawValue)
            .font(DS.Typo.micro)
            .tracking(DS.Typo.microTracking)
            .foregroundStyle(.white)
            .padding(.horizontal, 10)
            .padding(.vertical, 5)
            .background(level.color)
            .clipShape(Capsule())
    }
}

extension View {
    func cardStyle() -> some View { modifier(CardStyle()) }
    func chipStyle() -> some View { modifier(ChipStyle()) }
}
