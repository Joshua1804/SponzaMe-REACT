import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SponsorProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const profile = {
    companyName: "TechNova Pvt Ltd",
    username: "@technova",
    initials: "TN",
    industry: "Consumer Electronics",
    bio: "TechNova is a leading consumer electronics brand focused on innovative smart devices. We collaborate with content creators to promote authentic and impactful marketing campaigns.",
    location: "Bangalore, India",
    budgetRange: "₹50,000 – ₹5,00,000",
    hiringFor: ["Tech Reviews", "Product Launches", "Short-form Reels"],
    stats: {
      campaignsPosted: 18,
      creatorsHired: 42,
      rating: 4.6,
      completionRate: "96%",
    },
    platforms: ["YouTube", "Instagram"],
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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/user/shop');
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="reveal flex items-center gap-2 text-sm text-white/60 mb-8">
              <Link to="/sponsor/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <span>/</span>
              <span className="text-white">My Profile</span>
            </nav>

            {/* Header */}
            <div className="reveal flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Logo / Avatar */}
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-gradient-to-br from-[#c7eff9] to-[#e7bdd3] flex items-center justify-center text-4xl lg:text-5xl font-bold text-[#393873] shadow-2xl">
                {profile.initials}
              </div>

              {/* Info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  {profile.companyName}
                </h1>
                <p className="text-white/60 mb-3">{profile.username}</p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white text-sm">
                    🏭 {profile.industry}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#c7eff9]/20 text-[#c7eff9] text-sm">
                    📍 {profile.location}
                  </span>
                </div>

                {/* Stats */}
                <div className="reveal delay-1 flex flex-wrap justify-center lg:justify-start gap-4">
                  {[
                    { label: "Campaigns", value: profile.stats.campaignsPosted, icon: "📢" },
                    { label: "Creators Hired", value: profile.stats.creatorsHired, icon: "🤝" },
                    { label: "Rating", value: profile.stats.rating, icon: "⭐" },
                    { label: "Completion", value: profile.stats.completionRate, icon: "✅" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 px-4 py-3 text-center min-w-[100px]"
                    >
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-white/60 flex items-center justify-center gap-1">
                        {stat.icon} {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edit */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="reveal delay-2 px-6 py-3 rounded-xl bg-white text-[#5157a1] font-semibold shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                ✏️ Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="reveal bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                📝 About Company
              </h2>
              <p className="text-gray-600">{profile.bio}</p>
            </div>

            {/* Details */}
            <div className="reveal delay-1 bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                📋 Campaign Preferences
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: "Industry", value: profile.industry, icon: "🏭" },
                  { label: "Budget Range", value: profile.budgetRange, icon: "💰" },
                  { label: "Platforms", value: profile.platforms.join(", "), icon: "📱" },
                  { label: "Hiring For", value: profile.hiringFor.join(", "), icon: "🎯" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="reveal delay-1 bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
              {[
                { label: "Post New Campaign", link: "/sponsor/create-campaign", icon: "➕" },
                { label: "My Campaigns", link: "/sponsor/my-campaigns", icon: "📢" },
                { label: "Applications", link: "/sponsor/applicants", icon: "📄" },
                { label: "Dashboard", link: "/sponsor/dashboard", icon: "📊" },
              ].map((a, i) => (
                <Link
                  key={i}
                  to={a.link}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#5157a1] hover:text-white transition-all"
                >
                  <span className="text-lg">{a.icon}</span>
                  <span className="font-medium">{a.label}</span>
                </Link>
              ))}
            </div>

            {/* Tokens */}
            <div className="reveal delay-2 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6">
              <p className="text-sm text-amber-600">Token Balance</p>
              <p className="text-2xl font-bold text-amber-800 mb-4">32</p>

              <button onClick={handleClick} className="w-full py-2 rounded-xl
                bg-gradient-to-r from-amber-500 to-orange-500
                text-white font-medium cursor-pointer
                transition-all duration-200 ease-in-out
                hover:from-amber-600 hover:to-orange-600
                hover:shadow-lg hover:-translate-y-0.5
                active:scale-95 active:shadow-md active:translate-y-0
              ">
                Buy More Tokens
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
