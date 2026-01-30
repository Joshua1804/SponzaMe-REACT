import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function BrowseCampaigns() {
  const [searchQuery, setSearchQuery] = useState("");

  // Scroll reveal animation
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const campaigns = [
    {
      title: "Smartphone Launch Promotion",
      sponsor: "TechCorp India",
      budget: "₹20,000",
      desc: "Looking for tech creators to promote our latest smartphone launch through reviews and posts.",
      link: "/creator/campaign/1",
      icon: "📱",
      tags: ["Technology", "Reviews"],
      deadline: "15 Feb 2026",
      applicants: 24,
    },
    {
      title: "Gaming Accessories Review",
      sponsor: "GameZone",
      budget: "₹30,000",
      desc: "Seeking gaming creators for accessory reviews and gameplay integrations.",
      link: "/creator/campaign/2",
      icon: "🎮",
      tags: ["Gaming", "YouTube"],
      deadline: "20 Feb 2026",
      applicants: 18,
    },
    {
      title: "Fitness App Promotion",
      sponsor: "FitLife",
      budget: "₹15,000",
      desc: "Looking for fitness influencers to promote our mobile app through reels and stories.",
      link: "/creator/campaign/3",
      icon: "💪",
      tags: ["Fitness", "Instagram"],
      deadline: "25 Feb 2026",
      applicants: 32,
    },
    {
      title: "Fashion Brand Collaboration",
      sponsor: "StyleHub",
      budget: "₹40,000",
      desc: "Premium fashion brand seeking style influencers for seasonal campaign collaboration.",
      link: "/creator/campaign/4",
      icon: "👗",
      tags: ["Fashion", "Lifestyle"],
      deadline: "28 Feb 2026",
      applicants: 45,
    },
    {
      title: "Food Delivery App Review",
      sponsor: "QuickBite",
      budget: "₹12,000",
      desc: "Looking for food bloggers to review and promote our new delivery app features.",
      link: "/creator/campaign/5",
      icon: "🍔",
      tags: ["Food", "Apps"],
      deadline: "10 Feb 2026",
      applicants: 28,
    },
    {
      title: "Travel Vlog Series",
      sponsor: "WanderLust Tours",
      budget: "₹50,000",
      desc: "Travel creators needed for an exclusive destination vlog series partnership.",
      link: "/creator/campaign/6",
      icon: "✈️",
      tags: ["Travel", "Vlogging"],
      deadline: "5 Mar 2026",
      applicants: 56,
    },
  ];

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
          <div className="max-w-7xl mx-auto">
            <div className="reveal text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                <span className="text-lg">🔍</span>
                <span className="text-sm font-medium text-white/90">Discover Opportunities</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Browse <span className="bg-gradient-to-r from-[#c7eff9] to-[#e7bdd3] bg-clip-text text-transparent">Campaigns</span>
              </h1>
              <p className="text-white/70 text-lg">
                Explore sponsorship opportunities that match your niche and start collaborating with top brands
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="reveal delay-1 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="md:col-span-2 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 focus:border-[#5157a1] transition-all"
                />
              </div>

              {/* Niche Filter */}
              <div className="relative">
                <select className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 focus:border-[#5157a1] transition-all cursor-pointer">
                  <option>All Niches</option>
                  <option>Technology</option>
                  <option>Gaming</option>
                  <option>Fashion</option>
                  <option>Fitness</option>
                  <option>Food</option>
                  <option>Travel</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Budget Filter */}
              <div className="relative">
                <select className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 focus:border-[#5157a1] transition-all cursor-pointer">
                  <option>All Budgets</option>
                  <option>Below ₹10,000</option>
                  <option>₹10,000 – ₹25,000</option>
                  <option>₹25,000 – ₹50,000</option>
                  <option>Above ₹50,000</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Quick Filter Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["All", "Technology", "Gaming", "Fashion", "Fitness", "Food", "Travel"].map((tag, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${i === 0
                      ? "bg-[#5157a1] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-[#5157a1]/10 hover:text-[#5157a1]"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{campaigns.length}</span> campaigns
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="text-sm font-medium text-[#5157a1] bg-transparent focus:outline-none cursor-pointer">
              <option>Most Recent</option>
              <option>Highest Budget</option>
              <option>Deadline</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign, i) => (
              <div
                key={i}
                className={`reveal delay-${(i % 3) + 1} group bg-white rounded-3xl border border-gray-100
                shadow-lg shadow-gray-100/50 p-6 flex flex-col transition-all duration-500
                hover:-translate-y-2 hover:shadow-xl hover:border-[#5157a1]/20`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c7eff9] to-[#5157a1]/20 flex items-center justify-center text-2xl transition-transform group-hover:scale-110">
                    {campaign.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#5157a1]">{campaign.budget}</p>
                    <p className="text-xs text-gray-500">Budget</p>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#5157a1] transition-colors">
                  {campaign.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                  <span>🏢</span> {campaign.sponsor}
                </p>

                <p className="text-gray-600 flex-1 leading-relaxed text-sm mb-4">
                  {campaign.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {campaign.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[#5157a1]/10 text-[#5157a1]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                  <span className="flex items-center gap-1">
                    <span>📅</span> {campaign.deadline}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>👥</span> {campaign.applicants} applicants
                  </span>
                </div>

                {/* Action */}
                <Link
                  to={campaign.link}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-semibold text-center transition-all duration-300 hover:shadow-lg hover:shadow-[#5157a1]/25 hover:scale-[1.02] active:scale-[0.98]"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="px-8 py-4 rounded-xl border-2 border-[#5157a1] text-[#5157a1] font-semibold transition-all duration-300 hover:bg-[#5157a1] hover:text-white">
              Load More Campaigns
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
