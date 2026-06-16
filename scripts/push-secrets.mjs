// Read .env.production (pulled from Vercel) and push the SERVER-ONLY secrets
// to the Cloudflare Worker via `wrangler secret put`. Prints only names +
// presence, never values. NEXT_PUBLIC_* are build-time (inlined by next build
// from .env.production) so they are NOT pushed here.
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const FILE = ".env.production";
if (!existsSync(FILE)) { console.error("No .env.production — run `vercel env pull` first."); process.exit(1); }

const env = {};
for (const line of readFileSync(FILE, "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const RUNTIME_SECRETS = [
  "RESEND_API_KEY", "RESEND_FROM_EMAIL", "RESEND_TO_EMAIL",
  "WHATSAPP_ACCESS_TOKEN", "WHATSAPP_PHONE_NUMBER_ID", "WHATSAPP_VERIFY_TOKEN",
];
const PUBLIC_BUILD = [
  "NEXT_PUBLIC_GA_ID", "NEXT_PUBLIC_GSC_VERIFICATION",
  "NEXT_PUBLIC_SPLINE_HERO", "NEXT_PUBLIC_WHATSAPP_NUMBER",
];

console.log("Build-time NEXT_PUBLIC_* (inlined at build, presence only):");
for (const k of PUBLIC_BUILD) console.log(`  ${env[k] ? "✓" : "—"} ${k}`);

console.log("\nPushing server secrets to the Worker:");
for (const k of RUNTIME_SECRETS) {
  if (!env[k]) { console.log(`  — ${k} (missing in Vercel env, skipped)`); continue; }
  try {
    execSync(`wrangler secret put ${k}`, { input: env[k], stdio: ["pipe", "ignore", "ignore"] });
    console.log(`  ✓ ${k} set`);
  } catch (e) {
    console.log(`  ✗ ${k} failed: ${e.message.split("\n")[0]}`);
  }
}
