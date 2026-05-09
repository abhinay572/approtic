import { Marquee } from "@/components/ui/Marquee";

const logos = [
  "OpenAI", "Vercel", "Supabase", "Stripe", "Anthropic",
  "Notion", "Linear", "Figma", "Resend", "Cloudflare",
];

export function TrustStrip() {
  return (
    <div className="py-12 border-y border-border bg-surface/50">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted mb-8">
        Powered by the best tools in the world
      </p>
      <Marquee speed={30}>
        {logos.map((logo) => (
          <div
            key={logo}
            className="flex items-center justify-center h-10 px-8 text-muted font-semibold text-sm uppercase tracking-wider whitespace-nowrap opacity-40 hover:opacity-70 transition-opacity"
          >
            {logo}
          </div>
        ))}
      </Marquee>
    </div>
  );
}
