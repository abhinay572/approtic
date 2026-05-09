import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "ResinCraft – Terms & Conditions",
  description:
    "Terms and Conditions for ResinCraft: Resin Calculator iOS app by Approtic Solutions Private Limited.",
  path: "/apps/resincraft/terms",
});

export default function ResinCraftTermsPage() {
  return (
    <Section className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/apps/resincraft"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-violet-400 transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Back to ResinCraft
        </Link>

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-3">ResinCraft</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text mb-4">Terms &amp; Conditions</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted">
            <span>Effective Date: May 6, 2026</span>
            <span>·</span>
            <span>Last Updated: May 6, 2026</span>
          </div>
        </div>

        <p className="text-muted leading-relaxed mb-10">
          These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of the ResinCraft mobile
          application (the &ldquo;App&rdquo;) provided by Approtic Solutions Private Limited (&ldquo;we&rdquo;,
          &ldquo;our&rdquo;, &ldquo;us&rdquo;). By downloading, installing, or using the App you agree to
          these Terms.
        </p>

        <div className="space-y-0 text-muted leading-relaxed">
          {[
            {
              title: "1. The App",
              content:
                "ResinCraft is a calculator and reference tool for DIY epoxy and craft-resin makers. It estimates the volume of resin and hardener needed for a given mold shape and brand mix-ratio. The App is provided for personal, non-commercial use.",
            },
            {
              title: "2. License",
              content:
                "We grant you a personal, non-exclusive, non-transferable, revocable license to use the App on devices you own or control, subject to these Terms and Apple's standard EULA for App Store applications.",
            },
            {
              title: "3. Calculation Disclaimer",
              content:
                "ResinCraft uses standard geometric formulas and brand-published mix ratios to estimate volume requirements. Results are approximations and depend on accurate user input. Always verify results against your resin manufacturer's published instructions before pouring. We are not responsible for material waste, project failures, or damage caused by incorrect input or material variation.",
            },
            {
              title: "4. Resin Safety",
              content:
                "Epoxy and casting resins can cause skin irritation, respiratory irritation, and other hazards if used improperly. The App does not provide medical or safety advice. Always read your manufacturer's safety data sheet (SDS), use proper personal protective equipment (gloves, respirator, ventilation), and follow local regulations. We disclaim all liability for personal injury, property damage, or environmental harm arising from your use of resin products.",
            },
            {
              title: "5. Acceptable Use",
              content:
                "You agree not to: (a) reverse-engineer, decompile, or disassemble the App; (b) remove or modify any proprietary notices; (c) use the App for unlawful purposes; or (d) interfere with the App's intended functionality.",
            },
            {
              title: "6. Intellectual Property",
              content:
                "The App, including its source code, design, branding, and content, is the property of Approtic Solutions Private Limited and is protected by copyright and trademark laws. Resin brand names referenced in the App (ArtResin, Pro Marine, Stone Coat, EnviroTex, MAS, Ecopoxy, TotalBoat) are trademarks of their respective owners and are used for reference only.",
            },
            {
              title: "7. No Warranty",
              content:
                'The App is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that calculations are error-free or that the App will be uninterrupted.',
            },
            {
              title: "8. Limitation of Liability",
              content:
                "To the maximum extent permitted by law, Approtic Solutions Private Limited shall not be liable for any indirect, incidental, consequential, special, or exemplary damages arising from your use of the App, including but not limited to loss of profits, data, materials, or goodwill, even if advised of the possibility of such damages. Our total cumulative liability shall not exceed the amount you paid for the App, which for free downloads is zero.",
            },
            {
              title: "9. Changes to the App and Terms",
              content:
                "We may modify, suspend, or discontinue the App or these Terms at any time. Continued use of the App after a change constitutes acceptance of the revised Terms.",
            },
            {
              title: "10. Governing Law",
              content:
                "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, Telangana, India.",
            },
          ].map((section) => (
            <div key={section.title} className="border-t border-border py-8">
              <h2 className="font-display font-bold text-xl text-text mb-4">{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}

          <div className="border-t border-border pt-8">
            <h2 className="font-display font-bold text-xl text-text mb-4">11. Contact</h2>
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-2">
              <p className="font-semibold text-text">Approtic Solutions Private Limited</p>
              <p>
                Email:{" "}
                <a href="mailto:abhinay@approtic.in" className="text-violet-400 hover:underline">
                  abhinay@approtic.in
                </a>
              </p>
              <p>
                Website:{" "}
                <Link href="/" className="text-violet-400 hover:underline">
                  https://approtic.in
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row gap-4 text-sm text-muted">
          <Link href="/apps/resincraft" className="hover:text-violet-400 transition-colors">
            ← Back to ResinCraft
          </Link>
          <Link href="/apps/resincraft/privacy" className="hover:text-violet-400 transition-colors sm:ml-auto">
            Privacy Policy →
          </Link>
        </div>
      </div>
    </Section>
  );
}
