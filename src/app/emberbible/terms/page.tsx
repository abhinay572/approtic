import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ember — Terms of Use",
  description: "Terms of Use for Ember, a free, on-device Bible habit app by Approtic.",
  alternates: { canonical: "/emberbible/terms" },
};

const css = `
.ebl{--coral:#D85A30;--deep:#993C1D;--cream:#FBEFE6;--ink:#2b1a12;--muted:#7a6a60;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--ink);background:var(--cream);line-height:1.65}
.ebl-bar{background:linear-gradient(180deg,#fff6ec,var(--cream));padding:40px 24px 26px;text-align:center;border-bottom:1px solid rgba(153,60,29,.1)}
.ebl-bar a{color:var(--deep);text-decoration:none;font-weight:700}
.ebl-bar h1{font-size:30px;font-weight:800;letter-spacing:-.02em;margin:10px 0 0;background:linear-gradient(90deg,var(--deep),var(--coral));-webkit-background-clip:text;background-clip:text;color:transparent}
.ebl-main{max-width:760px;margin:0 auto;padding:44px 24px 72px}
.ebl-main h2{font-size:20px;margin:28px 0 8px;color:var(--deep)}
.ebl-main p{margin:10px 0;color:#3a2a20}
.ebl-muted{color:var(--muted);font-size:14px}
.ebl-main a{color:var(--deep);font-weight:600}
`;

export default function EmberTermsPage() {
  const updated = "June 19, 2026";
  return (
    <div className="ebl">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="ebl-bar">
        <a href="/emberbible">← Ember</a>
        <h1>Terms of Use</h1>
      </div>
      <main className="ebl-main">
        <p className="ebl-muted">{`Last updated: ${updated}`}</p>
        <p>{"These Terms of Use govern your use of the Ember mobile application published by Approtic. By downloading or using Ember, you agree to these Terms."}</p>
        <h2>The app</h2>
        <p>{"Ember is provided free of charge. It contains no in-app purchases, subscriptions, or advertisements. You may use it for personal, non-commercial devotional and study purposes."}</p>
        <h2>Scripture content</h2>
        <p>{"Scripture text in Ember is taken from the World English Bible (WEB), which is in the public domain. Verse explanations, where available, are generated on your device and are provided for reflection only — they are not authoritative theological teaching."}</p>
        <h2>Acceptable use</h2>
        <p>{"Please do not attempt to reverse engineer, disrupt, or misuse the app, or use it in any unlawful way. Ember is intended as a calm, personal companion, not a substitute for professional, medical, or pastoral advice."}</p>
        <h2>No warranty</h2>
        <p>{"Ember is provided as is, without warranties of any kind, express or implied. We do not guarantee that the app will be uninterrupted, error-free, or available at all times."}</p>
        <h2>Limitation of liability</h2>
        <p>{"To the fullest extent permitted by law, Approtic shall not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, the app."}</p>
        <h2>Changes</h2>
        <p>{"We may update these Terms from time to time. The current version will always be posted on this page with the date above."}</p>
        <h2>Contact</h2>
        <p>{"Questions about these Terms? Email "}<a href="mailto:hello@approtic.in">hello@approtic.in</a>{"."}</p>
        <p className="ebl-muted" style={{ marginTop: 28 }}>
          <a href="/emberbible">Home</a>{" · "}<a href="/emberbible/privacy">Privacy Policy</a>
        </p>
      </main>
    </div>
  );
}
