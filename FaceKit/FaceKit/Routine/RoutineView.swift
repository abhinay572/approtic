import SwiftUI

/// Screen 15 — Routine: today's exercise list + slide-to-commit.
/// Motion spec: drag reveals azure gradient fill, snap at 90%, label
/// cross-fades to "Committed".
struct RoutineView: View {
    @Environment(AppRouter.self) private var router
    private let service: DataService = MockDataService.shared
    @State private var committed = false

    private var routine: RoutineDay { service.todayRoutine }

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            ScrollView {
                VStack(spacing: 14) {
                    VStack(alignment: .leading, spacing: 2) {
                        MicroLabel(text: "Today · \(routine.minutes) min")
                        Text(routine.title)
                            .font(DS.Typo.headline)
                            .foregroundStyle(DS.Colors.ink)
                        Text(routine.subtitle)
                            .font(DS.Typo.caption)
                            .foregroundStyle(DS.Colors.secondary)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, 20)
                    .padding(.top, 14)

                    ForEach(Array(routine.exercises.enumerated()), id: \.element.id) { index, exercise in
                        Button {
                            router.push(.exercisePlayer(exerciseIndex: index))
                        } label: {
                            HStack(spacing: 14) {
                                Image(exercise.illustration)
                                    .resizable()
                                    .aspectRatio(contentMode: .fit)
                                    .frame(width: 52, height: 52)
                                VStack(alignment: .leading, spacing: 3) {
                                    Text(exercise.name)
                                        .font(DS.Typo.bodyMedium)
                                        .foregroundStyle(DS.Colors.ink)
                                    MicroLabel(text: exercise.reps)
                                }
                                Spacer()
                                Image("icon-play")
                                    .resizable().renderingMode(.template)
                                    .frame(width: 18, height: 18)
                                    .foregroundStyle(DS.Colors.azure)
                            }
                            .padding(14)
                            .cardStyle()
                        }
                        .buttonStyle(.plain)
                        .padding(.horizontal, 20)
                    }

                    SlideToCommit(committed: $committed)
                        .padding(.horizontal, 20)
                        .padding(.top, 10)
                        .padding(.bottom, 34)
                }
            }
            .scrollIndicators(.hidden)
        }
        .navigationTitle("Routine")
        .navigationBarTitleDisplayMode(.inline)
    }
}

/// Slide-to-commit: drag reveals azure gradient, snaps at 90%.
struct SlideToCommit: View {
    @Binding var committed: Bool
    @State private var dragX: CGFloat = 0

    private let height: CGFloat = DS.Size.ctaHeight
    private let knob: CGFloat = 48

    var body: some View {
        GeometryReader { geo in
            let travel = geo.size.width - knob - 8
            let fraction = committed ? 1 : max(0, min(dragX / travel, 1))

            ZStack(alignment: .leading) {
                // track
                Capsule()
                    .fill(Color.white)
                    .overlay(Capsule().strokeBorder(DS.Colors.hairline, lineWidth: 1))

                // azure gradient reveal
                Capsule()
                    .fill(
                        LinearGradient(colors: [DS.Colors.azure.opacity(0.75), DS.Colors.azure],
                                       startPoint: .leading, endPoint: .trailing)
                    )
                    .frame(width: knob + 8 + fraction * travel)

                // label cross-fade
                ZStack {
                    Text("Slide to commit")
                        .font(DS.Typo.cta)
                        .foregroundStyle(DS.Colors.ink)
                        .opacity(committed ? 0 : 1 - Double(fraction) * 1.4)
                    Text("Committed")
                        .font(DS.Typo.cta)
                        .foregroundStyle(.white)
                        .opacity(committed ? 1 : Double(fraction) * 1.2 - 0.3)
                }
                .frame(maxWidth: .infinity)

                // knob
                Circle()
                    .fill(committed ? .white : DS.Colors.ink)
                    .frame(width: knob, height: knob)
                    .overlay(
                        Image(committed ? "icon-check" : "icon-arrow-right")
                            .resizable().renderingMode(.template)
                            .frame(width: 18, height: 18)
                            .foregroundStyle(committed ? DS.Colors.azure : .white)
                    )
                    .offset(x: 4 + fraction * travel)
                    .gesture(
                        DragGesture()
                            .onChanged { drag in
                                guard !committed else { return }
                                dragX = drag.translation.width
                            }
                            .onEnded { _ in
                                // snap at 90%
                                if dragX / travel >= 0.9 {
                                    withAnimation(DS.Motion.cardSpring) { committed = true }
                                } else {
                                    withAnimation(DS.Motion.cardSpring) { dragX = 0 }
                                }
                            }
                    )
                    .sensoryFeedback(.success, trigger: committed)
            }
        }
        .frame(height: height)
        .animation(DS.Motion.cardSpring, value: committed)
    }
}

#Preview {
    NavigationStack { RoutineView() }.environment(AppRouter())
}
