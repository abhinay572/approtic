import type { Metadata } from "next";

export function buildMetadata({
  title,
  description,
  path = "",
  image = "/og/default.png",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `https://approtic.in${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      title,
      description,
      images: [image],
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Approtic",
  url: "https://approtic.in",
  logo: "https://approtic.in/favicons/logo.png",
  sameAs: [
    "https://twitter.com/approtic",
    "https://linkedin.com/company/approtic",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hello@approtic.in",
    availableLanguage: ["English", "Hindi"],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Approtic",
  url: "https://approtic.in",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://approtic.in/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://approtic.in/#localbusiness",
  name: "Approtic Technologies",
  image: "https://approtic.in/og/default.png",
  url: "https://approtic.in",
  telephone: "+91-96666-59359",
  email: "hello@approtic.in",
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hyderabad",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.385,
    longitude: 78.4867,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "19:00",
  },
  sameAs: [
    "https://twitter.com/approtic",
    "https://linkedin.com/company/approtic",
  ],
};
