import SwiftUI

/// Screen 16 — Exercise player scaffold: illustration, countdown ring, cue.
struct ExercisePlayerView: View {
    let exerciseIndex: Int
    private let service: DataService = MockDataService.shared
    @State private var remaining: Int = 0
    @State private var running = false

    private var exercise: Exercise {
        let list = service.todayRoutine.exercises
        return list[min(exerciseIndex, list.count - 1)]
    }

    var body: some View {
        ZStack {
            DS.Colors.cream.ignoresSafeArea()

            VStack(spacing: 22) {
                MicroLabel(text: exercise.reps)
                    .padding(.top, 10)

                Text(exercise.name)
                    .font(DS.Typo.headline)
                    .foregroundStyle(DS.Colors.ink)

                Image(exercise.illustration)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 220, height: 220)
                    .padding(24)
                    .background(Color.white)
                    .clipShape(RoundedRectangle(cornerRadius: DS.Radius.card, style: .continuous))
                    .shadow(color: DS.Colors.cardShadow, radius: DS.Shadow.cardBlur / 2, x: 0, y: DS.Shadow.cardY)

                Text(exercise.coachCue)
                    .font(DS.Typo.body)
                    .foregroundStyle(DS.Colors.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 40)

                Spacer()

                ZStack {
                    Circle()
                        .stroke(DS.Colors.hairline.opacity(0.6), lineWidth: 8)
                    Circle()
                        .trim(from: 0, to: progress)
                        .stroke(DS.Colors.azure, style: StrokeStyle(lineWidth: 8, lineCap: .round))
                        .rotationEffect(.degrees(-90))
                        .animation(.linear(duration: 1), value: remaining)
                    Text("\(remaining)")
                        .font(DS.Typo.score(34))
                        .foregroundStyle(DS.Colors.ink)
                        .contentTransition(.numericText(countsDown: true))
                        .scaleEffect(running ? 1.0 : DS.Motion.countdownScale)
                        .animation(.spring(response: 0.3, dampingFraction: 0.6), value: remaining)
                }
                .frame(width: 110, height: 110)
                .sensoryFeedback(.impact(weight: .light), trigger: remaining)

                Button(running ? "Pause" : "Start") {
                    running.toggle()
                }
                .buttonStyle(PrimaryCTAStyle())
                .padding(.horizontal, 20)
                .padding(.bottom, 24)
            }
        }
        .onAppear { remaining = exercise.durationSeconds }
        .task(id: running) {
            guard running else { return }
            while remaining > 0, !Task.isCancelled {
                try? await Task.sleep(for: .seconds(1))
                if running { remaining -= 1 }
            }
        }
    }

    private var progress: CGFloat {
        guard exercise.durationSeconds > 0 else { return 0 }
        return CGFloat(remaining) / CGFloat(exercise.durationSeconds)
    }
}

#Preview {
    ExercisePlayerView(exerciseIndex: 0).environment(AppRouter())
}
