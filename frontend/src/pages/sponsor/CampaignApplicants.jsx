import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ConfirmModal from "../../components/ConfirmModal";
import api from "../../api";
import { Users, Hourglass, CheckCircle, XCircle, AlertTriangle, MailOpen, Target, Smartphone, UserCircle, Lock } from "lucide-react";

export default function CampaignApplicants() {
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get("campaign");

  const [campaign, setCampaign] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actioningId, setActioningId] = useState(null);

  /* ── Filter & sort state ── */
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date"); // "date" | "followers"

  /* ── Confirm modal state ── */
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    applicationId: null,
    action: null, // "accepted" | "rejected"
  });

  /* ── Page title ── */
  useEffect(() => { document.title = "Campaign Applicants — SponzaMe"; }, []);

  /* ── Fetch ── */
  useEffect(() => {
    if (!campaignId) {
      setError("No campaign ID provided.");
      setLoading(false);
      return;
    }

    api
      .get(`/sponsor/campaign/${campaignId}/applicants`)
      .then((res) => setApplicants(res.data.applicants || []))
      .catch((err) =>
        setError(
          err.response?.data?.error || "Failed to load applicants."
        )
      )
      .finally(() => setLoading(false));

    api
      .get("/sponsor/campaigns")
      .then((res) => {
        const found = (res.data.campaigns || []).find(
          (c) => String(c.campaign_id) === String(campaignId)
        );
        if (found) setCampaign(found);
      })
      .catch(() => { });
  }, [campaignId]);

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

  /* ── Update applicant status ── */
  const updateApplicantStatus = (applicationId, newStatus) => {
    setActioningId(applicationId);
    api
      .put(`/sponsor/application/${applicationId}/status`, {
        status: newStatus,
      })
      .then(() => {
        setApplicants((prev) =>
          prev.map((a) =>
            a.application_id === applicationId
              ? { ...a, status: newStatus }
              : a
          )
        );
      })
      .catch((err) => {
        alert(
          err.response?.data?.error ||
          "Failed to update applicant status."
        );
      })
      .finally(() => setActioningId(null));
  };

  /* ── Confirm modal handlers ── */
  const handleAction = (applicationId, action) => {
    setConfirmModal({ open: true, applicationId, action });
  };

  const handleConfirmAction = () => {
    const { applicationId, action } = confirmModal;
    updateApplicantStatus(applicationId, action);
    setConfirmModal({ open: false, applicationId: null, action: null });
  };

  /* ── Helpers ── */
  const statusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s === "accepted")
      return "bg-emerald-50 text-emerald-600 border-emerald-200";
    if (s === "rejected")
      return "bg-red-50 text-red-600 border-red-200";
    return "bg-amber-50 text-amber-600 border-amber-200";
  };

  const campaignTitle = campaign?.title || `Campaign #${campaignId}`;
  const campaignStatus = campaign?.status || "active";
  const isCampaignClosed = campaignStatus === "closed";

  const pendingCount = applicants.filter(
    (a) => a.status === "pending"
  ).length;
  const acceptedCount = applicants.filter(
    (a) => a.status === "accepted"
  ).length;
  const rejectedCount = applicants.filter(
    (a) => a.status === "rejected"
  ).length;

  /* ── Derived filtered + sorted list ── */
  const displayApplicants = applicants
    .filter(
      (a) => statusFilter === "all" || a.status === statusFilter
    )
    .sort((a, b) => {
      if (sortBy === "followers") {
        return (Number(b.followers) || 0) - (Number(a.followers) || 0);
      }
      // Default: by date (newest first)
      return new Date(b.applied_at || 0) - new Date(a.applied_at || 0);
    });

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
          <div className="max-w-6xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
              <Link
                to="/sponsor/my-campaigns"
                className="hover:text-white transition-colors"
              >
                Manage Campaigns
              </Link>
              <span>→</span>
              <span className="text-white">Applicants</span>
            </nav>

            <div className="reveal flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white">
                    {campaignTitle}
                  </h1>
                  <p className="text-white/70 mt-1">
                    {applicants.length} applicant
                    {applicants.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold capitalize ${isCampaignClosed
                    ? "bg-red-100 text-red-700"
                    : "bg-emerald-100 text-emerald-700"
                  }`}
              >
                {campaignStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      {!loading && !error && applicants.length > 0 && (
        <div className="w-full px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4">
            {[
              {
                label: "Pending",
                count: pendingCount,
                color: "from-amber-50 to-amber-100/50",
                text: "text-amber-600",
                icon: <Hourglass size={20} className="text-amber-600" />,
              },
              {
                label: "Accepted",
                count: acceptedCount,
                color: "from-emerald-50 to-emerald-100/50",
                text: "text-emerald-600",
                icon: <CheckCircle size={20} className="text-emerald-600" />,
              },
              {
                label: "Rejected",
                count: rejectedCount,
                color: "from-red-50 to-red-100/50",
                text: "text-red-600",
                icon: <XCircle size={20} className="text-red-600" />,
              },
            ].map((s) => (
              <div
                key={s.label}
                className={`reveal bg-gradient-to-br ${s.color} rounded-2xl p-4 border border-gray-100 shadow-sm text-center`}
              >
                <div className="mb-1 flex justify-center">{s.icon}</div>
                <p className={`text-2xl font-bold ${s.text}`}>
                  {s.count}
                </p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Filter / Sort bar ── */}
      {!loading && !error && applicants.length > 0 && (
        <div className="w-full px-4 sm:px-6 lg:px-8 mt-4">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-3 flex flex-col sm:flex-row items-center gap-3">
            {/* Status filter tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              {[
                { key: "all", label: "All" },
                { key: "pending", label: "Pending" },
                { key: "accepted", label: "Accepted" },
                { key: "rejected", label: "Rejected" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setStatusFilter(t.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${statusFilter === t.key
                      ? "bg-white text-[#5157a1] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 transition-all"
              >
                <option value="date">Newest First</option>
                <option value="followers">Most Followers</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 animate-pulse"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-2xl" />
                  <div className="h-5 bg-gray-200 rounded w-1/4" />
                  <div className="h-5 bg-gray-200 rounded w-20 ml-auto" />
                  <div className="h-5 bg-gray-200 rounded w-32" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <AlertTriangle size={28} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-500 mb-6">{error}</p>
            <Link
              to="/sponsor/my-campaigns"
              className="px-6 py-3 rounded-xl bg-[#5157a1] text-white font-semibold hover:shadow-lg transition-all"
            >
              Back to Campaigns
            </Link>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && applicants.length === 0 && (
          <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#5157a1]/10 to-[#c7eff9]/30 flex items-center justify-center mb-4">
              <MailOpen size={36} className="text-[#5157a1]" />
            </div>
            <h3 className="text-xl font-bold text-[#393873] mb-2">
              No Applicants Yet
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              No creators have applied to this campaign yet. Share it to
              attract more applicants!
            </p>
            <Link
              to="/sponsor/my-campaigns"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-semibold hover:shadow-lg transition-all"
            >
              ← Back to Campaigns
            </Link>
          </div>
        )}

        {/* No filter match */}
        {!loading && !error && applicants.length > 0 && displayApplicants.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <p className="text-gray-500">No applicants match the selected filter.</p>
            <button
              onClick={() => setStatusFilter("all")}
              className="mt-4 text-[#5157a1] font-medium hover:underline"
            >
              Show all applicants
            </button>
          </div>
        )}

        {/* Applicants list */}
        {!loading && !error && displayApplicants.length > 0 && (
          <div className="space-y-4">
            {displayApplicants.map((app, idx) => {
              const isPending = app.status === "pending";
              const isActioning =
                actioningId === app.application_id;
              const canAct =
                isPending && !isCampaignClosed && !isActioning;

              return (
                <div
                  key={app.application_id}
                  className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-5 lg:p-6 hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Creator info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <Link
                        to={`/sponsor/creator/${app.creator_user_id || app.user_id}`}
                        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c7eff9] to-[#e7bdd3] flex items-center justify-center text-lg font-bold text-[#393873] flex-shrink-0 hover:scale-105 transition-transform"
                      >
                        {(app.creator_name || "?")
                          .charAt(0)
                          .toUpperCase()}
                      </Link>
                      <div className="min-w-0">
                        <Link
                          to={`/sponsor/creator/${app.creator_user_id || app.user_id}`}
                          className="font-bold text-[#393873] truncate hover:text-[#5157a1] transition-colors block"
                        >
                          {app.creator_name || "Unknown Creator"}
                        </Link>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-0.5">
                          {app.niche && (
                            <span className="flex items-center gap-1">
                              <Target size={14} className="inline" /> {app.niche}
                            </span>
                          )}
                          {app.platforms && (
                            <span className="flex items-center gap-1">
                              <Smartphone size={14} className="inline" /> {app.platforms}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4">
                      {app.followers && (
                        <div className="text-center px-3">
                          <p className="text-lg font-bold text-[#5157a1]">
                            {Number(
                              app.followers
                            ).toLocaleString()}
                          </p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                            Followers
                          </p>
                        </div>
                      )}

                      {app.applied_at && (
                        <div className="text-center px-3">
                          <p className="text-sm font-medium text-gray-600">
                            {new Date(
                              app.applied_at
                            ).toLocaleDateString()}
                          </p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                            Applied
                          </p>
                        </div>
                      )}

                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize border ${statusBadge(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        to={`/sponsor/creator/${app.creator_user_id || app.user_id}`}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-[#5157a1]/10 text-[#5157a1] hover:bg-[#5157a1]/20 transition-all duration-200"
                      >
                        <UserCircle size={16} className="inline" /> Profile
                      </Link>

                      <button
                        disabled={!canAct}
                        onClick={() =>
                          handleAction(
                            app.application_id,
                            "accepted"
                          )
                        }
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                          ${!canAct
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-md active:scale-95"
                          }`}
                      >
                        {isActioning ? (
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <CheckCircle size={16} />
                        )}{" "}
                        Accept
                      </button>

                      <button
                        disabled={!canAct}
                        onClick={() =>
                          handleAction(
                            app.application_id,
                            "rejected"
                          )
                        }
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                          ${!canAct
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-600 hover:shadow-md active:scale-95"
                          }`}
                      >
                        {isActioning ? (
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <XCircle size={16} />
                        )}{" "}
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {isCampaignClosed && applicants.length > 0 && (
          <div className="mt-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-center">
            <p className="text-sm text-red-600 font-medium">
              <Lock size={16} className="inline" /> This campaign is closed. No further actions can be
              taken.
            </p>
          </div>
        )}
      </div>

      {/* Confirm modal for accept/reject */}
      <ConfirmModal
        open={confirmModal.open}
        title={
          confirmModal.action === "accepted"
            ? "Accept this Creator?"
            : "Reject this Creator?"
        }
        message={
          confirmModal.action === "accepted"
            ? "The creator will be notified that they've been accepted for this campaign."
            : "The creator will be notified that they were not selected for this campaign."
        }
        confirmText={
          confirmModal.action === "accepted" ? "Yes, Accept" : "Yes, Reject"
        }
        variant={confirmModal.action === "rejected" ? "danger" : "default"}
        onConfirm={handleConfirmAction}
        onCancel={() =>
          setConfirmModal({ open: false, applicationId: null, action: null })
        }
      />

      <Footer />
    </div>
  );
}
