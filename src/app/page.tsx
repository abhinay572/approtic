import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTABanner } from "@/components/sections/CTABanner";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Hero />
      <TrustStrip />
      <ServicesOverview />
      <HowWeWork />
      <CaseStudies />
      <StatsCounter />
      <Testimonials />
      <CTABanner />
    </>
  );
}
