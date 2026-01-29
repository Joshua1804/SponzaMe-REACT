import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function BrowseCampaigns() {
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

  return (
    <div className="pt-16 bg-white min-h-screen">
      <Navbar />

      <div className="bg-[#e1e1eb] px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="reveal mb-10">
            <h1 className="text-3xl font-bold text-[#393873] tracking-tight">
              Browse Campaigns
            </h1>
            <p className="text-gray-600">
              Explore sponsorship opportunities that match your niche
            </p>
          </div>

          {/* FILTER BAR */}
          <div
            className="reveal delay-1 bg-white rounded-2xl border border-[#e1e1eb]
            shadow-[0_10px_30px_rgba(0,0,0,0.05)]
            p-6 mb-10 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c7eff9]">
              <option>All Niches</option>
              <option>Technology</option>
              <option>Gaming</option>
              <option>Fashion</option>
              <option>Fitness</option>
            </select>

            <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c7eff9]">
              <option>All Budgets</option>
              <option>Below ₹10,000</option>
              <option>₹10,000 – ₹25,000</option>
              <option>Above ₹25,000</option>
            </select>

            <button className="bg-[#5157a1] text-white rounded-lg px-4 py-2 font-medium transition hover:bg-[#393873]">
              Apply Filters
            </button>
          </div>

          {/* CAMPAIGN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Smartphone Launch Promotion",
                sponsor: "TechCorp India",
                budget: "₹20,000",
                desc: "Looking for tech creators to promote our latest smartphone launch through reviews and posts.",
                link: "/creator/campaign/1",
              },
              {
                title: "Gaming Accessories Review",
                sponsor: "GameZone",
                budget: "₹30,000",
                desc: "Seeking gaming creators for accessory reviews and gameplay integrations.",
                link: "/creator/campaign/2",
              },
              {
                title: "Fitness App Promotion",
                sponsor: "FitLife",
                budget: "₹15,000",
                desc: "Looking for fitness influencers to promote our mobile app through reels and stories.",
                link: "/creator/campaign/3",
              },
            ].map((campaign, i) => (
              <div
                key={i}
                className={`reveal delay-${i + 1} bg-white rounded-2xl border border-[#e1e1eb]
                shadow-[0_12px_32px_rgba(0,0,0,0.06)]
                p-6 flex flex-col transition-all duration-300
                hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(81,87,161,0.25)]`}
              >
                <h3 className="text-lg font-semibold text-[#393873] mb-1">
                  {campaign.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{campaign.sponsor}</p>

                <p className="text-gray-600 flex-1 leading-relaxed">
                  {campaign.desc}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold text-[#5157a1]">
                    {campaign.budget}
                  </span>
                  <Link
                    to={campaign.link}
                    className="text-sm font-medium text-[#5157a1] hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
