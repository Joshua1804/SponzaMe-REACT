import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function BrowseCreators() {
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
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const creators = [
    {
      name: "Aarav Sharma",
      niche: "Technology",
      followers: "120K",
      desc: "Tech reviewer specializing in smartphones, gadgets, and YouTube reviews.",
      link: "/sponsor/creator/1",
      icon: "👤",
      platforms: ["YouTube", "Instagram"],
      engagement: "4.8%",
      location: "India",
    },
    {
      name: "Riya Kapoor",
      niche: "Fashion",
      followers: "95K",
      desc: "Lifestyle and fashion influencer focusing on reels and brand styling.",
      link: "/sponsor/creator/2",
      icon: "👤",
      platforms: ["Instagram"],
      engagement: "5.2%",
      location: "Mumbai",
    },
    {
      name: "Kunal Mehta",
      niche: "Gaming",
      followers: "210K",
      desc: "Gaming creator posting gameplay, live streams, and product integrations.",
      link: "/sponsor/creator/3",
      icon: "👤",
      platforms: ["YouTube", "Twitch"],
      engagement: "6.1%",
      location: "Delhi",
    },
    {
      name: "Sneha Verma",
      niche: "Fitness",
      followers: "80K",
      desc: "Certified fitness coach creating workout reels and wellness content.",
      link: "/sponsor/creator/4",
      icon: "👤",
      platforms: ["Instagram"],
      engagement: "5.6%",
      location: "Bangalore",
    },
    {
      name: "Rahul Joshi",
      niche: "Food",
      followers: "150K",
      desc: "Food blogger sharing restaurant reviews and recipe reels.",
      link: "/sponsor/creator/5",
      icon: "👤",
      platforms: ["Instagram", "YouTube"],
      engagement: "4.9%",
      location: "Pune",
    },
    {
      name: "Ananya Singh",
      niche: "Travel",
      followers: "300K",
      desc: "Travel vlogger collaborating with tourism boards and hotels.",
      link: "/sponsor/creator/6",
      icon: "👤",
      platforms: ["YouTube", "Instagram"],
      engagement: "6.4%",
      location: "India",
    },
  ];

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto text-center reveal max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <span className="text-lg">🤝</span>
              <span className="text-sm font-medium text-white/90">
                Find the Right Talent
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Browse{" "}
              <span className="bg-gradient-to-r from-[#c7eff9] to-[#e7bdd3] bg-clip-text text-transparent">
                Creators
              </span>
            </h1>
            <p className="text-white/70 text-lg">
              Discover content creators that align with your brand and campaign
              goals
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="reveal bg-white rounded-2xl shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Search creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="md:col-span-2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#5157a1]/20"
              />

              <select className="px-4 py-3 rounded-xl border border-gray-200">
                <option>All Niches</option>
                <option>Technology</option>
                <option>Fashion</option>
                <option>Gaming</option>
                <option>Fitness</option>
                <option>Food</option>
                <option>Travel</option>
              </select>

              <select className="px-4 py-3 rounded-xl border border-gray-200">
                <option>All Platforms</option>
                <option>Instagram</option>
                <option>YouTube</option>
                <option>Twitch</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Creator Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator, i) => (
            <div
              key={i}
              className="reveal group bg-white rounded-3xl  shadow p-6 hover:-translate-y-2 transition-all"
            >
              <div className="flex justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#5157a1]/10 flex items-center justify-center text-2xl">
                  {creator.icon}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#5157a1]">
                    {creator.followers}
                  </p>
                  <p className="text-xs text-gray-500">Followers</p>
                </div>
              </div>

              <h3 className="font-bold text-lg">{creator.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{creator.niche}</p>

              <p className="text-sm text-gray-600 mb-4">{creator.desc}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {creator.platforms.map((p, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs bg-[#5157a1]/10 text-[#5157a1]"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>📍 {creator.location}</span>
                <span>🔥 {creator.engagement} Engagement</span>
              </div>

              <Link
                to={creator.link}
                className="block text-center py-3 rounded-xl bg-[#5157a1] text-white font-semibold hover:bg-[#393873]"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
