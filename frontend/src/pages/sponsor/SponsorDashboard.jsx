import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Megaphone, Rocket, Users, Search, Coins, AlertTriangle, Building2, MapPin, DollarSign, Target, Smartphone, Mail, Sparkles } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../api";

export default function SponsorDashboard() {
  const [tokenBalance, setTokenBalance] = useState(0);
  const [campaigns, setCampaigns] = useState([]);
  const [dashData, setDashData] = useState({});
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  /* ── Page title ── */
  useEffect(() => { document.title = "Dashboard — SponzaMe"; }, []);

  /* ── Fetch dashboard data ── */
  useEffect(() => {
    api
      .get("/sponsor/dashboard")
      .then((res) => {
        const d = res.data;
        setTokenBalance(d.token_balance || 0);
        setDashData(d);
        setUserName(
          d.profile?.company_name || d.profile?.name || "Sponsor"
        );
        setCampaigns(
          (d.recent_campaigns || []).map((c) => ({
            id: c.campaign_id,
            title: c.title,
            status:
              c.status.charAt(0).toUpperCase() + c.status.slice(1),
            applicants: c.applicant_count || 0,
            statusColor:
              c.status === "active"
                ? "green"
                : c.status === "paused"
                ? "yellow"
                : "blue",
          }))
        );
      })
      .catch((err) => setError(err.response?.data?.error || "Failed to load dashboard."))
      .finally(() => setLoading(false));
  }, []);

  /* ── Scroll reveal ── */
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
  }, [loading]);

  const profile = dashData.profile || {};

  const quickStats = [
    {
      label: "Campaigns Posted",
      value: String(dashData.total_campaigns || 0),
      icon: <Megaphone size={24} />,
      gradient: "from-[#5157a1]/10 to-[#c7eff9]/30",
      link: "/sponsor/my-campaigns",
    },
    {
      label: "Active Campaigns",
      value: String(dashData.active_campaigns || 0),
      icon: <Rocket size={24} />,
      gradient: "from-[#e7bdd3]/30 to-[#5157a1]/10",
      link: "/sponsor/my-campaigns",
    },
    {
      label: "Total Applicants",
      value: String(dashData.total_applicants || 0),
      icon: <Users size={24} />,
      gradient: "from-[#c7eff9]/30 to-[#e7bdd3]/30",
      link: "/sponsor/my-campaigns",
    },
    {
      label: "Browse Creators",
      value: "→",
      icon: <Search size={24} />,
      gradient: "from-[#5157a1]/10 to-[#c7eff9]/20",
      link: "/sponsor/creators",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* ── Hero ── */}
      <div className="relative bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e7bdd3]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="reveal flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              {/* Welcome */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-sm font-medium text-white/90">
                    Sponsor Account Active
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-[#c7eff9] to-[#e7bdd3] bg-clip-text text-transparent">
                    {userName}!
                  </span>
                </h1>
                <p className="text-white/70 text-lg">
                  Manage your campaigns and connect with top creators
                </p>
              </div>

              {/* Token Balance */}
              <Link
                to="/user/tokens"
                className="reveal delay-1 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 px-6 py-5 min-w-[200px] hover:bg-white/20 hover:scale-[1.03] transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/20">
                    <Coins size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">
                      Token Balance
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {tokenBalance}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Error Banner ── */}
      {error && (
        <div className="w-full px-4 sm:px-6 lg:px-8 mt-4">
          <div className="max-w-7xl mx-auto p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3">
            <AlertTriangle size={20} />
            <p className="text-sm text-red-600 flex-1">{error}</p>
            <button onClick={() => window.location.reload()} className="text-sm text-red-500 font-medium hover:underline">Retry</button>
          </div>
        </div>
      )}

      {/* ── Quick Stats ── */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, i) => (
            <Link
              key={i}
              to={stat.link}
              className="reveal bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all group"
              style={{ animationDelay: `${(i + 1) * 80}ms` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-[#393873]">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Company Profile */}
          <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#393873]">
                Company Profile
              </h2>
              <Link
                to="/sponsor/profile"
                className="text-xs text-[#5157a1] hover:underline font-medium"
              >
                Edit →
              </Link>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5157a1] to-[#393873] flex items-center justify-center text-2xl text-white font-bold shadow-lg shadow-[#5157a1]/20">
                {profile.company_name?.charAt(0)?.toUpperCase() ||
                  "?"}
              </div>
              <div>
                <h3 className="font-bold text-[#393873]">
                  {profile.company_name || "Your Company"}
                </h3>
                <p className="text-sm text-gray-500">
                  {profile.industry || "Set your industry"}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {[
                {
                  icon: <MapPin size={16} />,
                  value: profile.location,
                  label: "Location",
                },
                {
                  icon: <DollarSign size={16} />,
                  value: profile.budget_range,
                  label: "Budget Range",
                },
                {
                  icon: <Target size={16} />,
                  value: profile.hiring_for,
                  label: "Hiring Focus",
                },
                {
                  icon: <Smartphone size={16} />,
                  value: profile.platforms,
                  label: "Platforms",
                },
                {
                  icon: <Mail size={16} />,
                  value: profile.email,
                  label: "Email",
                },
              ]
                .filter((item) => item.value)
                .map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50"
                  >
                    <span className="text-sm">{item.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wide text-gray-400">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-gray-700 truncate">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            <Link
              to="/sponsor/profile"
              className="block w-full py-3 rounded-xl border-2 border-[#5157a1] text-[#5157a1] font-semibold text-center hover:bg-[#5157a1] hover:text-white transition-all text-sm"
            >
              View Full Profile
            </Link>
          </div>

          {/* Campaigns Table */}
          <div className="reveal delay-1 lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-[#393873]">
                Recent Campaigns
              </h2>
              <Link
                to="/sponsor/my-campaigns"
                className="text-sm text-[#5157a1] hover:underline font-medium"
              >
                View All →
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 animate-pulse"
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-16 ml-auto" />
                    <div className="h-4 bg-gray-200 rounded w-12" />
                  </div>
                ))}
              </div>
            ) : campaigns.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#5157a1]/10 to-[#c7eff9]/30 flex items-center justify-center text-3xl mb-4">
                  <Megaphone size={28} />
                </div>
                <h3 className="font-bold text-[#393873] mb-2">
                  No campaigns yet
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Start by posting your first campaign!
                </p>
                <Link
                  to="/sponsor/create-campaign"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm"
                >
                  <Sparkles size={16} className="inline" /> Create Campaign
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {campaigns.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        c.statusColor === "green"
                          ? "bg-emerald-400"
                          : c.statusColor === "yellow"
                          ? "bg-amber-400"
                          : "bg-blue-400"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#393873] truncate">
                        {c.title}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border
                      ${
                        c.statusColor === "green"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : c.statusColor === "yellow"
                          ? "bg-amber-50 text-amber-600 border-amber-200"
                          : "bg-blue-50 text-blue-600 border-blue-200"
                      }`}
                    >
                      {c.status}
                    </span>
                    <div className="text-center min-w-[50px]">
                      <p className="font-bold text-[#5157a1]">
                        {c.applicants}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Apps
                      </p>
                    </div>
                    <Link
                      to={`/sponsor/applicants?campaign=${c.id}`}
                      className="text-[#5157a1] font-medium text-sm hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      View →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <div className="mt-8 max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Post Campaign",
              desc: "Create a new sponsorship campaign",
              icon: <Sparkles size={24} />,
              link: "/sponsor/create-campaign",
              gradient: "from-[#5157a1]/5 to-[#c7eff9]/20",
            },
            {
              title: "Browse Creators",
              desc: "Find the perfect creator match",
              icon: <Search size={24} />,
              link: "/sponsor/creators",
              gradient: "from-[#c7eff9]/20 to-[#e7bdd3]/20",
            },
            {
              title: "My Campaigns",
              desc: "View and manage your campaigns",
              icon: <Megaphone size={24} />,
              link: "/sponsor/my-campaigns",
              gradient: "from-[#e7bdd3]/20 to-[#5157a1]/5",
            },
            {
              title: "Buy Tokens",
              desc: "Purchase tokens to unlock features",
              icon: <Coins size={24} />,
              link: "/user/shop",
              gradient: "from-amber-50 to-orange-50",
            },
          ].map((a, i) => (
            <Link
              key={i}
              to={a.link}
              className={`reveal bg-gradient-to-br ${a.gradient} rounded-2xl p-5 border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all group`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">
                {a.icon}
              </div>
              <h3 className="font-bold text-[#393873]">{a.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{a.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
