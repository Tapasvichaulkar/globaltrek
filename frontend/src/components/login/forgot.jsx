"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const generateOTP = () =>
    Math.floor(Math.random() * 1000000).toString().padStart(6, "0");

  const sendEmailOTP = async (recipientEmail, otpCode) => {
    const formData = new FormData();
    formData.append("email", recipientEmail);
    formData.append("subject", "Your OTP from GlobalTrek");
    formData.append(
      "message",
      `<div style="font-family:sans-serif; color:#1E293B;">
        <h2 style="color:#2563EB;">GlobalTrek</h2>
        <p>Hello,</p>
        <p>Your 6-digit OTP is: <strong>${otpCode}</strong></p>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>— GlobalTrek Team</p>
      </div>`
    );

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.success;
    } catch (err) {
      console.error("Email sending error:", err);
      return false;
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);

    if (!email) { setError("Please enter your email"); setLoading(false); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError("Invalid email"); setLoading(false); return; }

    const otpCode = generateOTP();
    localStorage.setItem(
      "forgot_password_otp",
      JSON.stringify({ email, otp: otpCode, expiry: Date.now() + 10 * 60 * 1000 })
    );

    const emailSent = await sendEmailOTP(email, otpCode);

    if (emailSent) setSuccess("OTP sent to your email!");
    else { setError("Failed to send email. Check console for OTP."); console.log("Fallback OTP:", otpCode); }

    setStep(2);
    setLoading(false);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);

    const stored = localStorage.getItem("forgot_password_otp");
    if (!stored) { setError("OTP expired. Request again."); setLoading(false); return; }

    const data = JSON.parse(stored);
    if (Date.now() > data.expiry) { localStorage.removeItem("forgot_password_otp"); setError("OTP expired. Request again."); setLoading(false); return; }
    if (data.email !== email) { setError("Email mismatch. Start over."); setLoading(false); return; }

    if (otp === data.otp) { setSuccess("OTP verified!"); setStep(3); } 
    else { setError("Invalid OTP"); }

    setLoading(false);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);

    if (!newPassword || !confirmPassword) { setError("Fill all fields"); setLoading(false); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match"); setLoading(false); return; }
    if (newPassword.length < 6) { setError("Password must be at least 6 characters"); setLoading(false); return; }

    setTimeout(() => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        user.password = newPassword;
        localStorage.setItem("user", JSON.stringify(user));
      }

      localStorage.removeItem("forgot_password_otp");
      setSuccess("Password reset! Redirecting...");

      setTimeout(() => router.push("/login"), 1500);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 p-3 sm:p-4 overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-white opacity-90 z-10"></div>

      {/* Form container */}
      <motion.div className="relative z-20 w-full max-w-md bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">Forgot Password</h1>

        {step === 1 && (
          <form onSubmit={handleSendOTP} className="flex flex-col gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2.5 sm:py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 w-full"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="flex flex-col gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              maxLength={6}
              className="border px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-center tracking-widest text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="flex justify-between items-center gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-blue-600 hover:underline text-sm"
              >
                Resend OTP
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Verify
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-3 sm:gap-4">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white py-2.5 sm:py-2 rounded-lg text-sm font-medium hover:bg-green-700 w-full"
            >
              Reset Password
            </button>
          </form>
        )}

        {(error || success) && (
          <div
            className={`mt-3 sm:mt-4 p-2.5 sm:p-2 rounded-lg text-center text-xs sm:text-sm ${
              error
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {error || success}
          </div>
        )}

        <p className="text-center text-xs sm:text-sm mt-3 sm:mt-4">
          Remember password?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}