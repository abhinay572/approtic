# Approtic — approtic.in

Marketing site for Approtic AI + software product studio.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind v4 · Framer Motion · Spline · MDX · Resend · WhatsApp Cloud API · Vercel

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | From resend.com — for contact form emails |
| `RESEND_FROM_EMAIL` | Verified sender address in Resend |
| `RESEND_TO_EMAIL` | Where contact form submissions land |
| `WHATSAPP_PHONE_NUMBER_ID` | From Meta Developer Console |
| `WHATSAPP_ACCESS_TOKEN` | Permanent system user token from Meta |
| `WHATSAPP_VERIFY_TOKEN` | Any random string — paste same value in Meta webhook config |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | From Meta Business Manager |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp number with country code, no + (e.g. 919876543210) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (G-XXXXXXXX) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML meta tag value |
| `NEXT_PUBLIC_SPLINE_HERO` | Spline scene URL for hero 3D (optional — CSS fallback renders without it) |

---

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

---

## Adding content

### Blog post

Create `src/content/blog/your-post-slug.mdx` with frontmatter:

```
---
title: "Post Title"
date: "2025-05-01"
description: "One-line description for SEO and previews."
tags: ["AI", "Engineering"]
---

# Your content here
```

### Portfolio project
Edit `src/lib/portfolio.ts` and add a new Project object.

### Product
Edit `src/lib/products.ts` and add a new Product object.

---

## Spline 3D scenes

1. Go to spline.design/community
2. Pick a scene, duplicate it, publish
3. Copy the scene URL
4. Set `NEXT_PUBLIC_SPLINE_HERO=https://prod.spline.design/YOUR_ID/scene.splinecode`

The hero falls back to a CSS glow animation when no scene is configured.

---

## WhatsApp Cloud API setup

1. Create a Meta Business account at business.facebook.com
2. Go to developers.facebook.com > My Apps > Create App > Business > add WhatsApp product
3. Get your Phone Number ID and generate a permanent System User Token
4. Set webhook URL to `https://approtic.in/api/whatsapp/webhook`
5. Set verify token to match `WHATSAPP_VERIFY_TOKEN` in .env.local
6. Subscribe to: `messages`, `message_status`

The auto-reply tree is in `src/app/api/whatsapp/webhook/route.ts`.

---

## Deploy to Vercel

```bash
git init && git add . && git commit -m "Initial commit"
git remote add origin git@github.com:YOUR_USERNAME/approtic.git
git push -u origin main
```

Then:

1. vercel.com > Import GitHub repo
2. Add all env vars from .env.local in the Vercel dashboard
3. Set custom domain to approtic.in
4. DNS: A record -> 76.76.21.21 and CNAME www -> cname.vercel-dns.com

---

## SEO checklist post-launch

- [ ] Submit https://approtic.in/sitemap.xml to Google Search Console
- [ ] Request indexing on key pages
- [ ] Set up Google Analytics 4
- [ ] Verify GSC HTML tag, set NEXT_PUBLIC_GSC_VERIFICATION
- [ ] Add business to Google Business Profile
- [ ] Submit to Bing Webmaster Tools
