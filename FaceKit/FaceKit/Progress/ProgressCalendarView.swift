import SwiftUI

/// Screen 12 — Progress / calendar (Progress tab). Scaffold version.
struct ProgressCalendarView: View {
    private let service: DataService = MockDataService.shared

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    VStack(alignment: .leading, spacing: 2) {
                        MicroLabel(text: "Progress")
                        Text("12-day streak")
                            .font(DS.Typo.headline)
                            .foregroundStyle(DS.Colors.ink)
                    }
                    .padding(.top, 12)

                    calendarCard
                    trendCard
                }
                .padding(.horizontal, 20)
                .padding(.bottom, DS.Size.tabBarHeight + 40)
            }
            .scrollIndicators(.hidden)
        }
    }

    private var calendarCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            MicroLabel(text: "Last 4 weeks")
            LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 8), count: 7), spacing: 8) {
                ForEach(service.calendar) { day in
                    ZStack {
                        Circle()
                            .fill(day.didTrain ? DS.Colors.azure : DS.Colors.hairline.opacity(0.5))
                        if day.didScan {
                            Circle()
                                .strokeBorder(DS.Colors.ink, lineWidth: 1.5)
                        }
                        Text(day.date, format: .dateTime.day())
                            .font(DS.Typo.score(11, .medium))
                            .foregroundStyle(day.didTrain ? .white : DS.Colors.secondary)
                    }
                    .frame(height: 34)
                }
            }
            HStack(spacing: 14) {
                legend(color: DS.Colors.azure, label: "Trained")
                legend(color: DS.Colors.hairline, label: "Rest")
                legend(color: .clear, ring: true, label: "Scanned")
            }
        }
        .padding(20)
        .cardStyle()
    }

    private var trendCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            MicroLabel(text: "Overall score trend")
            HStack(alignment: .bottom, spacing: 10) {
                ForEach(Array(service.scanHistory.reversed().enumerated()), id: \.offset) { _, scanItem in
                    VStack(spacing: 6) {
                        RoundedRectangle(cornerRadius: 4)
                            .fill(DS.Colors.azure.opacity(0.85))
                            .frame(height: CGFloat(scanItem.displayedOverall - 40) * 2.4)
                        Text("\(scanItem.displayedOverall)")
                            .font(DS.Typo.score(11, .medium))
                            .foregroundStyle(DS.Colors.secondary)
                    }
                    .frame(maxWidth: .infinity)
                }
            }
            .frame(height: 110, alignment: .bottom)
        }
        .padding(20)
        .cardStyle()
    }

    private func legend(color: Color, ring: Bool = false, label: String) -> some View {
        HStack(spacing: 5) {
            Circle()
                .fill(color)
                .overlay(ring ? Circle().strokeBorder(DS.Colors.ink, lineWidth: 1.5) : nil)
                .frame(width: 10, height: 10)
            Text(label)
                .font(DS.Typo.caption)
                .foregroundStyle(DS.Colors.secondary)
        }
    }
}

#Preview {
    ProgressCalendarView().environment(AppRouter())
}
