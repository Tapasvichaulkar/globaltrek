"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  MoreVertical,
  Edit,
  LogOut,
  Home,
  BookOpen,
  Heart,
  Settings
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
    } else {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === "admin") {
        setUser({ ...parsedUser, name: "Admin", phone: "77777777777", address: "Admin Office, GlobalTrek HQ" });
      } else if (parsedUser.role === "guide") {
        setUser({ ...parsedUser, name: "Guide", phone: "88888888888", address: "Guide Center, City Branch" });
      } else {
        setUser(parsedUser);
      }
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-base sm:text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header Gradient */}
          <div className="relative h-24 sm:h-32 bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 sm:p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-xl shadow-lg overflow-hidden z-10 border border-gray-100">
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-full px-4 py-2.5 sm:py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 text-sm">Edit Profile</span>
                  </button>
                  <button
                    onClick={() => { localStorage.clear(); router.push("/login"); }}
                    className="w-full px-4 py-2.5 sm:py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 border-t"
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span className="text-red-600 text-sm">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-4 sm:px-6 pb-5 sm:pb-6">
            <div className="flex flex-col items-center -mt-12 sm:-mt-16">
              {/* Avatar */}
              <div className="relative mb-3 sm:mb-4">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-4xl sm:text-5xl font-bold text-blue-600">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-400 rounded-full border-2 border-white"></div>
              </div>

              {/* Name & Email */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1.5 sm:mb-2 text-center">
                {user.name}
              </h1>
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 mb-4 sm:mb-6">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="text-sm sm:text-base break-all text-center">{user.email}</span>
              </div>

              {/* Status Badges */}
              <div className="flex gap-2 mb-4 sm:mb-6">
                <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Active
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  Verified
                </span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              
              {/* Phone */}
              <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-100">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-600 mb-0.5 sm:mb-1">Phone Number</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">{user.phone}</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-indigo-50 rounded-xl p-3 sm:p-4 border border-indigo-100">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-600 mb-0.5 sm:mb-1">Address</p>
                    <p className="text-sm font-semibold text-gray-800 line-clamp-2">{user.address}</p>
                  </div>
                </div>
              </div>

              {/* Member Since */}
              <div className="bg-sky-50 rounded-xl p-3 sm:p-4 border border-sky-100 sm:col-span-2">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-sky-500 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-600 mb-0.5 sm:mb-1">Member Since</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <button
                onClick={() => router.push("/")}
                className="flex-1 bg-blue-500 text-white py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </button>
              <button
                onClick={() => { localStorage.clear(); router.push("/login"); }}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-3 sm:gap-4">
          <button className="bg-white rounded-xl p-3 sm:p-5 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-left">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-2 sm:mb-3">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm mb-0.5 sm:mb-1">My Bookings</h3>
            <p className="text-xs text-gray-600 hidden sm:block">View all bookings</p>
          </button>

          <button className="bg-white rounded-xl p-3 sm:p-5 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-left">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-indigo-100 flex items-center justify-center mb-2 sm:mb-3">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm mb-0.5 sm:mb-1">Favorites</h3>
            <p className="text-xs text-gray-600 hidden sm:block">Saved guides</p>
          </button>

          <button className="bg-white rounded-xl p-3 sm:p-5 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-left">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-sky-100 flex items-center justify-center mb-2 sm:mb-3">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm mb-0.5 sm:mb-1">Settings</h3>
            <p className="text-xs text-gray-600 hidden sm:block">Account settings</p>
          </button>
        </div>
      </div>
    </div>
  );
}