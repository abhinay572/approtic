import SwiftUI

// MARK: - Feature Tour

public struct FeatureTourView: View {
    private let onFinished: () -> Void
    @State private var index = 0

    public init(onFinished: @escaping () -> Void) {
        self.onFinished = onFinished
    }

    public var body: some View {
        VStack(spacing: 0) {
            HStack {
                Button {
                    withAnimation(.spring(response: 0.45, dampingFraction: 0.85)) { index -= 1 }
                } label: {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(DS.Colors.ink)
                }
                .opacity(index == 0 ? 0 : 1)
                .disabled(index == 0)
                Spacer()
            }
            .padding(.horizontal, 20)
            .padding(.top, 8)

            ProgressLine(progress: CGFloat(index + 1) / 4)
                .padding(.horizontal, 20)
                .padding(.top, 12)

            ZStack {
                pageContent
                    .id(index)
                    .transition(.asymmetric(
                        insertion: .move(edge: .trailing).combined(with: .opacity),
                        removal: .move(edge: .leading).combined(with: .opacity)))
            }
            .animation(.spring(response: 0.45, dampingFraction: 0.85), value: index)
            .frame(maxWidth: .infinity, maxHeight: .infinity)

            Button(index == 3 ? "Build my plan" : "Continue") {
                if index == 3 {
                    onFinished()
                } else {
                    withAnimation(.spring(response: 0.45, dampingFraction: 0.85)) { index += 1 }
                }
            }
            .buttonStyle(PrimaryCTAStyle())
            .padding(.horizontal, 20)
            .padding(.bottom, 12)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background { DS.Colors.cream.ignoresSafeArea() }
    }

    @ViewBuilder
    private var pageContent: some View {
        switch index {
        case 0:
            TourPageLayout(leading: "Now let's build ", accent: "your plan", trailing: "",
                           caption: "Your dashboard, where everything lives.") {
                MiniDashboardMock()
            } footer: {
                (Text("We're ").foregroundStyle(DS.Colors.secondary)
                    + Text("25%").foregroundStyle(DS.Colors.azure)
                    + Text(" into building your dashboard").foregroundStyle(DS.Colors.secondary))
                    .font(DS.Typo.sans(13, .regular))
                    .multilineTextAlignment(.center)
            }
        case 1:
            TourPageLayout(leading: "Track ", accent: "every change", trailing: "",
                           caption: "Calendar and trends, toggled in one place.") {
                MiniCalendarMock()
            } footer: { EmptyView() }
        case 2:
            TourPageLayout(leading: "", accent: "Scan", trailing: " daily",
                           caption: "A quick scan catches what the mirror can't.") {
                MiniScanMock()
            } footer: { EmptyView() }
        default:
            TourPageLayout(leading: "Built for ", accent: "your face", trailing: "",
                           caption: "Custom routines tailored to your exact scan.") {
                MiniRoutineMock()
            } footer: { EmptyView() }
        }
    }
}

// MARK: - Shared Layout

private struct TourPageLayout<Mock: View, Footer: View>: View {
    let leading: String
    let accent: String
    let trailing: String
    let caption: String
    @ViewBuilder var mock: Mock
    @ViewBuilder var footer: Footer

    var body: some View {
        VStack(spacing: 14) {
            AccentHeadline(leading: leading, accent: accent, trailing: trailing)
                .padding(.top, 20)
            Text(caption)
                .font(DS.Typo.sans(14, .regular))
                .foregroundStyle(DS.Colors.secondary)
                .multilineTextAlignment(.center)
            Spacer(minLength: 12)
            PhoneFrame(width: 250, height: 430) { mock }
            footer
            Spacer(minLength: 12)
        }
        .padding(.horizontal, 20)
        .frame(maxWidth: .infinity)
    }
}

private struct AccentHeadline: View {
    let leading: String
    let accent: String
    let trailing: String
    var size: CGFloat = 28

    var body: some View {
        (Text(leading).foregroundStyle(DS.Colors.ink)
            + Text(accent).foregroundStyle(DS.Colors.azure)
            + Text(trailing).foregroundStyle(DS.Colors.ink))
            .font(DS.Typo.sans(size, .semibold))
            .multilineTextAlignment(.center)
    }
}

private struct ProgressLine: View {
    let progress: CGFloat

    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                Capsule().fill(DS.Colors.hairline)
                Capsule().fill(DS.Colors.azure)
                    .frame(width: geo.size.width * progress)
            }
        }
        .frame(height: 3)
        .animation(.spring(response: 0.4, dampingFraction: 0.9), value: progress)
    }
}

private struct PhoneFrame<Content: View>: View {
    var width: CGFloat = 250
    var height: CGFloat = 430
    @ViewBuilder var content: Content

    var body: some View {
        content
            .frame(width: width, height: height)
            .background(DS.Colors.cardSurface)
            .clipShape(RoundedRectangle(cornerRadius: 44))
            .overlay(
                RoundedRectangle(cornerRadius: 44)
                    .stroke(DS.Colors.hairline, lineWidth: 1)
            )
            .shadow(color: DS.Colors.cardShadow, radius: 18, x: 0, y: 8)
    }
}

// MARK: - Mockup Content

private struct MiniDashboardMock: View {
    var body: some View {
        VStack(spacing: 10) {
            Text("Good afternoon.")
                .font(DS.Typo.sans(11, .regular))
                .foregroundStyle(DS.Colors.secondary)
            Image("porcelain-mask-static")
                .resizable()
                .scaledToFit()
                .frame(height: 80)
            Text("82")
                .font(DS.Typo.score(28, .bold))
                .foregroundStyle(DS.Colors.ink)
            HStack(spacing: 6) {
                Text("Start →")
                    .font(DS.Typo.sans(11, .medium))
                    .foregroundStyle(.white)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 9)
                    .background(RoundedRectangle(cornerRadius: 14).fill(DS.Colors.ink))
                Text("+7")
                    .font(DS.Typo.score(12, .bold))
                    .foregroundStyle(.white)
                    .padding(9)
                    .background(RoundedRectangle(cornerRadius: 14).fill(DS.Colors.azure))
                VStack(spacing: 2) {
                    Text("3 / 5")
                        .font(DS.Typo.score(12, .bold))
                        .foregroundStyle(DS.Colors.ink)
                    Text("Completed Today")
                        .font(DS.Typo.micro)
                        .tracking(DS.Typo.microTracking)
                        .foregroundStyle(DS.Colors.micro)
                        .lineLimit(1)
                        .minimumScaleFactor(0.6)
                }
                .padding(6)
                .background(
                    RoundedRectangle(cornerRadius: 14)
                        .fill(DS.Colors.cardSurface)
                        .overlay(RoundedRectangle(cornerRadius: 14).stroke(DS.Colors.hairline))
                )
                Text("What am I doing wrong?")
                    .font(DS.Typo.sans(10, .medium))
                    .foregroundStyle(.white)
                    .lineLimit(2)
                    .multilineTextAlignment(.center)
                    .padding(6)
                    .background(RoundedRectangle(cornerRadius: 14).fill(DS.Colors.azure))
            }
            .padding(.horizontal, 4)
        }
        .padding(12)
    }
}

private struct MiniCalendarMock: View {
    private let columns = Array(repeating: GridItem(.flexible(), spacing: 4), count: 7)

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 6) {
                chip("22d", filled: true)
                chip("Apr 17", filled: false)
                chip("3", filled: false)
            }
            MicroLabel(text: "JULY")
            LazyVGrid(columns: columns, spacing: 5) {
                ForEach(1...28, id: \.self) { day in
                    Text("\(day)")
                        .font(DS.Typo.score(10, .medium))
                        .foregroundStyle((14...17).contains(day) ? Color.white : DS.Colors.ink)
                        .frame(width: 22, height: 22)
                        .background(
                            Circle().fill((14...17).contains(day) ? DS.Colors.azure : Color.clear)
                        )
                }
            }
        }
        .padding(16)
    }

    private func chip(_ label: String, filled: Bool) -> some View {
        Text(label)
            .font(DS.Typo.score(10, .semibold))
            .foregroundStyle(filled ? Color.white : DS.Colors.ink)
            .padding(.horizontal, 9)
            .padding(.vertical, 4)
            .background(
                Capsule()
                    .fill(filled ? DS.Colors.azure : DS.Colors.cardSurface)
                    .overlay(Capsule().stroke(DS.Colors.hairline))
            )
    }
}

private struct MiniScanMock: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Image("scan-demo")
                .resizable()
                .scaledToFill()
                .frame(height: 180)
                .clipShape(RoundedRectangle(cornerRadius: 20))
            HStack {
                Spacer()
                Text("Start scan")
                    .font(DS.Typo.sans(12, .semibold))
                    .foregroundStyle(.white)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 7)
                    .background(Capsule().fill(DS.Colors.azure))
                Spacer()
            }
            MicroLabel(text: "PREVIOUS SCANS")
            scanRow("Mon 14 Apr · morning", delta: "+2")
            scanRow("Sun 13 Apr", delta: "-1")
        }
        .padding(14)
    }

    private func scanRow(_ title: String, delta: String) -> some View {
        HStack {
            Text(title)
                .font(DS.Typo.sans(11, .medium))
                .foregroundStyle(DS.Colors.ink)
            Spacer()
            Text(delta)
                .font(DS.Typo.score(11, .bold))
                .foregroundStyle(DS.Colors.azure)
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 8)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(DS.Colors.cardSurface)
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(DS.Colors.hairline))
        )
    }
}

private struct MiniRoutineMock: View {
    private let items: [(name: String, detail: String, done: Bool)] = [
        ("💧 Mewing hold", "1m 30s", true),
        ("🚰 Hydrate", "2L today", true),
        ("💪 Jaw circuit", "5 exercises", false),
        ("🙆 Chin tucks", "3 sets", false),
        ("👅 Tongue posture", "10 min", false)
    ]

    var body: some View {
        VStack(spacing: 8) {
            VStack(alignment: .leading, spacing: 3) {
                Text("7 exercises · 19 min")
                    .font(DS.Typo.sans(12, .semibold))
                    .foregroundStyle(.white)
                Text("Resume session →")
                    .font(DS.Typo.sans(10, .regular))
                    .foregroundStyle(.white.opacity(0.85))
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(12)
            .background(RoundedRectangle(cornerRadius: 16).fill(DS.Colors.azure))
            ForEach(items, id: \.name) { item in
                routineRow(item)
            }
        }
        .padding(14)
    }

    private func routineRow(_ item: (name: String, detail: String, done: Bool)) -> some View {
        HStack(spacing: 6) {
            Text(item.name)
                .font(DS.Typo.sans(11, .medium))
                .foregroundStyle(DS.Colors.ink)
            Spacer()
            Text(item.detail)
                .font(DS.Typo.micro)
                .tracking(DS.Typo.microTracking)
                .foregroundStyle(DS.Colors.micro)
            if item.done {
                Image(systemName: "checkmark.circle.fill")
                    .font(.system(size: 14))
                    .foregroundStyle(DS.Colors.azure)
            }
        }
        .padding(.horizontal, 10)
        .frame(height: 34)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(DS.Colors.cardSurface)
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(DS.Colors.hairline))
        )
    }
}

// MARK: - Demo Intro

public struct DemoIntroView: View {
    private let onTryDemo: () -> Void

    public init(onTryDemo: @escaping () -> Void) {
        self.onTryDemo = onTryDemo
    }

    public var body: some View {
        VStack(spacing: 14) {
            AccentHeadline(leading: "Take a look ", accent: "inside", trailing: "")
                .padding(.top, 20)
            Spacer(minLength: 12)
            PhoneFrame(width: 250, height: 400) { scanMock }
            MicroLabel(text: "YOUR COMPLETE ANALYSIS")
                .padding(.top, 6)
            Text("What we look at")
                .font(DS.Typo.sans(20, .semibold))
                .foregroundStyle(DS.Colors.ink)
            Text("From facial structure to skin texture, FaceKit maps the areas that matter most — so your results feel personal and actionable.")
                .font(DS.Typo.sans(13, .regular))
                .foregroundStyle(DS.Colors.secondary)
                .multilineTextAlignment(.center)
            Spacer(minLength: 12)
            Button("Try live demo", action: onTryDemo)
                .buttonStyle(PrimaryCTAStyle())
            Text("Allow camera use to try the live demo · Nothing is stored")
                .font(DS.Typo.micro)
                .tracking(DS.Typo.microTracking)
                .foregroundStyle(DS.Colors.micro)
                .multilineTextAlignment(.center)
                .padding(.bottom, 10)
        }
        .padding(.horizontal, 20)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background { DS.Colors.cream.ignoresSafeArea() }
    }

    private var scanMock: some View {
        VStack(spacing: 10) {
            MicroLabel(text: "LUKE SWAN'S SCAN")
            Text("Structure analysis")
                .font(DS.Typo.sans(13, .semibold))
                .foregroundStyle(DS.Colors.ink)
            Text("89")
                .font(DS.Typo.score(34, .bold))
                .foregroundStyle(DS.Colors.ink)
            Image("porcelain-mask-static")
                .resizable()
                .scaledToFit()
                .frame(height: 120)
            HStack(spacing: 5) {
                Circle()
                    .fill(DS.Colors.azure)
                    .frame(width: 5, height: 5)
                Text("Jawline 121° · Top 18%")
                    .font(DS.Typo.sans(10, .medium))
                    .foregroundStyle(DS.Colors.ink)
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 6)
            .background(
                Capsule()
                    .fill(DS.Colors.cardSurface)
                    .overlay(Capsule().stroke(DS.Colors.hairline))
            )
        }
        .padding(14)
    }
}

// MARK: - Dashboard Built

public struct DashboardBuiltView: View {
    private let onScan: () -> Void

    public init(onScan: @escaping () -> Void) {
        self.onScan = onScan
    }

    public var body: some View {
        VStack(spacing: 14) {
            ProgressLine(progress: 1)
                .padding(.top, 8)
            AccentHeadline(leading: "Your dashboard is built. One thing left, ",
                           accent: "your scan.", trailing: "")
                .padding(.top, 12)
            Text("We've set everything up around your goals. Your first scan brings your score and progress to life.")
                .font(DS.Typo.sans(14, .regular))
                .foregroundStyle(DS.Colors.secondary)
                .multilineTextAlignment(.center)
            Spacer(minLength: 12)
            PhoneFrame(width: 250, height: 430) { MiniDashboardMock() }
            Spacer(minLength: 12)
            Button("Take your first scan", action: onScan)
                .buttonStyle(PrimaryCTAStyle())
                .padding(.bottom, 12)
        }
        .padding(.horizontal, 20)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background { DS.Colors.cream.ignoresSafeArea() }
    }
}

// MARK: - Previews

#Preview("Feature Tour") {
    FeatureTourView(onFinished: {})
}

#Preview("Demo Intro") {
    DemoIntroView(onTryDemo: {})
}

#Preview("Dashboard Built") {
    DashboardBuiltView(onScan: {})
}
