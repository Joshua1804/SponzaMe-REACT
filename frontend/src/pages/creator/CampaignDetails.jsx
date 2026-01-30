import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CampaignDetails() {
  const { id } = useParams();
  const [isApplying, setIsApplying] = useState(false);

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

  const campaign = {
    title: "Smartphone Launch Promotion",
    sponsor: "TechCorp India",
    budget: "₹20,000",
    niche: "Technology",
    platforms: ["YouTube", "Instagram"],
    deadline: "15 Feb 2026",
    applicants: 24,
    tokenCost: 5,
    description: "We are launching our latest smartphone and are looking for technology creators to produce reviews, unboxing videos, and social posts focusing on real-world usage. The ideal creator should have experience in tech reviews and a genuine passion for mobile technology.",
    requirements: [
      "Minimum 10k followers/subscribers",
      "1 YouTube video (minimum 5 minutes)",
      "2 Instagram posts with stories",
      "Delivery within 14 days",
      "Original, authentic content only",
    ],
    deliverables: [
      "Full product review video",
      "Unboxing content",
      "2 Instagram feed posts",
      "Story highlights",
    ],
    icon: "📱",
  };

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="reveal flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link to="/creator/campaigns" className="hover:text-white transition-colors">
                Campaigns
              </Link>
              <span>→</span>
              <span className="text-white">{campaign.title}</span>
            </div>

            <div className="reveal flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-3xl">
                  {campaign.icon}
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    {campaign.title}
                  </h1>
                  <p className="text-white/70 flex items-center gap-2">
                    <span>🏢</span> Sponsored by <span className="font-medium text-white">{campaign.sponsor}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-sm font-medium border border-green-500/30">
                  ✓ Open for Applications
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meta Stats Cards */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="reveal delay-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Budget", value: campaign.budget, icon: "💰", color: "from-green-100 to-green-200" },
              { label: "Niche", value: campaign.niche, icon: "🎯", color: "from-blue-100 to-blue-200" },
              { label: "Deadline", value: campaign.deadline, icon: "📅", color: "from-purple-100 to-purple-200" },
              { label: "Applicants", value: `${campaign.applicants} creators`, icon: "👥", color: "from-pink-100 to-pink-200" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-100/50 border border-gray-100"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl mb-3`}>
                  {stat.icon}
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="reveal bg-white rounded-3xl shadow-lg shadow-gray-100/50 border border-gray-100 p-6 lg:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[#5157a1]/10 flex items-center justify-center text-sm">📝</span>
                  Campaign Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {campaign.description}
                </p>
              </div>

              {/* Requirements */}
              <div className="reveal delay-1 bg-white rounded-3xl shadow-lg shadow-gray-100/50 border border-gray-100 p-6 lg:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[#5157a1]/10 flex items-center justify-center text-sm">✅</span>
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {campaign.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div className="reveal delay-2 bg-white rounded-3xl shadow-lg shadow-gray-100/50 border border-gray-100 p-6 lg:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[#5157a1]/10 flex items-center justify-center text-sm">📦</span>
                  Deliverables
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {campaign.deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                      <span className="w-8 h-8 rounded-lg bg-[#c7eff9] flex items-center justify-center text-sm">
                        {i + 1}
                      </span>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platforms */}
              <div className="reveal delay-2 bg-white rounded-3xl shadow-lg shadow-gray-100/50 border border-gray-100 p-6 lg:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[#5157a1]/10 flex items-center justify-center text-sm">📱</span>
                  Platforms
                </h2>
                <div className="flex flex-wrap gap-3">
                  {campaign.platforms.map((platform, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#5157a1]/10 to-[#c7eff9]/30 text-[#393873] font-medium"
                    >
                      {platform === "YouTube" ? "📺" : "📸"} {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Apply Card */}
            <div className="space-y-6">
              {/* Apply Card */}
              <div className="reveal delay-1 bg-white rounded-3xl shadow-lg shadow-gray-100/50 border border-gray-100 p-6">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-[#5157a1] mb-1">{campaign.budget}</p>
                  <p className="text-sm text-gray-500">Campaign Budget</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <span className="text-gray-600">Application Cost</span>
                    <span className="font-bold text-[#5157a1] flex items-center gap-1">
                      {campaign.tokenCost} 🪙
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <span className="text-gray-600">Your Balance</span>
                    <span className="font-bold text-gray-900">120 🪙</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsApplying(true)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#5157a1]/25 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Apply for Campaign
                </button>

                <p className="text-xs text-gray-400 text-center mt-4">
                  By applying, you agree to the campaign terms
                </p>
              </div>

              {/* Sponsor Card */}
              <div className="reveal delay-2 bg-white rounded-3xl shadow-lg shadow-gray-100/50 border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">About the Sponsor</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5157a1] to-[#393873] flex items-center justify-center text-xl text-white">
                    🏢
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{campaign.sponsor}</p>
                    <p className="text-sm text-gray-500">Technology Company</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>⭐</span> 4.8 Rating
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📋</span> 12 Campaigns Posted
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>✅</span> Verified Sponsor
                  </div>
                </div>
              </div>

              {/* Campaign ID */}
              <div className="text-center">
                <p className="text-xs text-gray-400">Campaign ID: {id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {isApplying && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c7eff9] to-[#5157a1]/20 flex items-center justify-center text-3xl mx-auto mb-4">
                🎉
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirm Application</h3>
              <p className="text-gray-600">
                You're about to apply for <strong>{campaign.title}</strong>
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Application Cost</span>
                <span className="font-bold text-[#5157a1]">{campaign.tokenCost} 🪙</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Remaining Balance</span>
                <span className="font-bold text-gray-900">{120 - campaign.tokenCost} 🪙</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsApplying(false)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsApplying(false);
                  alert("Application submitted successfully!");
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-semibold transition-all duration-300 hover:shadow-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
