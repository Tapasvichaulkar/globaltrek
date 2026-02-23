"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Generate random 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Send OTP via FormSubmit (FREE - No signup needed!)
  const sendOTPEmail = async (recipientEmail, otpCode) => {
    try {
      console.log("📧 Sending email to:", recipientEmail);
      console.log("🔑 OTP:", otpCode);

      const formData = new FormData();
      formData.append('email', recipientEmail);
      formData.append('subject', 'Password Reset OTP - GlobalTrek');
      formData.append('message', `
Hello,

Your password reset OTP for GlobalTrek is: ${otpCode}

This code will expire in 10 minutes.

If you didn't request this, please ignore this email.

Best regards,
GlobalTrek Team
      `);

      // Using FormSubmit.co - completely free, no signup!
      const response = await fetch('https://formsubmit.co/ajax/' + recipientEmail, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok || data.success) {
        return { success: true };
      } else {
        return { success: false, error: "Failed to send" };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: error.message };
    }
  };

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    // Generate OTP
    const otp = generateOTP();
    setGeneratedOTP(otp);

    // Store OTP with expiry (10 minutes)
    const otpData = {
      email: email,
      otp: otp,
      expiry: Date.now() + 10 * 60 * 1000,
    };
    localStorage.setItem("forgot_password_otp", JSON.stringify(otpData));

    // Show OTP in console immediately (ALWAYS works)
    console.log("═══════════════════════════════════");
    console.log("🔐 YOUR OTP CODE: " + otp);
    console.log("📧 Sent to: " + email);
    console.log("⏰ Valid for: 10 minutes");
    console.log("═══════════════════════════════════");

    // Try to send email (but don't block if it fails)
    try {
      const result = await sendOTPEmail(email, otp);
      
      setSuccess("OTP Generated! Check console (F12) for your code. Email sending in progress...");
      setStep(2);
      
      if (result.success) {
        console.log("✅ Email sent successfully!");
      } else {
        console.log("⚠️ Email might not have sent, but you can use the OTP from console!");
      }
    } catch (error) {
      console.error("Email error:", error);
      setSuccess("OTP Generated! Check console (F12) for your code.");
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const storedData = localStorage.getItem("forgot_password_otp");

    if (!storedData) {
      setError("OTP expired. Please request a new one.");
      setLoading(false);
      setStep(1);
      return;
    }

    const otpData = JSON.parse(storedData);

    if (Date.now() > otpData.expiry) {
      setError("OTP expired. Please request a new one.");
      localStorage.removeItem("forgot_password_otp");
      setLoading(false);
      setStep(1);
      return;
    }

    if (otpData.email !== email) {
      setError("Email mismatch. Please start over.");
      setLoading(false);
      setStep(1);
      return;
    }

    setTimeout(() => {
      if (otp === otpData.otp) {
        setSuccess("OTP verified successfully!");
        setStep(3);
      } else {
        setError("Invalid OTP. Please try again.");
      }
      setLoading(false);
    }, 1000);
  };

  // Step 3: Reset Password
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    setTimeout(() => {
      const userData = localStorage.getItem("user");

      if (userData) {
        const user = JSON.parse(userData);
        user.password = newPassword;
        localStorage.setItem("user", JSON.stringify(user));
      }

      localStorage.removeItem("forgot_password_otp");

      setSuccess("Password reset successful! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);

      setLoading(false);
    }, 1500);
  };

  // Resend OTP
  const handleResendOTP = () => {
    setOtp("");
    setError("");
    setSuccess("");
    handleSendOTP({ preventDefault: () => {} });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-4">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
        src="/bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-white [clip-path:polygon(0_0,100%_0,100%_50%,0_30%)] z-0"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-blue-100">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                GlobalTrek
              </h1>
              <p className="text-gray-600 text-sm font-medium">
                {step === 1 && "Reset your password"}
                {step === 2 && "Verify OTP"}
                {step === 3 && "Set new password"}
              </p>
            </motion.div>
          </div>

          {/* Step 1: Email Input */}
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                />
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-4">
                <p className="text-sm text-amber-800 font-semibold mb-2">
                  📱 How to get your OTP:
                </p>
                <ol className="text-xs text-amber-700 space-y-1 ml-4">
                  <li>1. Click "Send OTP" button</li>
                  <li>2. Press <strong>F12</strong> to open Developer Tools</li>
                  <li>3. Click the <strong>Console</strong> tab</li>
                  <li>4. Look for your 6-digit OTP code</li>
                </ol>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3.5 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating OTP...
                  </span>
                ) : (
                  "Send OTP"
                )}
              </motion.button>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-lg border border-green-200"
                >
                  {success}
                </motion.div>
              )}
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  autoFocus
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white text-center text-2xl tracking-widest font-semibold"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  OTP sent to {email}
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg p-4">
                <p className="text-sm text-blue-800 font-semibold mb-2">
                  🔍 Can't find your OTP?
                </p>
                <ol className="text-xs text-blue-700 space-y-1 ml-4">
                  <li>1. Press <strong>F12</strong> (or right-click → Inspect)</li>
                  <li>2. Click <strong>Console</strong> tab at the top</li>
                  <li>3. Look for the box with your OTP code</li>
                  <li>4. Copy and paste it above</li>
                </ol>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3.5 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify OTP"
                )}
              </motion.button>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  ← Back to email
                </button>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Resend OTP
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-lg border border-green-200"
                >
                  {success}
                </motion.div>
              )}
            </form>
          )}

          {/* Step 3: Reset Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3.5 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </motion.button>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-lg border border-green-200"
                >
                  {success}
                </motion.div>
              )}
            </form>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Back to Login Link */}
          <p className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <a href="/login" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
              Login
            </a>
          </p>
        </div>

        {/* Additional Help Text */}
        <p className="text-center text-xs text-gray-500 mt-4">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
          {" "}and{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
        </p>
      </motion.div>
    </div>
  );
}