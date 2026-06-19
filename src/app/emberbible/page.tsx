import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ember — A daily Bible habit, gently",
  description:
    "A few verses a day, a forgiving streak, reading plans, a weekly act of kindness, and a quiet-time focus mode. Free, private, and on-device.",
  alternates: { canonical: "/emberbible" },
};

const css = `
.eb{--coral:#D85A30;--deep:#993C1D;--amber:#F6C66B;--cream:#FBEFE6;--teal:#1D9E75;--ink:#2b1a12;--muted:#7a6a60;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--ink);background:var(--cream);line-height:1.55}
.eb *{box-sizing:border-box}
.eb a{color:inherit}
.eb-wrap{max-width:1080px;margin:0 auto;padding:0 24px}
.eb-hero{position:relative;overflow:hidden;text-align:center;padding:88px 24px 64px;
  background:radial-gradient(1200px 480px at 50% -10%,rgba(246,198,107,.55),transparent 60%),linear-gradient(180deg,#fff6ec,var(--cream))}
.eb-flame{width:92px;height:92px;margin:0 auto 20px;position:relative;filter:drop-shadow(0 8px 22px rgba(216,90,48,.35))}
.eb-flame svg{width:100%;height:100%;transform-origin:50% 90%;animation:eb-flicker 1.6s ease-in-out infinite}
@keyframes eb-flicker{0%,100%{transform:scale(1) rotate(-1deg)}50%{transform:scale(1.06) rotate(1deg)}}
.eb-glow{position:absolute;inset:-30%;border-radius:50%;background:radial-gradient(circle,rgba(216,90,48,.35),transparent 60%);animation:eb-breathe 3s ease-in-out infinite;z-index:-1}
@keyframes eb-breathe{0%,100%{transform:scale(.9);opacity:.5}50%{transform:scale(1.15);opacity:.9}}
.eb-h1{font-size:clamp(38px,7vw,64px);line-height:1.05;letter-spacing:-.02em;font-weight:800;margin:0;
  background:linear-gradient(90deg,var(--deep),var(--coral));-webkit-background-clip:text;background-clip:text;color:transparent}
.eb-sub{font-size:clamp(17px,2.4vw,21px);color:var(--muted);max-width:620px;margin:18px auto 28px}
.eb-badge{display:inline-flex;align-items:center;gap:10px;background:#111;color:#fff;border-radius:14px;padding:13px 22px;font-weight:600;text-decoration:none;box-shadow:0 10px 28px rgba(0,0,0,.18)}
.eb-badge small{display:block;font-size:11px;font-weight:500;opacity:.85;line-height:1}
.eb-badge b{font-size:18px;line-height:1.15}
.eb-free{margin-top:16px;font-size:13px;color:var(--teal);font-weight:800;letter-spacing:.04em}
.eb-sec{padding:64px 0}
.eb-eyebrow{text-align:center;color:var(--coral);font-weight:800;letter-spacing:.12em;text-transform:uppercase;font-size:13px}
.eb-h2{text-align:center;font-size:clamp(28px,4vw,38px);font-weight:800;letter-spacing:-.02em;margin:8px 0}
.eb-lead{text-align:center;color:var(--muted);max-width:620px;margin:0 auto 40px}
.eb-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}
.eb-card{background:#fff;border:1px solid rgba(153,60,29,.08);border-radius:22px;padding:24px;box-shadow:0 14px 40px rgba(153,60,29,.06)}
.eb-ic{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;font-size:22px;margin-bottom:12px;background:rgba(246,198,107,.35)}
.eb-card h3{font-size:18px;margin:0 0 6px}
.eb-card p{color:var(--muted);font-size:15px;margin:0}
.eb-screens{background:linear-gradient(180deg,#fff6ec,var(--cream))}
.eb-shots{display:flex;gap:26px;justify-content:center;flex-wrap:wrap;margin-top:8px}
.eb-shots img{width:240px;border-radius:34px;border:1px solid rgba(153,60,29,.12);box-shadow:0 30px 70px rgba(153,60,29,.18)}
.eb-foot{padding:42px 24px;text-align:center;color:var(--muted);font-size:14px;border-top:1px solid rgba(153,60,29,.1)}
.eb-foot a{color:var(--deep);text-decoration:none;font-weight:600;margin:0 10px}
.eb-scrip{font-style:italic;color:var(--muted);max-width:560px;margin:0 auto}
`;

export default function EmberBiblePage() {
  const year = new Date().getFullYear();
  const S = "/emberbible/screens";
  return (
    <div className="eb">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <header className="eb-hero">
        <div className="eb-flame">
          <span className="eb-glow" />
          <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="ebf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#F6C66B" />
                <stop offset="0.55" stopColor="#D85A30" />
                <stop offset="1" stopColor="#993C1D" />
              </linearGradient>
            </defs>
            <path fill="url(#ebf)" d="M32 4c3 9-4 13-8 19-3 4-4 9-1 13 2 3 1 6-2 7 8 2 18-3 19-13 1-7-4-10-4-15 4 2 7 6 8 11 2-3 3-7 2-11C44 9 38 6 32 4Z" />
          </svg>
        </div>
        <h1 className="eb-h1">A daily Bible habit,<br />gently.</h1>
        <p className="eb-sub">{"A few verses a day, a streak that forgives missed days, reading plans, a weekly act of kindness, and a quiet-time focus mode. Calm, beautiful, and completely private."}</p>
        <a className="eb-badge" href="#"><span style={{ textAlign: "left" }}><small>Coming soon to the</small><b>App&nbsp;Store</b></span></a>
        <div className="eb-free">FREE · NO ADS · NO ACCOUNT · ON-DEVICE</div>
      </header>

      <section className="eb-sec">
        <div className="eb-wrap">
          <div className="eb-eyebrow">Why Ember</div>
          <h2 className="eb-h2">Consistency, not pressure</h2>
          <p className="eb-lead">{"Most people give up after one missed day. Ember is built so your habit survives real life."}</p>
          <div className="eb-grid">
            <div className="eb-card"><div className="eb-ic">📖</div><h3>A few verses a day</h3><p>{"Swipe through a small, beautiful deck of verses. Save the ones that speak to you. No clutter, no noise."}</p></div>
            <div className="eb-card"><div className="eb-ic">🔥</div><h3>A streak that forgives</h3><p>{"Miss a day? Ember covers it with grace days, so one slip does not erase your progress."}</p></div>
            <div className="eb-card"><div className="eb-ic">🗺️</div><h3>Reading plans</h3><p>{"Gospels in 30 days, Psalms of Peace, Proverbs, the New Testament, or the whole Bible — your verses follow the plan."}</p></div>
            <div className="eb-card"><div className="eb-ic">🤝</div><h3>A weekly kindness</h3><p>{"Each week brings one simple, real-world act of kindness to carry your reading into your life."}</p></div>
            <div className="eb-card"><div className="eb-ic">🌙</div><h3>Quiet time</h3><p>{"A calm, focused session with a gentle countdown — set everything else aside and be present."}</p></div>
            <div className="eb-card"><div className="eb-ic">🔒</div><h3>Private by design</h3><p>{"Everything stays on your device. No account, no tracking, no analytics. Just you and the Word."}</p></div>
          </div>
        </div>
      </section>

      <section className="eb-sec eb-screens">
        <div className="eb-wrap">
          <div className="eb-eyebrow">A look inside</div>
          <h2 className="eb-h2">Calm by design</h2>
          <p className="eb-lead">{"Warm, glassy, and quiet — built to feel like a moment of peace, not another notification."}</p>
          <div className="eb-shots">
            <img src={`${S}/today.png`} alt="Ember Today screen" loading="lazy" />
            <img src={`${S}/onboarding.png`} alt="Ember welcome screen" loading="lazy" />
          </div>
        </div>
      </section>

      <footer className="eb-foot">
        <p className="eb-scrip">{"“Your word is a lamp to my feet, and a light for my path.” — Psalm 119:105 (WEB)"}</p>
        <p style={{ marginTop: 18 }}>
          <a href="/emberbible/privacy">Privacy Policy</a> ·
          <a href="/emberbible/terms">Terms of Use</a> ·
          <a href="mailto:hello@approtic.in">Contact</a>
        </p>
        <p style={{ marginTop: 12, opacity: 0.8 }}>{`© ${year} Approtic · Scripture is the World English Bible (public domain)`}</p>
      </footer>
    </div>
  );
}
