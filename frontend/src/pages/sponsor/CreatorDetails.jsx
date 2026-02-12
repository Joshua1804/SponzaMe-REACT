import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CreatorDetails() {
  const { id } = useParams();
  const [actionTaken, setActionTaken] = useState(null);

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
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const creator = {
    name: "John Creator",
    username: "@johncreator",
    initials: "JC",
    niche: "Technology",
    platforms: ["YouTube", "Instagram"],
    location: "Mumbai, India",
    followers: "125K",
    rating: 4.8,
    completionRate: "98%",
    pricing: "₹10,000 – ₹30,000",
    bio: "Tech content creator specializing in smartphone reviews, gadget unboxings, and honest long-term usage content.",
    skills: [
      "Smartphone Reviews",
      "Unboxing Videos",
      "Instagram Reels",
      "Brand Integrations",
    ],
    pastWork: [
      "Samsung Galaxy Campaign",
      "OnePlus Launch Promo",
      "Realme Review Series",
    ],
    appliedFor: "Smartphone Launch Promotion",
  };

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="reveal flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link to="/sponsor/applications" className="hover:text-white">
                Applications
              </Link>
              <span>→</span>
              <span className="text-white">{creator.name}</span>
            </div>

            {/* Header */}
            <div className="reveal flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#c7eff9] to-[#e7bdd3] flex items-center justify-center text-3xl font-bold text-[#393873]">
                {creator.initials}
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">
                  {creator.name}
                </h1>
                <p className="text-white/70">{creator.username}</p>
                <p className="text-white/60 text-sm mt-1">
                  📍 {creator.location} · 🎯 {creator.niche}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="reveal delay-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Followers", value: creator.followers, icon: "👥" },
              { label: "Rating", value: creator.rating, icon: "⭐" },
              { label: "Completion", value: creator.completionRate, icon: "✅" },
              { label: "Pricing", value: creator.pricing, icon: "💰" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 shadow border"
              >
                <div className="text-xl mb-2">{stat.icon}</div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            <div className="reveal bg-white rounded-3xl shadow border p-6">
              <h2 className="text-xl font-bold mb-3">📝 About Creator</h2>
              <p className="text-gray-600">{creator.bio}</p>
            </div>

            <div className="reveal delay-1 bg-white rounded-3xl shadow border p-6">
              <h2 className="text-xl font-bold mb-4">🎯 Skills</h2>
              <div className="flex flex-wrap gap-2">
                {creator.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-xl bg-[#5157a1]/10 text-[#393873] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal delay-2 bg-white rounded-3xl shadow border p-6">
              <h2 className="text-xl font-bold mb-4">📂 Past Collaborations</h2>
              <ul className="space-y-2">
                {creator.pastWork.map((work, i) => (
                  <li
                    key={i}
                    className="p-3 rounded-xl bg-gray-50 text-gray-700"
                  >
                    {work}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <div className="reveal delay-1 bg-white rounded-3xl shadow border p-6">
              <h3 className="font-bold mb-4">Campaign Applied For</h3>
              <p className="text-gray-700 font-medium">
                📢 {creator.appliedFor}
              </p>
            </div>

            <div className="reveal delay-2 bg-white rounded-3xl shadow border p-6">
              <h3 className="font-bold mb-4">Take Action</h3>

              {!actionTaken ? (
                <div className="space-y-3">
                  <button
                    onClick={() => setActionTaken("Accepted")}
                    className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold hover:shadow-lg"
                  >
                    ✅ Accept Creator
                  </button>
                  <button
                    onClick={() => setActionTaken("Shortlisted")}
                    className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold hover:shadow-lg"
                  >
                    ⭐ Shortlist
                  </button>
                  <button
                    onClick={() => setActionTaken("Rejected")}
                    className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:shadow-lg"
                  >
                    ❌ Reject
                  </button>
                </div>
              ) : (
                <div className="text-center text-sm text-gray-600">
                  Action Taken:
                  <span className="font-bold text-[#5157a1] ml-1">
                    {actionTaken}
                  </span>
                </div>
              )}
            </div>

            <div className="text-center text-xs text-gray-400">
              Creator ID: {id}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
