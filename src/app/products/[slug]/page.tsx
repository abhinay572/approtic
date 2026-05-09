import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react";
import { products } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return buildMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${slug}`,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <>
      <Section className="pt-32 pb-0">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-muted hover:text-text text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className={`h-64 rounded-3xl bg-gradient-to-br ${product.color} mb-10`} />

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Badge
              variant={
                product.status === "live"
                  ? "success"
                  : product.status === "beta"
                  ? "accent"
                  : "default"
              }
              className="mb-4"
            >
              {product.status === "live"
                ? "Live"
                : product.status === "beta"
                ? "Beta"
                : "Coming Soon"}
            </Badge>
            <h1 className="font-display text-5xl font-bold text-text mb-3">
              {product.name}
            </h1>
            <p className="text-accent-2 text-xl mb-6">{product.tagline}</p>
            <p className="text-muted text-lg leading-relaxed mb-8">{product.description}</p>
            <div className="flex flex-wrap gap-3">
              {product.url && (
                <a href={product.url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="gradient">
                    Try it free <ExternalLink size={16} />
                  </Button>
                </a>
              )}
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  Request a demo
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-6">
              What&apos;s included
            </p>
            <ul className="space-y-4">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-success shrink-0" />
                  <span className="text-text">{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-8">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="accent">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
