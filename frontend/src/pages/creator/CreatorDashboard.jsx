import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CreatorDashboard() {
  const [tokenBalance, setTokenBalance] = useState(0);

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

  // Animated token counter
  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const interval = duration / steps;
    const targetBalance = 120;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setTokenBalance(Math.floor(targetBalance * (step / steps)));
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const applications = [
    { campaign: "Tech Product Review", status: "Pending", budget: "₹15,000", statusColor: "yellow" },
    { campaign: "Gaming Accessories Promotion", status: "Accepted", budget: "₹25,000", statusColor: "green" },
    { campaign: "Mobile App Launch", status: "Rejected", budget: "₹10,000", statusColor: "red" },
  ];

  const quickStats = [
    { label: "Applications", value: "12", icon: "📋", color: "from-[#c7eff9] to-[#5157a1]/20" },
    { label: "Active Deals", value: "3", icon: "🤝", color: "from-[#e7bdd3] to-[#5157a1]/20" },
    { label: "Earnings", value: "₹45K", icon: "💰", color: "from-[#c7eff9] to-[#e7bdd3]" },
    { label: "Profile Views", value: "256", icon: "👁️", color: "from-[#5157a1]/20 to-[#c7eff9]" },
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
            <div className="reveal flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              {/* Welcome Section */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  <span className="text-sm font-medium text-white/90">Profile Active</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  Welcome back, <span className="bg-gradient-to-r from-[#c7eff9] to-[#e7bdd3] bg-clip-text text-transparent">John!</span>
                </h1>
                <p className="text-white/70 text-lg">
                  Manage your profile and track your sponsorship opportunities
                </p>
              </div>

              {/* Token Balance Card */}
              <div className="reveal delay-1 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 px-6 py-5 min-w-[200px]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg">
                    🪙
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Token Balance</p>
                    <p className="text-3xl font-bold text-white">{tokenBalance}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat, i) => (
              <div
                key={i}
                className={`reveal delay-${i + 1} group bg-white rounded-2xl p-5 shadow-lg shadow-gray-100/50 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl transition-transform group-hover:scale-110`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-[#393873]">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Profile Card */}
            <div className="reveal bg-white rounded-3xl shadow-lg shadow-gray-100/50 border border-gray-100 p-6 lg:p-8 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Profile Summary</h2>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Complete
                </span>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5157a1] to-[#393873] flex items-center justify-center text-3xl text-white shadow-lg">
                  👨‍🎨
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">John Creator</h3>
                  <p className="text-sm text-gray-500">Tech & Gadgets</p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-gray-600 flex items-center gap-2">
                    <span className="text-lg">📍</span> Location
                  </span>
                  <span className="font-medium text-gray-900">Mumbai, India</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-gray-600 flex items-center gap-2">
                    <span className="text-lg">👥</span> Followers
                  </span>
                  <span className="font-medium text-gray-900">50K+</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-gray-600 flex items-center gap-2">
                    <span className="text-lg">⭐</span> Rating
                  </span>
                  <span className="font-medium text-gray-900">4.8/5</span>
                </div>
              </div>

              <button className="w-full py-3 rounded-xl border-2 border-[#5157a1] text-[#5157a1] font-semibold transition-all duration-300 hover:bg-[#5157a1] hover:text-white">
                Edit Profile
              </button>
            </div>

            {/* Applications Card */}
            <div className="reveal delay-1 lg:col-span-2 bg-white rounded-3xl shadow-lg shadow-gray-100/50 border border-gray-100 p-6 lg:p-8 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Applied Campaigns</h2>
                <Link to="/creator/campaigns" className="text-sm font-medium text-[#5157a1] hover:underline">
                  View All →
                </Link>
              </div>

              {/* Applications Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Campaign</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Budget</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${i === 0 ? 'from-blue-100 to-blue-200' :
                                i === 1 ? 'from-purple-100 to-purple-200' :
                                  'from-pink-100 to-pink-200'
                              } flex items-center justify-center`}>
                              {i === 0 ? '📱' : i === 1 ? '🎮' : '📲'}
                            </div>
                            <span className="font-medium text-gray-900">{app.campaign}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${app.statusColor === 'yellow' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                              app.statusColor === 'green' ? 'bg-green-50 text-green-700 border border-green-200' :
                                'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${app.statusColor === 'yellow' ? 'bg-yellow-500' :
                                app.statusColor === 'green' ? 'bg-green-500' :
                                  'bg-red-500'
                              }`}></span>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-gray-900">{app.budget}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button className="text-[#5157a1] hover:text-[#393873] font-medium text-sm transition-colors">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Browse Campaigns", desc: "Find new opportunities", icon: "🔍", color: "from-[#c7eff9] to-[#5157a1]/30" },
              { title: "Update Portfolio", desc: "Showcase your work", icon: "🎨", color: "from-[#e7bdd3] to-[#5157a1]/30" },
              { title: "Messages", desc: "2 unread messages", icon: "💬", color: "from-[#5157a1]/20 to-[#c7eff9]" },
              { title: "Earnings", desc: "View payment history", icon: "💵", color: "from-[#c7eff9] to-[#e7bdd3]" },
            ].map((action, i) => (
              <button
                key={i}
                className={`reveal delay-${i + 1} group text-left bg-white rounded-2xl p-5 shadow-md shadow-gray-100/50 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#5157a1]/30`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110`}>
                  {action.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-500">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
