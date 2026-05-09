const BASE_URL = "https://graph.facebook.com/v20.0";

interface TextMessage {
  to: string;
  text: string;
}

interface TemplateMessage {
  to: string;
  templateName: string;
  languageCode?: string;
  components?: Record<string, unknown>[];
}

export async function sendWhatsAppText({ to, text }: TextMessage) {
  const res = await fetch(
    `${BASE_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: { body: text },
      }),
    }
  );
  return res.json();
}

export async function sendWhatsAppTemplate({
  to,
  templateName,
  languageCode = "en",
  components = [],
}: TemplateMessage) {
  const res = await fetch(
    `${BASE_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: templateName,
          language: { code: languageCode },
          components,
        },
      }),
    }
  );
  return res.json();
}
