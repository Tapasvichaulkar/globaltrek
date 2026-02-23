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
      setUser(JSON.parse(storedUser));
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 py-8 px-4">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header with Gradient */}
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-600">
            {/* Menu Button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-white" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-10 border border-gray-100">
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 text-sm">Edit Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      router.push("/login");
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 border-t"
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span className="text-red-600 text-sm">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="px-6 pb-6">
            <div className="flex flex-col items-center -mt-16">
              {/* Avatar */}
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-5xl font-bold text-blue-600">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                {/* Online Status */}
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 rounded-full border-3 border-white"></div>
              </div>

              {/* Name and Email */}
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {user.name}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>

              {/* Status Badges */}
              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Active
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  Verified
                </span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              
              {/* Phone Card */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-600 mb-1">Phone Number</p>
                    <p className="text-sm font-semibold text-gray-800">{user.phone}</p>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-600 mb-1">Address</p>
                    <p className="text-sm font-semibold text-gray-800">{user.address}</p>
                  </div>
                </div>
              </div>

              {/* Member Since Card */}
              <div className="bg-sky-50 rounded-xl p-4 border border-sky-100 md:col-span-2">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-600 mb-1">Member Since</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push("/")}
                className="flex-1 bg-blue-500 text-white py-3 px-5 rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </button>

              <button
                onClick={() => {
                  localStorage.clear();
                  router.push("/login");
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-5 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>



        </div>

        {/* Quick Actions Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <button className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-left">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">My Bookings</h3>
            <p className="text-xs text-gray-600">View all bookings</p>
          </button>

          <button className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-left">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mb-3">
              <Heart className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Favorites</h3>
            <p className="text-xs text-gray-600">Saved guides</p>
          </button>

          <button className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-left">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center mb-3">
              <Settings className="w-5 h-5 text-sky-600" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Settings</h3>
            <p className="text-xs text-gray-600">Account settings</p>
          </button>

        </div>
      </div>
    </div>
  );
}