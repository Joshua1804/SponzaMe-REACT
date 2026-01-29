import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CreatorProfile() {
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
            <div className="reveal flex flex-col md:flex-row justify-between mb-8">
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-full bg-[#c7eff9]
                  flex items-center justify-center text-2xl font-bold text-[#5157a1]"
                >
                  JC
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#393873]">
                    John Creator
                  </h1>
                  <p className="text-gray-500">Tech & Gadgets</p>
                </div>
              </div>

              <button
                className="mt-4 md:mt-0 px-5 py-2 bg-[#5157a1]
                text-white rounded-lg transition hover:bg-[#393873]"
              >
                Edit Profile
              </button>
            </div>

            {/* BIO */}
            <div className="reveal delay-1 mb-8">
              <h2 className="text-lg font-semibold mb-2 text-[#393873]">
                About
              </h2>
              <p className="text-gray-600 leading-relaxed">
                I am a tech content creator specializing in smartphone reviews,
                gadget unboxings, and detailed explainers. I collaborate with
                brands to create authentic promotional content.
              </p>
            </div>

            {/* DETAILS */}
            <div className="reveal delay-2 grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold mb-1">Niche</h3>
                <p className="text-gray-600">Technology, Gadgets</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Pricing</h3>
                <p className="text-gray-600">₹10,000 – ₹30,000</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Platforms</h3>
                <p className="text-gray-600">YouTube, Instagram</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-gray-600">India</p>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="reveal delay-3">
              <h2 className="text-lg font-semibold mb-4 text-[#393873]">
                Social Media
              </h2>
              <div className="flex gap-4">
                {["YouTube", "Instagram", "Twitter"].map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="px-4 py-2 border border-[#e1e1eb]
                    rounded-lg transition hover:bg-[#c7eff9]"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
