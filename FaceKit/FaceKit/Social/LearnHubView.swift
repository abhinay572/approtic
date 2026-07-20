import SwiftUI

/// Screen 19 — Learn hub: category chips + article cards.
struct LearnHubView: View {
    private let service: DataService = MockDataService.shared
    @State private var category = "All"

    private var categories: [String] {
        ["All"] + Array(Set(service.articles.map(\.category))).sorted()
    }

    private var filtered: [Article] {
        category == "All" ? service.articles : service.articles.filter { $0.category == category }
    }

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            ScrollView {
                VStack(spacing: 14) {
                    ScrollView(.horizontal) {
                        HStack(spacing: 8) {
                            ForEach(categories, id: \.self) { c in
                                Button {
                                    withAnimation(DS.Motion.overlayFade) { category = c }
                                } label: {
                                    Text(c)
                                        .font(DS.Typo.chip)
                                        .foregroundStyle(category == c ? .white : DS.Colors.ink)
                                        .padding(.horizontal, 14)
                                        .padding(.vertical, 9)
                                        .background(category == c ? DS.Colors.ink : .white)
                                        .clipShape(Capsule())
                                        .overlay(
                                            Capsule().strokeBorder(
                                                category == c ? .clear : DS.Colors.hairline, lineWidth: 1)
                                        )
                                }
                                .buttonStyle(.plain)
                            }
                        }
                        .padding(.horizontal, 20)
                    }
                    .scrollIndicators(.hidden)
                    .padding(.top, 14)

                    ForEach(filtered) { article in
                        HStack(spacing: 14) {
                            Image(article.icon)
                                .resizable().renderingMode(.template)
                                .frame(width: 24, height: 24)
                                .foregroundStyle(DS.Colors.azure)
                                .padding(12)
                                .background(DS.Colors.chatGlow.opacity(0.6))
                                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                            VStack(alignment: .leading, spacing: 3) {
                                MicroLabel(text: "\(article.category) · \(article.minutes) min")
                                Text(article.title)
                                    .font(DS.Typo.bodyMedium)
                                    .foregroundStyle(DS.Colors.ink)
                            }
                            Spacer()
                            Image("icon-chevron-right")
                                .resizable().renderingMode(.template)
                                .frame(width: 16, height: 16)
                                .foregroundStyle(DS.Colors.micro)
                        }
                        .padding(14)
                        .cardStyle()
                        .padding(.horizontal, 20)
                    }

                    Spacer(minLength: 30)
                }
            }
            .scrollIndicators(.hidden)
        }
        .navigationTitle("Learn")
        .navigationBarTitleDisplayMode(.inline)
    }
}

#Preview {
    NavigationStack { LearnHubView() }.environment(AppRouter())
}
