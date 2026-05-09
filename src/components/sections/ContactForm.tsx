"use client";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

const budgets = [
  "< ₹1L",
  "₹1L – ₹5L",
  "₹5L – ₹20L",
  "₹20L+",
  "Let's discuss",
];

const projectTypes = [
  "AI Agent / Automation",
  "Web App / SaaS",
  "Mobile App",
  "Marketing / SEO",
  "Branding / Design",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-8">
      {status === "success" ? (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <CheckCircle2 size={56} className="text-success" />
          <h2 className="font-display text-2xl font-bold text-text">
            Message received!
          </h2>
          <p className="text-muted">
            We&apos;ll be in touch within 24 hours. While you wait, check out our{" "}
            <a href="/portfolio" className="text-accent hover:underline">
              portfolio
            </a>
            .
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-text">
                Name *
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="rounded-xl bg-bg border border-border px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-text">
                Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="rounded-xl bg-bg border border-border px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="projectType" className="text-sm font-medium text-text">
              Project type *
            </label>
            <select
              id="projectType"
              required
              value={form.projectType}
              onChange={(e) => set("projectType", e.target.value)}
              className="rounded-xl bg-bg border border-border px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition appearance-none"
            >
              <option value="">Select a type</option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text">Budget</label>
            <div className="flex flex-wrap gap-2">
              {budgets.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => set("budget", b)}
                  className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                    form.budget === b
                      ? "bg-accent text-white border-accent"
                      : "border-border text-muted hover:border-accent/50 hover:text-text"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-text">
              Tell us about your project *
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              className="rounded-xl bg-bg border border-border px-4 py-3 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition resize-none"
              placeholder="What are you building? What's the problem you're solving? Any timeline or deadlines?"
            />
          </div>

          {status === "error" && (
            <p className="text-red-400 text-sm text-center">
              Something went wrong. Please email us directly at{" "}
              <a href="mailto:hello@approtic.in" className="underline">
                hello@approtic.in
              </a>
              .
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            variant="gradient"
            disabled={status === "loading"}
            className="w-full"
          >
            {status === "loading" ? "Sending..." : "Send message"}
            <Send size={16} />
          </Button>
        </form>
      )}
    </Card>
  );
}
