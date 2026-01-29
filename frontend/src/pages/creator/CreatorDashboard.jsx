import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CreatorDashboard() {
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
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="reveal flex flex-col md:flex-row justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-[#393873]">
                Creator Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your profile and applications
              </p>
            </div>

            <div
              className="reveal delay-1 mt-4 md:mt-0 bg-white rounded-2xl border border-[#e1e1eb]
              shadow-[0_10px_28px_rgba(0,0,0,0.06)] px-6 py-4"
            >
              <p className="text-sm text-gray-500">Token Balance</p>
              <p className="text-2xl font-bold text-[#5157a1]">120 🪙</p>
            </div>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* PROFILE */}
            <div
              className="reveal bg-white rounded-2xl border border-[#e1e1eb]
              shadow-[0_12px_32px_rgba(0,0,0,0.06)] p-6"
            >
              <h2 className="text-lg font-semibold mb-4 text-[#393873]">
                Profile Summary
              </h2>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Name:</strong> John Creator
                </p>
                <p>
                  <strong>Niche:</strong> Tech & Gadgets
                </p>
                <p>
                  <strong>Status:</strong> Profile Complete
                </p>
              </div>
              <button
                className="mt-4 w-full border border-[#5157a1] text-[#5157a1]
                py-2 rounded-lg transition hover:bg-[#c7eff9]"
              >
                Edit Profile
              </button>
            </div>

            {/* APPLICATIONS */}
            <div
              className="reveal delay-1 md:col-span-2 bg-white rounded-2xl border border-[#e1e1eb]
              shadow-[0_12px_32px_rgba(0,0,0,0.06)] p-6"
            >
              <h2 className="text-lg font-semibold mb-4 text-[#393873]">
                Applied Campaigns
              </h2>

              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-gray-500 text-sm">
                    <th className="py-2">Campaign</th>
                    <th>Status</th>
                    <th>Budget</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">Tech Product Review</td>
                    <td>
                      <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                        Pending
                      </span>
                    </td>
                    <td>₹15,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Gaming Accessories Promotion</td>
                    <td>
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                        Accepted
                      </span>
                    </td>
                    <td>₹25,000</td>
                  </tr>
                  <tr>
                    <td className="py-3">Mobile App Launch</td>
                    <td>
                      <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                        Rejected
                      </span>
                    </td>
                    <td>₹10,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
