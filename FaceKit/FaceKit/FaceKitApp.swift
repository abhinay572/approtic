import SwiftUI

@main
struct FaceKitApp: App {
    @State private var router = AppRouter()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(router)
                .preferredColorScheme(.light)
                .tint(DS.Colors.azure)
        }
    }
}
