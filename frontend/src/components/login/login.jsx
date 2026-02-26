"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Please fill all fields");
    return;
  }

  setLoading(true);
  setError("");

  // ✅ HARD-CODED ADMIN LOGIN
  if (email === "admin@gmail.com" && password === "admin123") {
    localStorage.setItem("user", JSON.stringify({ role: "admin" }));
    setLoading(false);
    router.push("/admin");
    return;
  }


  // ✅ NORMAL USERS → BACKEND LOGIN
  try {
    const res = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Invalid email or password");
      setLoading(false);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    router.push("/");
  } catch (err) {
    console.error("Login error:", err);
    setError("Backend server not running");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-3 sm:p-4">
      {/* Background Video - Positioned at bottom with clip-path */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
        src="/bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Blue gradient overlay for top portion */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-white opacity-90 z-10"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 border border-blue-100">
          {/* Header */}
          <div className="text-center mb-5 sm:mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                GlobalTrek
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm font-medium">
                Welcome back! Login to continue
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right -mt-1 sm:-mt-2">
              <a href="/forgot-password" className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </motion.button>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-xs sm:text-sm text-center bg-red-50 p-2.5 sm:p-3 rounded-lg border border-red-200"
              >
                {error}
              </motion.div>
            )}
          </form>

          {/* Divider */}
          <div className="relative my-4 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 sm:px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-xs sm:text-sm mt-4 sm:mt-6 text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
              Sign Up
            </a>
          </p>
        </div>

        {/* Additional Help Text */}
        <p className="text-center text-xs text-gray-500 mt-3 sm:mt-4 px-2">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
          {" "}and{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
        </p>
      </motion.div>
    </div>
  );
}