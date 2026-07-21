import XCTest

/// Drives the ENTIRE onboarding exactly like a user, per the competitor
/// recording: name → gender → age → leverage → glow-up → demo → tour →
/// goals → topics → feeling → why → dashboard built → compiling →
/// social proof → ready → commit slide → paywall.
/// Run with simctl recordVideo for a full journey capture.
final class OnboardingJourneyTests: XCTestCase {

    func testFullOnboardingJourney() throws {
        let app = XCUIApplication()
        app.launchArguments = ["-screen", "onboarding"]
        app.launch()

        // 1. Coach intro — type name.
        let nameField = app.textFields.firstMatch
        XCTAssertTrue(nameField.waitForExistence(timeout: 10), "name field")
        nameField.tap()
        nameField.typeText("Abhinay")
        // Azure send button (arrow) — tap it; fall back to Return key.
        sleep(1)
        let send = app.buttons["arrow.right"]
        if send.exists { send.tap() } else { app.keyboards.buttons["return"].tap() }

        // 2. Chat: gender, age.
        tapChip("Man")
        tapChip("18")

        // 3. Real talk → Show me → leverage interstitial.
        tapChip("Show me", timeout: 16)
        tapChip("Continue")

        // 4. Chat resumes → azure Continue → glow-up proof.
        tapChip("Continue", timeout: 16)
        tapChip("Continue")     // glow-up "Continue"

        // 5. Chat (5 lines) → See it for yourself → demo chain.
        tapChip("See it for yourself", timeout: 20)
        tapChip("Try live demo")
        tapChip("Continue")     // structure
        tapChip("Continue")     // skin

        // 6. Feature tour — 3 × Continue + Build my plan.
        tapChip("Continue")
        tapChip("Continue")
        tapChip("Continue")
        tapChip("Build my plan")

        // 7. Goals conversation.
        tapChip("see my progress", timeout: 20)
        tapChip("Jawline", timeout: 16)
        tapChip("Cheekbones")
        tapChip("Done")
        tapChip("Unstoppable", timeout: 16)
        tapChip("Confidence", timeout: 16)

        // 8. Locked in → Take me there → dashboard built → first scan.
        tapChip("Take me there", timeout: 25)
        tapChip("Take your first scan")

        // 9. Compiling slot machine auto-advances (~8s) → social proof.
        tapChip("Continue", timeout: 25)

        // 10. Dashboard ready → I want this.
        tapChip("I want this")

        // 11. Slide to commit — drag knob to the right.
        let slideLabel = app.staticTexts["Slide to commit"]
        XCTAssertTrue(slideLabel.waitForExistence(timeout: 10), "commit slider")
        let start = app.coordinate(withNormalizedOffset: CGVector(dx: 0.12, dy: 0.48))
        let end = app.coordinate(withNormalizedOffset: CGVector(dx: 0.95, dy: 0.48))
        start.press(forDuration: 0.3, thenDragTo: end, withVelocity: .slow, thenHoldForDuration: 0.2)

        // 12. Paywall appears — verify then close via top-right X.
        sleep(3)
        let closeButton = app.buttons["xmark"]
        if closeButton.waitForExistence(timeout: 10) {
            closeButton.tap()
        } else {
            app.coordinate(withNormalizedOffset: CGVector(dx: 0.93, dy: 0.045)).tap()
        }

        sleep(2) // let the chat settle for the recording
    }

    /// Taps the first button whose label contains `text` (chips include emoji).
    /// Retries across presentation/entrance animations that can invalidate
    /// the element between the existence check and the tap.
    private func tapChip(_ text: String, timeout: TimeInterval = 12,
                         file: StaticString = #filePath, line: UInt = #line) {
        let application = XCUIApplication()
        let predicate = NSPredicate(format: "label CONTAINS %@", text)
        let deadline = Date().addingTimeInterval(timeout + 8)

        while Date() < deadline {
            let button = application.buttons.matching(predicate).firstMatch
            if button.waitForExistence(timeout: 2) {
                usleep(700_000) // let entrance/present animations settle
                let fresh = application.buttons.matching(predicate).firstMatch
                if fresh.exists, fresh.isEnabled {
                    if fresh.isHittable {
                        fresh.tap()
                        return
                    }
                    // Not hittable yet (mid-animation) — coordinate-tap its frame.
                    let frame = fresh.frame
                    if !frame.isEmpty {
                        let appFrame = application.frame
                        let dx = frame.midX / max(appFrame.width, 1)
                        let dy = frame.midY / max(appFrame.height, 1)
                        application.coordinate(
                            withNormalizedOffset: CGVector(dx: dx, dy: dy)).tap()
                        return
                    }
                }
            }
        }
        XCTFail("button containing '\(text)' not tappable within \(timeout)s",
                file: file, line: line)
    }
}
