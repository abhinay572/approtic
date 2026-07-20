import SwiftUI

/// Screen 20 — Settings / profile (Profile tab). Scaffold version.
struct ProfileSettingsView: View {
    @Environment(AppRouter.self) private var router
    private let service: DataService = MockDataService.shared

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            ScrollView {
                VStack(spacing: 16) {
                    profileCard

                    settingsCard(title: "Membership", rows: [
                        ("icon-crown", "FaceKit Pro", service.profile.isPro ? "Active" : "Upgrade"),
                        ("icon-restore", "Restore purchases", ""),
                    ])

                    settingsCard(title: "App", rows: [
                        ("icon-bell", "Reminders", "8:00 AM"),
                        ("icon-shield-privacy", "Privacy", "On-device"),
                        ("icon-info", "About", "v1.0"),
                    ])
                }
                .padding(.horizontal, 20)
                .padding(.top, 12)
                .padding(.bottom, DS.Size.tabBarHeight + 40)
            }
            .scrollIndicators(.hidden)
        }
    }

    private var profileCard: some View {
        HStack(spacing: 14) {
            Image("avatar-01")
                .resizable()
                .frame(width: 56, height: 56)
                .clipShape(Circle())
            VStack(alignment: .leading, spacing: 3) {
                Text(service.profile.name)
                    .font(DS.Typo.title)
                    .foregroundStyle(DS.Colors.ink)
                Text("Member for \(memberDays) days · \(service.profile.streakDays)-day streak")
                    .font(DS.Typo.caption)
                    .foregroundStyle(DS.Colors.secondary)
            }
            Spacer()
        }
        .padding(18)
        .cardStyle()
    }

    private var memberDays: Int {
        Calendar.current.dateComponents([.day], from: service.profile.joinedAt, to: .now).day ?? 0
    }

    private func settingsCard(title: String, rows: [(String, String, String)]) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            MicroLabel(text: title)
                .padding(.bottom, 6)
            ForEach(Array(rows.enumerated()), id: \.offset) { index, row in
                Button {
                    if row.1 == "FaceKit Pro" { router.push(.paywall) }
                } label: {
                    HStack(spacing: 12) {
                        Image(row.0)
                            .resizable().renderingMode(.template)
                            .frame(width: 20, height: 20)
                            .foregroundStyle(DS.Colors.ink)
                        Text(row.1)
                            .font(DS.Typo.body)
                            .foregroundStyle(DS.Colors.ink)
                        Spacer()
                        Text(row.2)
                            .font(DS.Typo.caption)
                            .foregroundStyle(DS.Colors.secondary)
                        Image("icon-chevron-right")
                            .resizable().renderingMode(.template)
                            .frame(width: 16, height: 16)
                            .foregroundStyle(DS.Colors.micro)
                    }
                    .padding(.vertical, 12)
                }
                .buttonStyle(.plain)
                if index < rows.count - 1 {
                    Divider().overlay(DS.Colors.hairline)
                }
            }
        }
        .padding(18)
        .cardStyle()
    }
}

#Preview {
    ProfileSettingsView().environment(AppRouter())
}
