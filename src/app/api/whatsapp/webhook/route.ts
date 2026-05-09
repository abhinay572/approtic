import { NextRequest, NextResponse } from "next/server";
import { sendWhatsAppText } from "@/lib/whatsapp";

// Menu options for auto-reply tree
const MENU = `Hi! 👋 Thanks for reaching out to *Approtic*.

How can we help you today? Reply with a number:

1️⃣ Services & pricing
2️⃣ Book a discovery call
3️⃣ Project status update
4️⃣ Something else`;

const RESPONSES: Record<string, string> = {
  "1": `Here's a quick overview of our services:\n\n🤖 *AI Agents & Automation*\n💻 *Custom Web / Mobile Apps*\n📦 *SaaS Products*\n📈 *Digital Marketing & SEO*\n🎨 *Branding & Design*\n\nFor detailed pricing, book a call (reply 2) or visit https://approtic.in/services`,
  "2": `Book a 30-minute discovery call here 👇\nhttps://approtic.in/contact\n\nWe'll come back with a proposal within 48 hours. No commitment required.`,
  "3": `For project updates, please email us at hello@approtic.in with your project name and we'll reply within 4 hours.`,
  "4": `Got it! A team member will be in touch shortly. You can also email us at hello@approtic.in 🙌`,
};

// GET — Meta webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// POST — incoming messages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry = body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const message = value?.messages?.[0];

    if (!message) {
      return NextResponse.json({ status: "no-message" });
    }

    const from = message.from as string;
    const text = (message.text?.body ?? "").trim().toLowerCase();

    const reply = RESPONSES[text] ?? MENU;
    await sendWhatsAppText({ to: from, text: reply });

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("WhatsApp webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
