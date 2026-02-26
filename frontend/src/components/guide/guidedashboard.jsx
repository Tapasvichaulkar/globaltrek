'use client'
import { useEffect, useState } from "react";

const statusConfig = {
  pending: {
    badge: "bg-orange-50 text-orange-700",
    dot: "bg-orange-400",
  },
  confirmed: {
    badge: "bg-green-50 text-green-700",
    dot: "bg-green-400",
  },
  cancelled: {
    badge: "bg-rose-50 text-rose-700",
    dot: "bg-rose-400",
  },
};

const hueClasses = [
  { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
  { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-200" },
  { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
  { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
];

const Avatar = ({ name }) => {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const colors = hueClasses[name?.charCodeAt(0) % hueClasses.length] || hueClasses[0];

  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-base shrink-0 border-2 ${colors.bg} ${colors.text} ${colors.border}`}
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
    >
      {initials}
    </div>
  );
};

const InfoChip = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-500">
    <span className="text-base">{icon}</span>
    <span className="text-slate-400 font-medium">{label}</span>
    <span className="text-slate-800 font-semibold">{value}</span>
  </div>
);

const BookingCard = ({ booking, index }) => {
  const status = booking.status || "pending";
  const s = statusConfig[status] || statusConfig.pending;

  const formattedDate = booking.date
    ? new Date(booking.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : booking.date;

  return (
    <div
      className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      style={{
        animation: `fadeSlideIn 0.35s ease both`,
        animationDelay: `${index * 0.06}s`,
      }}
    >
      <div className="flex items-center gap-3">
        <Avatar name={booking.name} />
        <div className="flex-1 min-w-0">
          <div
            className="text-lg font-semibold text-slate-900 truncate"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            {booking.name}
          </div>
          <div className="text-sm text-slate-500 mt-0.5">{booking.email}</div>
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide shrink-0 ${s.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <InfoChip icon="📞" label="Phone" value={booking.phone} />
        <InfoChip icon="📅" label="Date" value={formattedDate} />
        <InfoChip icon="👥" label="Guests" value={booking.guests} />
      </div>

      <div className="flex items-center justify-between bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl px-5 py-3.5 text-white">
        <span className="text-sm text-slate-400 font-medium">Total Amount</span>
        <span
          className="text-2xl font-bold tracking-tight"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          ₹{booking.totalAmount?.toLocaleString("en-IN")}
        </span>
      </div>

      {booking.message && (
        <div className="bg-slate-50 border border-slate-200 border-l-4 border-l-slate-300 rounded-lg px-4 py-3 text-sm text-slate-500 leading-relaxed">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-1">
            Note
          </span>
          {booking.message}
        </div>
      )}
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4">
    {[100, 60, 40].map((w, i) => (
      <div
        key={i}
        className="rounded-md animate-pulse bg-slate-100"
        style={{ height: i === 0 ? 20 : 14, width: `${w}%` }}
      />
    ))}
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
    <div className="text-2xl mb-2">{icon}</div>
    <div
      className="text-2xl font-semibold text-slate-900"
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
    >
      {value}
    </div>
    <div className="text-xs text-slate-400 font-medium mt-1">{label}</div>
  </div>
);

// ✅ Next.js App Router: params are received as props, no hook needed
// Make sure this file is at: app/guide/[guideId]/page.jsx
const GuideDashboard = ({ params }) => {
  const guideId = params?.guideId;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!guideId) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/bookings/guide/${guideId}`);
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [guideId]);

  const totalRevenue = bookings.reduce((s, b) => s + (b.totalAmount || 0), 0);
  const totalGuests = bookings.reduce((s, b) => s + (Number(b.guests) || 0), 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="min-h-screen bg-slate-50 text-slate-800"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <main className="max-w-3xl mx-auto px-6 py-9">

          <div className="mb-7 mt-6" style={{ animation: "fadeSlideIn 0.3s ease both" }}>
            <h1
              className="text-3xl font-semibold text-slate-900 leading-tight"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Booking Requests
            </h1>
            <p className="text-slate-500 text-sm mt-1.5">
              Manage and track all your tour bookings in one place.
            </p>
          </div>

          {!loading && bookings.length > 0 && (
            <div
              className="grid grid-cols-3 gap-4 mb-7"
              style={{ animation: "fadeSlideIn 0.35s 0.1s ease both" }}
            >
              <StatCard icon="📋" label="Total Bookings" value={bookings.length} />
              <StatCard icon="👥" label="Total Guests" value={totalGuests} />
              <StatCard
                icon="💰"
                label="Total Revenue"
                value={`₹${totalRevenue.toLocaleString("en-IN")}`}
              />
            </div>
          )}

          <div className="flex flex-col gap-4">
            {loading ? (
              [1, 2, 3].map((i) => <SkeletonCard key={i} />)
            ) : bookings.length === 0 ? (
              <div
                className="text-center py-20 text-slate-400"
                style={{ animation: "fadeSlideIn 0.3s ease both" }}
              >
                <div className="text-5xl mb-4">🗓️</div>
                <div
                  className="text-xl text-slate-500 mb-2"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  No bookings yet
                </div>
                <p className="text-sm">
                  Booking requests will appear here once travellers reach out.
                </p>
              </div>
            ) : (
              bookings.map((booking, index) => (
                <BookingCard key={booking._id} booking={booking} index={index} />
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default GuideDashboard;