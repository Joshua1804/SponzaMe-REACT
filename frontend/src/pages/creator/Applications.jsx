import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Applications() {
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
              My Applications
            </h1>
            <p className="text-gray-600">
              Track the status of your campaign applications
            </p>
          </div>

          {/* TABLE CARD */}
          <div
            className="reveal delay-1 bg-white rounded-2xl border border-[#e1e1eb]
            shadow-[0_12px_32px_rgba(0,0,0,0.06)]
            p-6 overflow-x-auto"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-500 text-sm">
                  <th className="py-3">Campaign</th>
                  <th>Sponsor</th>
                  <th>Status</th>
                  <th>Budget</th>
                  <th>Contact</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-4">Smartphone Launch Promotion</td>
                  <td>TechCorp India</td>
                  <td>
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                      Pending
                    </span>
                  </td>
                  <td>₹20,000</td>
                  <td className="text-gray-400">Locked</td>
                </tr>

                <tr className="border-b">
                  <td className="py-4">Gaming Accessories Review</td>
                  <td>GameZone</td>
                  <td>
                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                      Accepted
                    </span>
                  </td>
                  <td>₹30,000</td>
                  <td className="text-[#5157a1] hover:underline cursor-pointer">
                    View Contact (5 🪙)
                  </td>
                </tr>

                <tr>
                  <td className="py-4">Fitness App Promotion</td>
                  <td>FitLife</td>
                  <td>
                    <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                      Rejected
                    </span>
                  </td>
                  <td>₹15,000</td>
                  <td className="text-gray-400">Locked</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
