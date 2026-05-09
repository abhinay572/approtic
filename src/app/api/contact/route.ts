import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, projectType, budget, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resend = getResend();

    await resend.emails.send({
      from: `Approtic Contact <${process.env.RESEND_FROM_EMAIL ?? "noreply@approtic.in"}>`,
      to: [process.env.RESEND_TO_EMAIL ?? "hello@approtic.in"],
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      html: `
        <h2>New project inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project type:</strong> ${projectType || "Not specified"}</p>
        <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    await resend.emails.send({
      from: `Approtic <${process.env.RESEND_FROM_EMAIL ?? "noreply@approtic.in"}>`,
      to: [email],
      subject: "We got your message — Approtic",
      html: `
        <h2>Thanks, ${name}!</h2>
        <p>We've received your message and will get back to you within 24 hours.</p>
        <p>While you wait, check out our <a href="https://approtic.in/portfolio">portfolio</a> or connect with us on <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}">WhatsApp</a>.</p>
        <br/>
        <p>– Abhinay &amp; the Approtic team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
