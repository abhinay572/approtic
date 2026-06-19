import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ember — Privacy Policy",
  description: "Ember collects no data. Nothing leaves your device. No account, no tracking.",
  alternates: { canonical: "/emberbible/privacy" },
};

const css = `
.ebl{--coral:#D85A30;--deep:#993C1D;--cream:#FBEFE6;--ink:#2b1a12;--muted:#7a6a60;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--ink);background:var(--cream);line-height:1.65}
.ebl-bar{background:linear-gradient(180deg,#fff6ec,var(--cream));padding:40px 24px 26px;text-align:center;border-bottom:1px solid rgba(153,60,29,.1)}
.ebl-bar a{color:var(--deep);text-decoration:none;font-weight:700}
.ebl-bar h1{font-size:30px;font-weight:800;letter-spacing:-.02em;margin:10px 0 0;background:linear-gradient(90deg,var(--deep),var(--coral));-webkit-background-clip:text;background-clip:text;color:transparent}
.ebl-pill{display:inline-block;background:rgba(29,158,117,.14);color:#0f7a59;font-weight:700;font-size:13px;padding:6px 12px;border-radius:999px;margin-top:12px}
.ebl-main{max-width:760px;margin:0 auto;padding:44px 24px 72px}
.ebl-main h2{font-size:20px;margin:28px 0 8px;color:var(--deep)}
.ebl-main p{margin:10px 0;color:#3a2a20}
.ebl-muted{color:var(--muted);font-size:14px}
.ebl-main a{color:var(--deep);font-weight:600}
`;

export default function EmberPrivacyPage() {
  const updated = "June 19, 2026";
  return (
    <div className="ebl">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="ebl-bar">
        <a href="/emberbible">← Ember</a>
        <h1>Privacy Policy</h1>
        <div className="ebl-pill">No data collected · Nothing leaves your device</div>
      </div>
      <main className="ebl-main">
        <p className="ebl-muted">{`Last updated: ${updated}`}</p>
        <p>{"Ember is designed to be private by default. We do not collect, transmit, sell, or share any personal data. This policy explains exactly what that means."}</p>
        <h2>What we collect</h2>
        <p>{"Nothing. Ember has no account system, no login, and no analytics or advertising SDKs. We never see your activity."}</p>
        <h2>What stays on your device</h2>
        <p>{"Your reading streak, saved verses, selected reading plan, reminder time, chosen bell sound, and app settings are stored only on your iPhone. A small copy of your streak and the day's verse is shared with the Ember home-screen widget through a private, on-device app group so the widget can display them. None of this is sent anywhere."}</p>
        <h2>Notifications</h2>
        <p>{"If you enable the daily reminder, the notification is scheduled locally on your device by iOS. We do not operate a server and cannot send you push notifications."}</p>
        <h2>Apple Intelligence</h2>
        <p>{"If your device supports Apple Intelligence and you turn on verse explanations, those explanations are generated on-device using Apple's Foundation Models. Your verses are not sent to us or to any third party. On devices without Apple Intelligence, Ember uses a simple built-in explanation instead."}</p>
        <h2>Children&apos;s privacy</h2>
        <p>{"Ember is rated 4+ and is safe for all ages. Because we collect no data, we collect no data from children."}</p>
        <h2>Third parties</h2>
        <p>{"Ember contains no third-party trackers, advertising networks, or analytics services. Scripture text is the World English Bible, which is in the public domain."}</p>
        <h2>Changes</h2>
        <p>{"If this policy ever changes, the updated version will be posted on this page with a new date above."}</p>
        <h2>Contact</h2>
        <p>{"Questions? Email "}<a href="mailto:hello@approtic.in">hello@approtic.in</a>{". If you contact us, we use your message only to respond."}</p>
        <p className="ebl-muted" style={{ marginTop: 28 }}>
          <a href="/emberbible">Home</a>{" · "}<a href="/emberbible/terms">Terms of Use</a>
        </p>
      </main>
    </div>
  );
}
