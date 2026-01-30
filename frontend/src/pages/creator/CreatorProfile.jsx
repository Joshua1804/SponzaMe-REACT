import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CreatorProfile() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock profile data
  const profile = {
    name: "John Creator",
    username: "@johncreator",
    initials: "JC",
    niche: "Tech & Gadgets",
    bio: "I am a tech content creator specializing in smartphone reviews, gadget unboxings, and detailed explainers. I collaborate with brands to create authentic promotional content that resonates with my audience.",
    location: "Mumbai, India",
    pricing: "₹10,000 – ₹30,000",
    platforms: ["YouTube", "Instagram", "Twitter"],
    niches: ["Technology", "Gadgets", "Reviews"],
    stats: {
      followers: "125K",
      campaigns: 24,
      rating: 4.8,
      completionRate: "98%",
    },
    social: {
      youtube: { url: "#", followers: "85K", icon: "📺" },
      instagram: { url: "#", followers: "32K", icon: "📷" },
      twitter: { url: "#", followers: "8K", icon: "🐦" },
    },
  };

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("active");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Header with Profile */}
      <div className="relative bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e7bdd3]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="reveal flex items-center gap-2 text-sm text-white/60 mb-8">
              <Link to="/creator/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <span>/</span>
              <span className="text-white">My Profile</span>
            </nav>

            {/* Profile Header */}
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

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  {profile.name}
                </h1>
                <p className="text-white/60 mb-3">{profile.username}</p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                  {profile.niches.map((niche, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-white/90 text-sm font-medium border border-white/20"
                    >
                      {niche}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-full bg-[#c7eff9]/20 text-[#c7eff9] text-sm font-medium border border-[#c7eff9]/30 flex items-center gap-1">
                    📍 {profile.location}
                  </span>
                </div>

                {/* Stats Row */}
                <div className="reveal delay-1 flex flex-wrap justify-center lg:justify-start gap-4">
                  {[
                    { label: "Followers", value: profile.stats.followers, icon: "👥" },
                    { label: "Campaigns", value: profile.stats.campaigns, icon: "🎯" },
                    { label: "Rating", value: profile.stats.rating, icon: "⭐" },
                    { label: "Completion", value: profile.stats.completionRate, icon: "✅" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 px-4 py-3 text-center min-w-[90px]">
                      <p className="text-2xl font-bold text-white mb-0.5">{stat.value}</p>
                      <p className="text-xs text-white/60 flex items-center justify-center gap-1">
                        <span>{stat.icon}</span>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="reveal delay-2 px-6 py-3 rounded-xl bg-white text-[#5157a1] font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
              >
                <span>✏️</span>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - About & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Card */}
              <div className="reveal bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center">
                      📝
                    </span>
                    About Me
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              {/* Details Grid */}
              <div className="reveal delay-1 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center">
                    📋
                  </span>
                  Profile Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { label: "Niche", value: profile.niches.join(", "), icon: "🎯" },
                    { label: "Pricing Range", value: profile.pricing, icon: "💰" },
                    { label: "Platforms", value: profile.platforms.join(", "), icon: "📱" },
                    { label: "Location", value: profile.location, icon: "📍" },
                  ].map((detail, i) => (
                    <div key={i} className="group">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                          {detail.icon}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">{detail.label}</p>
                          <p className="font-semibold text-gray-900">{detail.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platforms Performance */}
              <div className="reveal delay-2 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center">
                    📊
                  </span>
                  Platform Performance
                </h2>
                <div className="space-y-4">
                  {Object.entries(profile.social).map(([platform, data], i) => (
                    <div key={i} className="group bg-gray-50 rounded-xl p-4 hover:bg-gradient-to-r hover:from-[#5157a1]/5 hover:to-transparent transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                            {data.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 capitalize">{platform}</p>
                            <p className="text-sm text-gray-500">{data.followers} followers</p>
                          </div>
                        </div>
                        <a
                          href={data.url}
                          className="px-4 py-2 rounded-lg bg-[#5157a1]/10 text-[#5157a1] font-medium text-sm hover:bg-[#5157a1] hover:text-white transition-all duration-300"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions & Stats */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="reveal delay-1 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  {[
                    { label: "Browse Campaigns", icon: "🔍", link: "/creator/browse", color: "from-blue-500 to-indigo-500" },
                    { label: "My Applications", icon: "📄", link: "/creator/applications", color: "from-purple-500 to-pink-500" },
                    { label: "Dashboard", icon: "📊", link: "/creator/dashboard", color: "from-emerald-500 to-teal-500" },
                    { label: "Settings", icon: "⚙️", link: "#", color: "from-gray-500 to-gray-600" },
                  ].map((action, i) => (
                    <Link
                      key={i}
                      to={action.link}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-[#5157a1] hover:to-[#393873] transition-all duration-300"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-lg shadow-md`}>
                        {action.icon}
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-white transition-colors">
                        {action.label}
                      </span>
                      <svg className="w-5 h-5 ml-auto text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Verification Badge */}
              <div className="reveal delay-2 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-800">Verified Creator</h3>
                    <p className="text-sm text-emerald-600">Since Jan 2024</p>
                  </div>
                </div>
                <p className="text-sm text-emerald-700">
                  Your profile is verified. Sponsors trust verified creators more!
                </p>
              </div>

              {/* Token Balance */}
              <div className="reveal delay-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg">
                    🪙
                  </div>
                  <div>
                    <p className="text-sm text-amber-600">Token Balance</p>
                    <p className="text-2xl font-bold text-amber-800">45</p>
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:shadow-lg transition-all duration-300">
                  Buy More Tokens
                </button>
              </div>

              {/* Profile Completion */}
              <div className="reveal delay-3 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Profile Strength</h2>
                <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#5157a1] to-[#393873] rounded-full transition-all duration-500"
                    style={{ width: "85%" }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">85% Complete</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-[#5157a1]/10 text-[#5157a1] font-medium">
                    Strong
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-gray-500">💡 Tips to improve:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">○</span>
                      Add portfolio samples
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-500">○</span>
                      Link more social accounts
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
