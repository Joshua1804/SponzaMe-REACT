import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../api";

export default function Applications() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/creator/applications")
      .then(res => {
        setApplications((res.data.applications || []).map(a => ({
          id: a.application_id,
          campaign: a.campaign_title,
          sponsor: a.sponsor_name || "—",
          sponsorLogo: "📢",
          status: a.status,
          budget: a.budget ? `₹${Number(a.budget).toLocaleString()}` : "—",
          date: new Date(a.applied_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
          niche: a.niche || "—",
          platforms: a.campaign_platforms ? a.campaign_platforms.split(",") : [],
        })));
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const filteredApplications = activeFilter === "all"
    ? applications
    : applications.filter(app => app.status === activeFilter);

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    accepted: applications.filter(a => a.status === "accepted").length,
    rejected: applications.filter(a => a.status === "rejected").length,
  };

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

  const handleViewContact = (application) => {
    setSelectedApplication(application);
    setShowContactModal(true);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-amber-50",
          text: "text-amber-600",
          border: "border-amber-200",
          icon: "⏳",
          label: "Pending",
        };
      case "accepted":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-600",
          border: "border-emerald-200",
          icon: "✅",
          label: "Accepted",
        };
      case "rejected":
        return {
          bg: "bg-red-50",
          text: "text-red-600",
          border: "border-red-200",
          icon: "❌",
          label: "Rejected",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-600",
          border: "border-gray-200",
          icon: "📋",
          label: status,
        };
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e7bdd3]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="reveal flex items-center gap-2 text-sm text-white/60 mb-6">
              <Link to="/creator/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <span>/</span>
              <span className="text-white">My Applications</span>
            </nav>

            <div className="reveal flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              {/* Title Section */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  My <span className="bg-gradient-to-r from-[#c7eff9] to-[#e7bdd3] bg-clip-text text-transparent">Applications</span>
                </h1>
                <p className="text-white/70 text-lg">
                  Track and manage your sponsorship applications
                </p>
              </div>

              {/* Quick Stats */}
              <div className="reveal delay-1 flex gap-3">
                {[
                  { label: "Total", value: stats.total, color: "from-blue-400 to-indigo-500" },
                  { label: "Pending", value: stats.pending, color: "from-amber-400 to-orange-500" },
                  { label: "Accepted", value: stats.accepted, color: "from-emerald-400 to-green-500" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 px-4 py-3 text-center min-w-[80px]">
                    <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="reveal delay-1 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Filter Tabs */}
              <div className="flex gap-2">
                {[
                  { key: "all", label: "All Applications", icon: "📋" },
                  { key: "pending", label: "Pending", icon: "⏳" },
                  { key: "accepted", label: "Accepted", icon: "✅" },
                  { key: "rejected", label: "Rejected", icon: "❌" },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${activeFilter === filter.key
                      ? "bg-gradient-to-r from-[#5157a1] to-[#393873] text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    <span>{filter.icon}</span>
                    <span className="hidden sm:inline">{filter.label}</span>
                  </button>
                ))}
              </div>

              {/* Results Count */}
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-700">{filteredApplications.length}</span> applications
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Table */}
          <div className="reveal delay-2 hidden lg:block bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Campaign</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Sponsor</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Budget</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Applied On</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app, index) => {
                  const statusConfig = getStatusConfig(app.status);
                  return (
                    <tr
                      key={app.id}
                      className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${index === filteredApplications.length - 1 ? "border-b-0" : ""
                        }`}
                    >
                      {/* Campaign */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center text-lg">
                            {app.sponsorLogo}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{app.campaign}</p>
                            <p className="text-sm text-gray-500">{app.niche}</p>
                          </div>
                        </div>
                      </td>
                      {/* Sponsor */}
                      <td className="py-4 px-6">
                        <p className="text-gray-700">{app.sponsor}</p>
                      </td>
                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                          <span>{statusConfig.icon}</span>
                          {statusConfig.label}
                        </span>
                      </td>
                      {/* Budget */}
                      <td className="py-4 px-6">
                        <p className="font-semibold text-gray-900">{app.budget}</p>
                      </td>
                      {/* Date */}
                      <td className="py-4 px-6">
                        <p className="text-gray-600">{app.date}</p>
                      </td>
                      {/* Action */}
                      <td className="py-4 px-6">
                        {app.status === "accepted" ? (
                          <button
                            onClick={() => handleViewContact(app)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#5157a1] to-[#393873] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#5157a1]/25 transition-all duration-300 transform hover:-translate-y-0.5"
                          >
                            <span>👁️</span>
                            View Contact
                            <span className="text-xs opacity-75">(5 🪙)</span>
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Contact Locked
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {filteredApplications.map((app, index) => {
              const statusConfig = getStatusConfig(app.status);
              return (
                <div
                  key={app.id}
                  className={`reveal delay-${index + 2} bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-5 transition-all duration-300 hover:shadow-xl`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center text-xl">
                        {app.sponsorLogo}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{app.campaign}</p>
                        <p className="text-sm text-gray-500">{app.sponsor}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                      <span>{statusConfig.icon}</span>
                      {statusConfig.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Budget</p>
                      <p className="font-semibold text-gray-900">{app.budget}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Applied On</p>
                      <p className="font-semibold text-gray-900">{app.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {app.platforms.map((platform, i) => (
                      <span key={i} className="px-2 py-1 bg-[#5157a1]/10 text-[#5157a1] text-xs rounded-md font-medium">
                        {platform}
                      </span>
                    ))}
                  </div>

                  {app.status === "accepted" ? (
                    <button
                      onClick={() => handleViewContact(app)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <span>👁️</span>
                      View Contact
                      <span className="text-sm opacity-75">(5 🪙)</span>
                    </button>
                  ) : (
                    <div className="w-full py-3 rounded-xl bg-gray-100 text-gray-400 font-medium text-center flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Contact Locked
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredApplications.length === 0 && (
            <div className="reveal delay-2 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-3xl">
                📭
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-500 mb-6">You don't have any {activeFilter !== "all" ? activeFilter : ""} applications yet.</p>
              <Link
                to="/creator/browse"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-medium hover:shadow-lg transition-all"
              >
                <span>🔍</span>
                Browse Campaigns
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowContactModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-[scale-in_0.2s_ease-out]">
            {/* Close Button */}
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center text-3xl">
                {selectedApplication.sponsorLogo}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {selectedApplication.sponsor}
              </h3>
              <p className="text-gray-500 text-sm">{selectedApplication.campaign}</p>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-lg shadow-sm">
                  📧
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">contact@{selectedApplication.sponsor.toLowerCase().replace(/\s/g, "")}.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-lg shadow-sm">
                  📞
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-lg shadow-sm">
                  👤
                </div>
                <div>
                  <p className="text-xs text-gray-500">Contact Person</p>
                  <p className="font-medium text-gray-900">Rahul Sharma (Marketing Manager)</p>
                </div>
              </div>
            </div>

            {/* Token Deduction Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <span className="text-xl">🪙</span>
              <div>
                <p className="font-medium text-amber-800 text-sm">5 Tokens Deducted</p>
                <p className="text-amber-600 text-xs">This contact information has been unlocked.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <span>💬</span>
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <Footer />
    </div>
  );
}
