const WHATSAPP_TO = "919810782229"; // +91 9810782229
const EMAIL_TO = ["richalimi2005@gmail.com"];

// Short-lived in-memory dedupe to prevent double-click / rapid re-submit spam
const RECENT_SUBMISSIONS = new Map();
const DEDUPE_WINDOW_MS = 60_000;

function getSubmissionFingerprint(body) {
  return [
    (body.name || "").trim().toLowerCase(),
    (body.email || "").trim().toLowerCase(),
    (body.phone || "").trim().toLowerCase(),
    body.eventType || "",
    body.eventDate || "",
    body.guestCount || "",
    body.theme || "",
    body.budget || "",
  ].join("|");
}

function isDuplicateSubmission(fingerprint) {
  const now = Date.now();
  for (const [key, timestamp] of RECENT_SUBMISSIONS) {
    if (now - timestamp > DEDUPE_WINDOW_MS) {
      RECENT_SUBMISSIONS.delete(key);
    }
  }
  if (RECENT_SUBMISSIONS.has(fingerprint)) {
    return true;
  }
  RECENT_SUBMISSIONS.set(fingerprint, now);
  return false;
}

const EVENT_TYPE_LABELS = {
  birthday: "Birthday",
  anniversary: "Anniversary",
  wedding: "Wedding",
  "baby-shower": "Baby Shower",
  corporate: "Corporate",
  proposal: "Proposal",
  custom: "Custom",
};

const THEME_LABELS = {
  luxury: "Luxury",
  boho: "Boho",
  pastel: "Pastel",
  neon: "Neon",
  romantic: "Romantic",
  floral: "Floral",
  custom: "Custom",
};

const BUDGET_LABELS = {
  "under-10k": "Under ₹10,000",
  "10-25k": "₹10,000 - ₹25,000",
  "25-50k": "₹25,000 - ₹50,000",
  "50-100k": "₹50,000 - ₹100,000",
  "100k-plus": "₹100,000+",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function isEmail(value) {
  return /^[\w.-]+@[\w.-]+\.\w+$/.test(value);
}

function isPhone(value) {
  return /^\+?[\d\s\-()]+$/.test(value) && value.replace(/\D/g, "").length >= 7;
}

function formatPlannerDetails(body) {
  const eventType =
    EVENT_TYPE_LABELS[body.eventType] || body.eventType || "—";
  const theme = THEME_LABELS[body.theme] || body.theme || "—";
  const budget = BUDGET_LABELS[body.budget] || body.budget || "—";
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();

  return {
    name: (body.name || "").trim() || "—",
    phone: phone || "—",
    email: email || "—",
    // Combined for WhatsApp template param compatibility
    contact: [phone, email].filter(Boolean).join(" | ") || "—",
    eventType,
    eventDate: body.eventDate || "—",
    guestCount: body.guestCount || "—",
    theme,
    budget,
    location: body.location || body.venue || "Not provided",
    message: body.message || body.details || "Not provided",
  };
}

function buildPlainText(details) {
  return [
    "New 30-Second Planner Submission",
    "================================",
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `Email: ${details.email}`,
    `Celebration / Event Type: ${details.eventType}`,
    `Celebration Date: ${details.eventDate}`,
    `Guest Count: ${details.guestCount}`,
    `Theme Preference: ${details.theme}`,
    `Budget Range: ${details.budget}`,
    `Location / Venue: ${details.location}`,
    `Additional Details: ${details.message}`,
  ].join("\n");
}

function buildHtml(details) {
  const rows = [
    ["Name", details.name],
    ["Phone", details.phone],
    ["Email", details.email],
    ["Celebration / Event Type", details.eventType],
    ["Celebration Date", details.eventDate],
    ["Guest Count", details.guestCount],
    ["Theme Preference", details.theme],
    ["Budget Range", details.budget],
    ["Location / Venue", details.location],
    ["Additional Details", details.message],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;">${String(value)}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#DC9B78;">New 30-Second Planner Submission</h2>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
    </div>
  `;
}

async function sendEmails(details) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const from =
    process.env.RESEND_FROM_EMAIL ||
    "The Eventopia Planner <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: EMAIL_TO,
      subject: `New Planner Lead: ${details.name} — ${details.eventType}`,
      text: buildPlainText(details),
      html: buildHtml(details),
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

async function sendWhatsApp(details) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!accessToken || !phoneNumberId) {
    throw new Error(
      "WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID must be configured"
    );
  }

  const apiVersion = process.env.WHATSAPP_API_VERSION || "v21.0";
  const to = (process.env.WHATSAPP_NOTIFY_TO || WHATSAPP_TO).replace(/\D/g, "");
  const bodyText = buildPlainText(details);
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;

  let messagePayload;
  if (templateName) {
    // Optional approved template — body params mirror key planner fields
    messagePayload = {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: details.name },
              { type: "text", text: details.contact },
              { type: "text", text: details.eventType },
              { type: "text", text: details.eventDate },
              { type: "text", text: details.guestCount },
              { type: "text", text: details.theme },
              { type: "text", text: details.budget },
            ],
          },
        ],
      },
    };
  } else {
    messagePayload = {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: {
        preview_url: false,
        body: bodyText.slice(0, 4096),
      },
    };
  }

  const response = await fetch(
    `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messagePayload),
    }
  );

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `WhatsApp failed (${response.status}): ${payload?.error?.message || JSON.stringify(payload)}`
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

  if (
    !body?.name?.trim() ||
    !body?.email?.trim() ||
    !body?.phone?.trim() ||
    !body?.eventType ||
    !body?.eventDate
  ) {
    return json(
      {
        error:
          "Missing required planner fields (name, email, phone, eventType, eventDate)",
      },
      400
    );
  }

  if (!isEmail(body.email.trim())) {
    return json({ error: "Please provide a valid email address" }, 400);
  }

  if (!isPhone(body.phone.trim())) {
    return json({ error: "Please provide a valid phone number" }, 400);
  }

  const details = formatPlannerDetails(body);
  const fingerprint = getSubmissionFingerprint(body);
  const notifications = { email: null, whatsapp: null };

  // Accept the submission for UX even if this is a rapid duplicate —
  // skip re-sending notifications to avoid spam from double-clicks.
  if (isDuplicateSubmission(fingerprint)) {
    console.warn("[planner] Duplicate submission suppressed:", fingerprint);
    return json({
      ok: true,
      submitted: true,
      duplicate: true,
      notifications: {
        email: { ok: true, skipped: "duplicate" },
        whatsapp: { ok: true, skipped: "duplicate" },
      },
    });
  }

  // Notifications are best-effort and must not fail the request
  try {
    notifications.email = { ok: true, result: await sendEmails(details) };
  } catch (error) {
    console.error("[planner] Email notification failed:", error);
    notifications.email = { ok: false, error: error.message };
  }

  try {
    notifications.whatsapp = { ok: true, result: await sendWhatsApp(details) };
  } catch (error) {
    console.error("[planner] WhatsApp notification failed:", error);
    notifications.whatsapp = { ok: false, error: error.message };
  }

  return json({
    ok: true,
    submitted: true,
    notifications,
  });
}
