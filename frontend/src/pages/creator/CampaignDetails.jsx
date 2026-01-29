import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CampaignDetails() {
  const { id } = useParams();

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
    <div className="pt-16 bg-white min-h-screen">
      <Navbar />

      <div className="bg-[#e1e1eb] px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div
            className="reveal bg-white rounded-2xl border border-[#e1e1eb]
            shadow-[0_14px_36px_rgba(0,0,0,0.07)] p-8"
          >
            {/* HEADER */}
            <div className="reveal mb-6">
              <h1 className="text-3xl font-bold text-[#393873] tracking-tight">
                Smartphone Launch Promotion
              </h1>
              <p className="text-gray-600">
                Sponsored by <span className="font-medium">TechCorp India</span>
              </p>
            </div>

            {/* META */}
            <div className="reveal delay-1 grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="text-lg font-semibold text-[#5157a1]">₹20,000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Niche</p>
                <p className="font-medium">Technology</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Platforms</p>
                <p className="font-medium">YouTube, Instagram</p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="reveal delay-2 mb-8">
              <h2 className="text-lg font-semibold mb-2 text-[#393873]">
                Campaign Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We are launching our latest smartphone and are looking for
                technology creators to produce reviews, unboxing videos, and
                social posts focusing on real-world usage.
              </p>
            </div>

            {/* REQUIREMENTS */}
            <div className="reveal delay-3 mb-8">
              <h2 className="text-lg font-semibold mb-2 text-[#393873]">
                Requirements
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Minimum 10k followers/subscribers</li>
                <li>1 YouTube video + 2 Instagram posts</li>
                <li>Delivery within 14 days</li>
              </ul>
            </div>

            {/* APPLY */}
            <div className="reveal delay-3 border-t pt-6 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">Application Cost</p>
                <p className="text-lg font-semibold text-[#5157a1]">
                  5 Tokens 🪙
                </p>
              </div>
              <button className="px-6 py-3 bg-[#5157a1] text-white rounded-lg transition hover:bg-[#393873]">
                Apply for Campaign
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-6">Campaign ID: {id}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
