import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SponsorDashboard() {
  const [tokenBalance, setTokenBalance] = useState(0);

  // Scroll reveal animation
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

  // Animated token counter
  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const interval = duration / steps;
    const targetBalance = 80;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setTokenBalance(Math.floor(targetBalance * (step / steps)));
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const campaigns = [
    { id: 1, title: "Smartphone Launch", status: "Active", applicants: 24, statusColor: "green" },
    { id: 2, title: "Gaming Accessories Promo", status: "Draft", applicants: 0, statusColor: "yellow" },
    { id: 3, title: "Fitness App Campaign", status: "Completed", applicants: 42, statusColor: "blue" },
  ];

  const quickStats = [
    { label: "Campaigns Posted", value: "6", icon: "📢", color: "from-[#c7eff9] to-[#5157a1]/20", link: "/sponsor/campaigns" },
    { label: "Active Campaigns", value: "3", icon: "🚀", color: "from-[#e7bdd3] to-[#5157a1]/20", link: "/sponsor/campaigns?filter=active" },
    { label: "Total Spend", value: "₹1.2L", icon: "💰", color: "from-[#c7eff9] to-[#e7bdd3]", link: "#" },
    { label: "Creators Shortlisted", value: "18", icon: "⭐", color: "from-[#5157a1]/20 to-[#c7eff9]", link: "/sponsor/creators" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="reveal flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

              {/* Welcome */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  <span className="text-sm font-medium text-white/90">
                    Sponsor Account Active
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-[#c7eff9] to-[#e7bdd3] bg-clip-text text-transparent">
                    BrandX!
                  </span>
                </h1>
                <p className="text-white/70 text-lg">
                  Manage your campaigns and connect with top creators
                </p>
              </div>

              {/* Token Balance */}
              <Link
                to="/user/shop"
                className="reveal delay-1 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 px-6 py-5 min-w-[200px] hover:bg-white/20 hover:scale-105 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl">
                    🪙
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Token Balance</p>
                    <p className="text-3xl font-bold text-white">{tokenBalance}</p>
                  </div>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, i) => (
            <Link
              key={i}
              to={stat.link}
              className={`reveal delay-${i + 1} bg-white rounded-2xl p-5 shadow-lg  hover:-translate-y-1 transition-all`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#393873]">{stat.value}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">

          {/* Company Profile */}
          <div className="reveal bg-white rounded-3xl shadow-lg  p-6">
            <h2 className="text-xl font-bold mb-6">Company Profile</h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5157a1] to-[#393873] flex items-center justify-center text-3xl text-white">
                🏢
              </div>
              <div>
                <h3 className="font-semibold">BrandX Pvt Ltd</h3>
                <p className="text-sm text-gray-500">Technology</p>
              </div>
            </div>

            <Link
              to="/sponsor/profile"
              className="block w-full py-3 rounded-xl border-2 border-[#5157a1] text-[#5157a1] font-semibold text-center hover:bg-[#5157a1] hover:text-white"
            >
              View Profile
            </Link>
          </div>

          {/* Campaigns Table */}
          <div className="reveal delay-1 lg:col-span-2 bg-white rounded-3xl shadow-lg  p-6">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">My Campaigns</h2>
              <Link to="/sponsor/campaigns" className="text-sm text-[#5157a1] hover:underline">
                View All →
              </Link>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Campaign</th>
                  <th>Status</th>
                  <th>Applicants</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-4">{c.title}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        c.statusColor === "green" ? "bg-green-100 text-green-700" :
                        c.statusColor === "yellow" ? "bg-yellow-100 text-yellow-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td>{c.applicants}</td>
                    <td className="text-right">
                      <Link
                        to={`/sponsor/campaign/${c.id}/applicants`}
                        className="text-[#5157a1] font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Post Campaign", icon: "➕", link: "/sponsor/campaigns/new" },
            { title: "Browse Creators", icon: "🔍", link: "/sponsor/creators" },
            { title: "My Campaigns", icon: "📢", link: "/sponsor/campaigns" },
            { title: "Buy Tokens", icon: "🛒", link: "/user/shop" },
          ].map((a, i) => (
            <Link
              key={i}
              to={a.link}
              className="reveal bg-white rounded-2xl p-5 shadow  hover:-translate-y-1 transition-all"
            >
              <div className="text-2xl mb-3">{a.icon}</div>
              <h3 className="font-semibold">{a.title}</h3>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
