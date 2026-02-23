import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ConfirmModal from "../../components/ConfirmModal";
import { ToastContainer, useToast } from "../../components/Toast";
import api from "../../api";

export default function ManageCampaigns() {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* ── Confirm modal state (for closing) ── */
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    campaignId: null,
    newStatus: null,
  });

  /* ── Delete modal state ── */
  const [deleteModal, setDeleteModal] = useState({ open: false, campaignId: null });
  const [deletingId, setDeletingId] = useState(null);
  const { toasts, addToast, removeToast } = useToast();

  /* ── Page title ── */
  useEffect(() => { document.title = "Manage Campaigns — SponzaMe"; }, []);

  /* ── Fetch campaigns ── */
  useEffect(() => {
    api
      .get("/sponsor/campaigns")
      .then((res) => {
        setCampaigns(res.data.campaigns || []);
      })
      .catch((err) => {
        setError(
          err.response?.data?.error || "Failed to load campaigns."
        );
      })
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

  /* ── Update campaign status ── */
  const handleStatusChange = (id, newStatus) => {
    if (newStatus === "closed") {
      setConfirmModal({ open: true, campaignId: id, newStatus });
      return;
    }
    executeStatusChange(id, newStatus);
  };

  const executeStatusChange = (id, newStatus) => {
    setUpdatingId(id);
    api
      .put(`/sponsor/campaign/${id}/status`, { status: newStatus })
      .then(() => {
        setCampaigns((prev) =>
          prev.map((c) =>
            c.campaign_id === id ? { ...c, status: newStatus } : c
          )
        );
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Failed to update status.");
      })
      .finally(() => setUpdatingId(null));
  };

  const handleConfirmClose = () => {
    const { campaignId, newStatus } = confirmModal;
    executeStatusChange(campaignId, newStatus);
    setConfirmModal({ open: false, campaignId: null, newStatus: null });
  };

  /* ── Delete campaign ── */
  const handleDeleteClick = (campaignId) => {
    setDeleteModal({ open: true, campaignId });
  };

  const handleConfirmDelete = () => {
    const { campaignId } = deleteModal;
    setDeletingId(campaignId);
    api
      .delete(`/sponsor/campaign/${campaignId}`)
      .then(() => {
        setCampaigns((prev) => prev.filter((c) => c.campaign_id !== campaignId));
        addToast("Campaign deleted successfully.", "success");
      })
      .catch((err) =>
        addToast(err.response?.data?.error || "Failed to delete campaign.", "error")
      )
      .finally(() => {
        setDeletingId(null);
        setDeleteModal({ open: false, campaignId: null });
      });
  };

  /* ── Helpers ── */
  const statusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s === "active") return "bg-emerald-50 text-emerald-600 border-emerald-200";
    if (s === "paused") return "bg-amber-50 text-amber-600 border-amber-200";
    return "bg-red-50 text-red-600 border-red-200";
  };

  const statusDot = (status) => {
    const s = status?.toLowerCase();
    if (s === "active") return "bg-emerald-400";
    if (s === "paused") return "bg-amber-400";
    return "bg-red-400";
  };

  const filtered = campaigns
    .filter((c) => filter === "all" || c.status === filter)
    .filter(
      (c) =>
        !searchQuery ||
        c.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const counts = {
    all: campaigns.length,
    active: campaigns.filter((c) => c.status === "active").length,
    paused: campaigns.filter((c) => c.status === "paused").length,
    closed: campaigns.filter((c) => c.status === "closed").length,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
              <Link
                to="/sponsor/dashboard"
                className="hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <span>→</span>
              <span className="text-white">Manage Campaigns</span>
            </nav>

            <div className="reveal flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl">
                  📢
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white">
                    Manage{" "}
                    <span className="bg-gradient-to-r from-[#c7eff9] to-[#e7bdd3] bg-clip-text text-transparent">
                      Campaigns
                    </span>
                  </h1>
                  <p className="text-white/70 mt-1">
                    {campaigns.length} campaign
                    {campaigns.length !== 1 ? "s" : ""} total
                  </p>
                </div>
              </div>

              <Link
                to="/sponsor/create-campaign"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#5157a1] font-semibold shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all"
              >
                <span>✨</span> New Campaign
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex flex-col sm:flex-row items-center gap-4">
            {/* Status tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              {[
                { key: "all", label: "All" },
                { key: "active", label: "Active" },
                { key: "paused", label: "Paused" },
                { key: "closed", label: "Closed" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setFilter(t.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${
                      filter === t.key
                        ? "bg-white text-[#5157a1] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {t.label}
                  <span className="ml-1.5 text-xs opacity-60">
                    ({counts[t.key]})
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 relative sm:max-w-xs ml-auto">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campaigns..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 text-sm transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 animate-pulse"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                  <div className="h-5 bg-gray-200 rounded w-1/4" />
                  <div className="h-5 bg-gray-200 rounded w-20 ml-auto" />
                  <div className="h-5 bg-gray-200 rounded w-16" />
                  <div className="h-5 bg-gray-200 rounded w-28" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center text-3xl mb-4">
              ⚠️
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-500 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-xl bg-[#5157a1] text-white font-semibold hover:shadow-lg transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && campaigns.length === 0 && (
          <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#5157a1]/10 to-[#c7eff9]/30 flex items-center justify-center text-4xl mb-4">
              📢
            </div>
            <h3 className="text-xl font-bold text-[#393873] mb-2">
              No Campaigns Yet
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Create your first campaign to start receiving applications
              from creators.
            </p>
            <Link
              to="/sponsor/create-campaign"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-semibold hover:shadow-xl hover:shadow-[#5157a1]/20 hover:-translate-y-0.5 transition-all"
            >
              ✨ Create Campaign
            </Link>
          </div>
        )}

        {/* No filter results */}
        {!loading &&
          !error &&
          campaigns.length > 0 &&
          filtered.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <p className="text-gray-500">
                No campaigns match your filters.
              </p>
              <button
                onClick={() => {
                  setFilter("all");
                  setSearchQuery("");
                }}
                className="mt-4 text-[#5157a1] font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

        {/* Campaigns list */}
        {!loading && !error && filtered.length > 0 && (
          <div className="space-y-4">
            {filtered.map((campaign, idx) => {
              const isClosed = campaign.status === "closed";
              const isUpdating = updatingId === campaign.campaign_id;

              return (
                <div
                  key={campaign.campaign_id}
                  className={`reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-5 lg:p-6 hover:shadow-xl transition-all duration-300`}
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Title + meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${statusDot(
                            campaign.status
                          )}`}
                        />
                        <h3 className="font-bold text-[#393873] truncate text-lg">
                          {campaign.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        {campaign.platforms && (
                          <span className="flex items-center gap-1">
                            📱 {campaign.platforms}
                          </span>
                        )}
                        {campaign.budget && (
                          <span className="flex items-center gap-1">
                            💰 ₹
                            {Number(campaign.budget).toLocaleString()}
                          </span>
                        )}
                        {campaign.deadline && (
                          <span className="flex items-center gap-1">
                            📅 Due:{" "}
                            {new Date(
                              campaign.deadline
                            ).toLocaleDateString()}
                          </span>
                        )}
                        {campaign.created_at && (
                          <span className="flex items-center gap-1">
                            🕐{" "}
                            {new Date(
                              campaign.created_at
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1.5 rounded-xl bg-[#5157a1]/5 text-center min-w-[60px]">
                        <p className="text-lg font-bold text-[#5157a1]">
                          {campaign.applicant_count ?? 0}
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                          Applicants
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize border ${statusBadge(
                          campaign.status
                        )}`}
                      >
                        {campaign.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <select
                        value={campaign.status}
                        disabled={isClosed || isUpdating}
                        onChange={(e) =>
                          handleStatusChange(
                            campaign.campaign_id,
                            e.target.value
                          )
                        }
                        className={`px-3 py-2 rounded-xl text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20
                          ${
                            isClosed || isUpdating
                              ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                              : "bg-white border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                        <option value="closed">Closed</option>
                      </select>

                      <Link
                        to={`/sponsor/campaign/${campaign.campaign_id}`}
                        className="px-4 py-2 rounded-xl font-medium text-sm bg-[#5157a1]/10 text-[#5157a1] hover:bg-[#5157a1]/20 transition-all duration-200"
                      >
                        ✏️ View / Edit
                      </Link>

                      <button
                        onClick={() =>
                          navigate(
                            `/sponsor/applicants?campaign=${campaign.campaign_id}`
                          )
                        }
                        className="px-4 py-2 rounded-xl font-medium text-sm bg-gradient-to-r from-[#5157a1] to-[#393873] text-white hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                      >
                        👥 Applicants
                      </button>

                      <button
                        onClick={() => handleDeleteClick(campaign.campaign_id)}
                        disabled={deletingId === campaign.campaign_id}
                        className="px-4 py-2 rounded-xl font-medium text-sm bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-all duration-200 disabled:opacity-50"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirm modal for closing campaigns */}
      <ConfirmModal
        open={confirmModal.open}
        title="Close Campaign?"
        message="This action is permanent. Once closed, the campaign cannot be re-activated and no further actions can be taken."
        confirmText="Yes, Close It"
        variant="danger"
        onConfirm={handleConfirmClose}
        onCancel={() =>
          setConfirmModal({ open: false, campaignId: null, newStatus: null })
        }
      />

      <ConfirmModal
        open={deleteModal.open}
        title="Delete Campaign?"
        message="This will permanently delete the campaign and all its applications. This action cannot be undone."
        confirmText="Yes, Delete"
        variant="danger"
        loading={deletingId !== null}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ open: false, campaignId: null })}
      />

      <Footer />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
