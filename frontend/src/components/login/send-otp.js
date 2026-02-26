import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email, otp } = req.body;

  if (!email || !otp) return res.status(400).json({ message: "Missing email or OTP" });

  // Use Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // your Gmail
      pass: process.env.GMAIL_PASS, // App Password if 2FA
    },
  });

  try {
    await transporter.sendMail({
      from: '"GlobalTrek" <yourgmail@gmail.com>',
      to: email,
      subject: "Your OTP from GlobalTrek",
      html: `
        <h2>GlobalTrek</h2>
        <p>Your 6-digit OTP is: <strong>${otp}</strong></p>
        <p>Valid for 10 minutes</p>
      `,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}