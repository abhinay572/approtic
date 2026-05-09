import Link from "next/link";
import { MessageCircle, X, Globe, Mail } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";
import { Container } from "@/components/ui/Container";

const links = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/about#careers" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "AI Agents", href: "/services#ai-agents" },
    { label: "Custom Dev", href: "/services#development" },
    { label: "SaaS Products", href: "/products" },
    { label: "Mobile Apps", href: "/apps" },
    { label: "Marketing", href: "/services#marketing" },
  ],
  Resources: [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Support", href: "/support" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

const socials = [
  { icon: X, href: "https://twitter.com/approtic", label: "Twitter / X" },
  { icon: Globe, href: "https://linkedin.com/company/approtic", label: "LinkedIn" },
  {
    icon: MessageCircle,
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919666659359"}`,
    label: "WhatsApp",
  },
  { icon: Mail, href: "mailto:hello@approtic.in", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <Container className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-4">
            <Link href="/" className="font-display font-bold text-2xl">
              <GradientText>Approtic</GradientText>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              AI-first product studio. We build software that thinks — AI agents, custom
              software, SaaS, and growth marketing.
            </p>
            {/* Address */}
            <address className="text-muted text-xs not-italic">
              Approtic Technologies<br />
              Hyderabad, Telangana 500001, India<br />
              <a href="mailto:hello@approtic.in" className="hover:text-accent transition-colors">
                hello@approtic.in
              </a>
            </address>
            {/* Socials */}
            <div className="flex gap-3 mt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                {group}
              </p>
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted hover:text-text transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-muted text-xs">
          <p>© {new Date().getFullYear()} Approtic Technologies. All rights reserved.</p>
          <p>Made with ❤️ in Hyderabad, India 🇮🇳</p>
        </div>
      </Container>
    </footer>
  );
}
