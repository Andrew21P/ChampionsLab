import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const type = String(formData.get("type") || "feedback").trim();
    const message = String(formData.get("message") || "").trim();
    const image = formData.get("image") as File | null;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: "Message too long (max 5000 characters)." }, { status: 400 });
    }

    let imageInfo = "";
    if (image && image.size > 0) {
      if (image.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Image too large (max 5MB)." }, { status: 400 });
      }
      imageInfo = `\nAttached image: ${image.name} (${(image.size / 1024).toFixed(1)} KB)`;
    }

    // Build email body — for now we log it; a real SMTP setup can be added later
    const emailBody = [
      `New ${type} from Champions Lab`,
      `─────────────────────────────`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Type: ${type}`,
      `Message:`,
      message,
      imageInfo,
    ].join("\n");

    // Log the contact submission (in production, integrate with an email service)
    console.log("[Contact Form Submission]");
    console.log(emailBody);

    // If you have nodemailer or a similar service configured, send here:
    // await sendEmail({ to: "lui21andrew@gmail.com", subject: `[Champions Lab] ${type}`, body: emailBody });

    return NextResponse.json({ success: true, message: "Thanks for your message! We'll get back to you soon." });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
