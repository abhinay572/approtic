"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";

const nav = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-border shadow-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display font-bold text-xl">
          <GradientText>Approtic</GradientText>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-text bg-surface-2"
                  : "text-muted hover:text-text hover:bg-surface-2"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/support"
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/support"
                ? "text-text bg-surface-2"
                : "text-muted hover:text-text hover:bg-surface-2"
            )}
          >
            Support
          </Link>
          <Link href="/contact">
            <Button size="sm" variant="gradient">Book a call</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-muted hover:text-text"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-bg/95 backdrop-blur-md border-b border-border px-4 pb-6 pt-2 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-text bg-surface-2"
                  : "text-muted hover:text-text hover:bg-surface-2"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/support"
            className={cn(
              "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              pathname === "/support"
                ? "text-text bg-surface-2"
                : "text-muted hover:text-text hover:bg-surface-2"
            )}
          >
            Support
          </Link>
          <div className="pt-3">
            <Link href="/contact" className="block">
              <Button size="sm" variant="gradient" className="w-full">Book a call</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
