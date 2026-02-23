import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ToastContainer, useToast } from "../../components/Toast";
import api from "../../api";

export default function SponsorProfile() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(searchParams.get("edit") === "1");
  const [profile, setProfile] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0);
  const { toasts, addToast, removeToast } = useToast();

  /* ── Page title ── */
  useEffect(() => { document.title = "My Profile — SponzaMe"; }, []);

  /* ── Map API response to display model ── */
  const mapProfile = (p) => ({
    companyName: p.company_name || p.name || "—",
    username: "@" + (p.name || "").toLowerCase().replace(/\s+/g, ""),
    initials: (p.name || "?")
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase(),
    industry: p.industry || "Not set",
    bio: p.bio || p.description || "No bio yet.",
    location: p.location || "Not set",
    budgetRange: p.budget_range || "Not set",
    hiringFor: p.hiring_for ? p.hiring_for.split(",") : [],
    stats: {
      campaignsPosted: p.campaigns_count || 0,
    },
    platforms: p.platforms ? p.platforms.split(",") : [],
  });

  const mapEditData = (p) => ({
    company_name: p.company_name || p.name || "",
    industry: p.industry || "",
    description: p.description || "",
    location: p.location || "",
    budget_range: p.budget_range || "",
    hiring_for: p.hiring_for || "",
    platforms: p.platforms || "",
  });

  /* ── Fetch profile ── */
  useEffect(() => {
    api
      .get("/sponsor/profile")
      .then((res) => {
        const p = res.data.profile;
        setProfile(mapProfile(p));
        setEditData(mapEditData(p));
      })
      .catch((err) => {
        setError(err.response?.data?.error || err.message);
      })
      .finally(() => setLoading(false));

    api
      .get("/tokens/balance")
      .then((res) => setTokenBalance(res.data.balance || 0))
      .catch(() => {});
  }, []);

  /* ── Save profile ── */
  const handleSaveProfile = () => {
    setSaving(true);
    api
      .put("/sponsor/profile", editData)
      .then(() => {
        setIsEditing(false);
        setError("");
        // Refetch profile
        api.get("/sponsor/profile").then((res) => {
          const p = res.data.profile;
          setProfile(mapProfile(p));
        });
      })
      .catch((err) =>
        addToast(
          "Failed to save profile: " +
            (err.response?.data?.error || err.message),
          "error"
        )
      )
      .finally(() => setSaving(false));
  };

  /* ── Scroll reveal ── */
  useEffect(() => {
    if (!profile) return;
    const els = document.querySelectorAll(".reveal:not(.active)");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("active");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [profile, isEditing]);

  /* ── Profile completion estimate ── */
  const getProfileStrength = () => {
    if (!profile) return { pct: 0, label: "Incomplete" };
    let filled = 0;
    const fields = [
      profile.companyName !== "—",
      profile.industry !== "Not set",
      profile.bio !== "No bio yet.",
      profile.location !== "Not set",
      profile.budgetRange !== "Not set",
      profile.platforms.length > 0,
      profile.hiringFor.length > 0,
    ];
    fields.forEach((f) => f && filled++);
    const pct = Math.round((filled / fields.length) * 100);
    return {
      pct,
      label: pct >= 80 ? "Strong" : pct >= 50 ? "Good" : "Needs work",
    };
  };

  const strength = getProfileStrength();

  /* ── Loading / Error states ── */
  if (loading)
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#5157a1]/20 border-t-[#5157a1] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );

  if (error && !profile)
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh] flex-col gap-4">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-3xl">
            ⚠️
          </div>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-[#5157a1] text-white font-semibold hover:shadow-lg transition-all"
          >
            Retry
          </button>
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <div className="relative bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e7bdd3]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="reveal flex items-center gap-2 text-sm text-white/60 mb-8">
              <Link
                to="/sponsor/dashboard"
                className="hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <span>/</span>
              <span className="text-white">My Profile</span>
            </nav>

            {/* Profile header */}
            <div className="reveal flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-gradient-to-br from-[#c7eff9] to-[#e7bdd3] flex items-center justify-center text-4xl lg:text-5xl font-bold text-[#393873] shadow-2xl">
                  {profile.initials}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-emerald-500 border-4 border-[#393873] flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  {profile.companyName}
                </h1>
                <p className="text-white/60 mb-3">{profile.username}</p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-white/90 text-sm font-medium border border-white/20">
                    🏭 {profile.industry}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#c7eff9]/20 text-[#c7eff9] text-sm font-medium border border-[#c7eff9]/30 flex items-center gap-1">
                    📍 {profile.location}
                  </span>
                </div>

                {/* Stats row */}
                <div className="reveal delay-1 flex flex-wrap justify-center lg:justify-start gap-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 px-4 py-3 text-center min-w-[90px]">
                    <p className="text-2xl font-bold text-white mb-0.5">
                      {profile.stats.campaignsPosted}
                    </p>
                    <p className="text-xs text-white/60 flex items-center justify-center gap-1">
                      <span>📢</span>
                      Campaigns
                    </p>
                  </div>
                </div>
              </div>

              {/* Edit button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="reveal delay-2 px-6 py-3 rounded-xl bg-white text-[#5157a1] font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
              >
                <span>✏️</span>
                {isEditing ? "Close Editor" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ EDIT PROFILE FORM ═══════════════ */}
      {isEditing && (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-[#393873]/5 to-transparent">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#393873] flex items-center gap-2">
                <span>✏️</span> Edit Company Profile
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all"
              >
                ✕
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  label: "Company Name",
                  key: "company_name",
                  type: "text",
                  placeholder: "Your company name",
                },
                {
                  label: "Industry",
                  key: "industry",
                  type: "text",
                  placeholder: "e.g. Consumer Electronics",
                },
                {
                  label: "Location",
                  key: "location",
                  type: "text",
                  placeholder: "e.g. Bangalore, India",
                },
                {
                  label: "Budget Range",
                  key: "budget_range",
                  type: "text",
                  placeholder: "e.g. ₹50,000 – ₹5,00,000",
                },
                {
                  label: "Hiring For",
                  key: "hiring_for",
                  type: "text",
                  placeholder: "e.g. Tech Reviews,Reels",
                },
                {
                  label: "Platforms",
                  key: "platforms",
                  type: "text",
                  placeholder: "e.g. YouTube,Instagram",
                },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    value={editData[f.key] || ""}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        [f.key]: e.target.value,
                      })
                    }
                    placeholder={f.placeholder}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  About Company
                </label>
                <textarea
                  rows={3}
                  value={editData.description || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Tell creators about your company..."
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving…
                  </span>
                ) : (
                  "💾 Save Profile"
                )}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* ── Left column ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <div className="reveal bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center">
                      📝
                    </span>
                    About Company
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              {/* Campaign Preferences */}
              <div className="reveal delay-1 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center">
                    📋
                  </span>
                  Campaign Preferences
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      label: "Industry",
                      value: profile.industry,
                      icon: "🏭",
                    },
                    {
                      label: "Budget Range",
                      value: profile.budgetRange,
                      icon: "💰",
                    },
                    {
                      label: "Platforms",
                      value: profile.platforms.join(", ") || "—",
                      icon: "📱",
                    },
                    {
                      label: "Hiring For",
                      value: profile.hiringFor.join(", ") || "—",
                      icon: "🎯",
                    },
                  ].map((detail, i) => (
                    <div key={i} className="group">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                          {detail.icon}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            {detail.label}
                          </p>
                          <p className="font-semibold text-gray-900">
                            {detail.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Platforms */}
              {profile.platforms.length > 0 && (
                <div className="reveal delay-2 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center">
                      📱
                    </span>
                    Target Platforms
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {profile.platforms.map((p, i) => (
                      <div
                        key={i}
                        className="group bg-gray-50 rounded-xl p-4 hover:bg-gradient-to-r hover:from-[#5157a1]/5 hover:to-transparent transition-all duration-300 flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                          {p.trim().toLowerCase() === "youtube"
                            ? "🎬"
                            : p.trim().toLowerCase() === "instagram"
                            ? "📸"
                            : p.trim().toLowerCase() === "twitter"
                            ? "🐦"
                            : p.trim().toLowerCase() === "linkedin"
                            ? "💼"
                            : "📱"}
                        </div>
                        <span className="font-semibold text-gray-900 capitalize">
                          {p.trim()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Right column ── */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="reveal delay-1 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      label: "Post New Campaign",
                      icon: "✨",
                      link: "/sponsor/create-campaign",
                      color: "from-indigo-500 to-purple-500",
                    },
                    {
                      label: "My Campaigns",
                      icon: "📢",
                      link: "/sponsor/my-campaigns",
                      color: "from-blue-500 to-indigo-500",
                    },
                    {
                      label: "Browse Creators",
                      icon: "🔍",
                      link: "/sponsor/creators",
                      color: "from-emerald-500 to-teal-500",
                    },
                    {
                      label: "Dashboard",
                      icon: "📊",
                      link: "/sponsor/dashboard",
                      color: "from-amber-500 to-orange-500",
                    },
                  ].map((action, i) => (
                    <Link
                      key={i}
                      to={action.link}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-[#5157a1] hover:to-[#393873] transition-all duration-300"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-lg shadow-md`}
                      >
                        {action.icon}
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-white transition-colors">
                        {action.label}
                      </span>
                      <svg
                        className="w-5 h-5 ml-auto text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Verified badge */}
              <div className="reveal delay-2 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-800">
                      Verified Sponsor
                    </h3>
                    <p className="text-sm text-emerald-600">
                      Active Account
                    </p>
                  </div>
                </div>
                <p className="text-sm text-emerald-700">
                  Your sponsor profile is verified. Creators trust
                  verified sponsors more!
                </p>
              </div>

              {/* Token Balance */}
              <div className="reveal delay-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg">
                    🪙
                  </div>
                  <div>
                    <p className="text-sm text-amber-600">
                      Token Balance
                    </p>
                    <p className="text-2xl font-bold text-amber-800">
                      {tokenBalance}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/user/shop")}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                >
                  Buy More Tokens
                </button>
              </div>

              {/* Profile Strength */}
              <div className="reveal delay-3 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Profile Strength
                </h2>
                <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#5157a1] to-[#393873] rounded-full transition-all duration-500"
                    style={{ width: `${strength.pct}%` }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {strength.pct}% Complete
                  </p>
                  <span className="text-xs px-2 py-1 rounded-full bg-[#5157a1]/10 text-[#5157a1] font-medium">
                    {strength.label}
                  </span>
                </div>
                {strength.pct < 100 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-gray-500">
                      💡 Tips to improve:
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {profile.bio === "No bio yet." && (
                        <li className="flex items-center gap-2">
                          <span className="text-amber-500">○</span>
                          Add a company description
                        </li>
                      )}
                      {profile.platforms.length === 0 && (
                        <li className="flex items-center gap-2">
                          <span className="text-amber-500">○</span>
                          Add target platforms
                        </li>
                      )}
                      {profile.budgetRange === "Not set" && (
                        <li className="flex items-center gap-2">
                          <span className="text-amber-500">○</span>
                          Set your budget range
                        </li>
                      )}
                      {profile.hiringFor.length === 0 && (
                        <li className="flex items-center gap-2">
                          <span className="text-amber-500">○</span>
                          Specify what you're hiring for
                        </li>
                      )}
                    </ul>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-xs text-[#5157a1] font-medium hover:underline mt-2"
                    >
                      Complete your profile →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
