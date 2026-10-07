const EMAIL_TO = ["richalimi2005@gmail.com"];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function isEmail(value) {
  return /^[\w.-]+@[\w.-]+\.\w+$/.test(value);
}

async function sendContactEmail({ name, email, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const from =
    process.env.RESEND_FROM_EMAIL ||
    "The Eventopia Planner <onboarding@resend.dev>";

  const text = [
    "New Contact Form Enquiry",
    "========================",
    `Name: ${name}`,
    `Email: ${email}`,
    `Message: ${message || "Not provided"}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#DC9B78;">New Contact Form Enquiry</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Name</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;">${name}</td></tr>
        <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;">${email}</td></tr>
        <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Message</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;">${message || "Not provided"}</td></tr>
      </table>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: EMAIL_TO,
      reply_to: email,
      subject: `New Contact Enquiry: ${name}`,
      text,
      html,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `Resend failed (${response.status}): ${payload?.message || JSON.stringify(payload)}`
    );
  }
  return payload;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const name = (body?.name || "").trim();
  const email = (body?.email || "").trim();
  const message = (body?.message || "").trim();

  if (!name || !email) {
    return json({ error: "Name and email are required" }, 400);
  }

  if (!isEmail(email)) {
    return json({ error: "Please provide a valid email address" }, 400);
  }

  try {
    await sendContactEmail({ name, email, message });
    return json({ ok: true, submitted: true });
  } catch (error) {
    console.error("[contact] Email notification failed:", error);
    return json(
      { error: "Unable to send your message. Please try again." },
      500
    );
  }
}
