import nodemailer from "nodemailer";
import { contact, profile } from "../../data";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 100, email: 200, message: 5000 };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
});

export async function POST(request: Request) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error("Contact form: GMAIL_USER / GMAIL_APP_PASSWORD are not set");
    return Response.json({ error: "Email service is not configured." }, { status: 500 });
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never see or fill this field.
  if (typeof data.company === "string" && data.company) return Response.json({ ok: true });

  const field = (k: keyof typeof LIMITS) => (typeof data[k] === "string" ? (data[k] as string).trim() : "");
  const name = field("name");
  const email = field("email");
  const message = field("message");
  const type = contact.form.projectTypes.find((t) => t.value === data.projectType)?.label;

  if (!name || !message || !type || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Please fill in every field with a valid email." }, { status: 400 });
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return Response.json({ error: "One of the fields is too long." }, { status: 400 });
  }

  const text = [`Name: ${name}`, `Email: ${email}`, `Project type: ${type}`, "", message].join("\n");
  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Project type:</strong> ${escapeHtml(type)}</p>
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    await transporter.sendMail({
      // Gmail rewrites From to the authenticated account, so the visitor goes in Reply-To.
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO_EMAIL || profile.email,
      replyTo: { name, address: email },
      subject: `New project inquiry — ${name} (${type})`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form: failed to send email", err);
    return Response.json({ error: "Couldn't send your message. Please try again or email me directly." }, { status: 502 });
  }
}
