import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ConfirmModal from "../../components/ConfirmModal";
import { ToastContainer, useToast } from "../../components/Toast";
import api from "../../api";

const PLATFORMS = [
  "Instagram",
  "YouTube",
  "Twitter",
  "TikTok",
  "LinkedIn",
  "Facebook",
];
const NICHES = [
  "Fashion",
  "Tech",
  "Food",
  "Travel",
  "Fitness",
  "Beauty",
  "Gaming",
  "Education",
  "Music",
  "Lifestyle",
  "Other",
];

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = useToast();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* Edit mode */
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  /* Delete modal */
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /* Page title */
  useEffect(() => {
    document.title = "Campaign Details — SponzaMe";
  }, []);

  /* Fetch campaign */
  useEffect(() => {
    api
      .get(`/sponsor/campaign/${id}`)
      .then((res) => {
        setCampaign(res.data.campaign);
        populateForm(res.data.campaign);
      })
      .catch((err) =>
        setError(err.response?.data?.error || "Failed to load campaign.")
      )
      .finally(() => setLoading(false));
  }, [id]);

  /* Scroll reveal */
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
  }, [loading, editing]);

  const populateForm = (c) => {
    setForm({
      title: c.title || "",
      description: c.description || "",
      niche: c.niche || "",
      budget: c.budget || "",
      deadline: c.deadline || "",
      platforms: c.platforms ? c.platforms.split(",").map((p) => p.trim()) : [],
      requirements: c.requirements || "",
      deliverables: c.deliverables || "",
    });
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const togglePlatform = (p) =>
    setForm({
      ...form,
      platforms: form.platforms.includes(p)
        ? form.platforms.filter((x) => x !== p)
        : [...form.platforms, p],
    });

  /* Save edits */
  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    api
      .put(`/sponsor/campaign/${id}`, {
        title: form.title,
        description: form.description,
        niche: form.niche,
        budget: form.budget,
        deadline: form.deadline,
        platforms: form.platforms.join(","),
        requirements: form.requirements,
        deliverables: form.deliverables,
      })
      .then((res) => {
        setCampaign(res.data.campaign);
        populateForm(res.data.campaign);
        setEditing(false);
        addToast("Campaign updated successfully!", "success");
      })
      .catch((err) =>
        addToast(
          err.response?.data?.error || "Failed to update campaign.",
          "error"
        )
      )
      .finally(() => setSaving(false));
  };

  /* Delete */
  const handleDelete = () => {
    setDeleting(true);
    api
      .delete(`/sponsor/campaign/${id}`)
      .then(() => {
        addToast("Campaign deleted.", "success");
        setTimeout(() => navigate("/sponsor/my-campaigns"), 600);
      })
      .catch((err) =>
        addToast(
          err.response?.data?.error || "Failed to delete campaign.",
          "error"
        )
      )
      .finally(() => {
        setDeleting(false);
        setShowDelete(false);
      });
  };

  /* Helpers */
  const isClosed = campaign?.status === "closed";

  const statusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s === "active")
      return "bg-emerald-50 text-emerald-600 border-emerald-200";
    if (s === "paused")
      return "bg-amber-50 text-amber-600 border-amber-200";
    return "bg-red-50 text-red-600 border-red-200";
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
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
              <Link
                to="/sponsor/dashboard"
                className="hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <span>→</span>
              <Link
                to="/sponsor/my-campaigns"
                className="hover:text-white transition-colors"
              >
                My Campaigns
              </Link>
              <span>→</span>
              <span className="text-white">
                {campaign?.title || "Campaign Details"}
              </span>
            </nav>

            <div className="reveal flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl">
                  📋
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white">
                    {editing ? "Edit Campaign" : "Campaign Details"}
                  </h1>
                  {campaign && (
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border ${statusBadge(
                          campaign.status
                        )}`}
                      >
                        {campaign.status}
                      </span>
                      <span className="text-white/50 text-sm">
                        {campaign.applicant_count ?? 0} applicant
                        {(campaign.applicant_count ?? 0) !== 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {campaign && !editing && (
                <div className="flex gap-3">
                  {!isClosed && (
                    <button
                      onClick={() => setEditing(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#5157a1] font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
                    >
                      ✏️ Edit
                    </button>
                  )}
                  <button
                    onClick={() => setShowDelete(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 text-red-100 border border-red-400/30 font-semibold hover:bg-red-500/20 transition-all"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#5157a1]/20 border-t-[#5157a1] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Loading campaign…</p>
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
              Campaign Not Found
            </h3>
            <p className="text-gray-500 mb-6">{error}</p>
            <Link
              to="/sponsor/my-campaigns"
              className="px-6 py-3 rounded-xl bg-[#5157a1] text-white font-semibold hover:shadow-lg transition-all"
            >
              ← Back to Campaigns
            </Link>
          </div>
        )}

        {/* VIEW MODE */}
        {campaign && !editing && !loading && !error && (
          <div className="space-y-6">
            {/* Main details */}
            <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-[#393873] mb-2">
                {campaign.title}
              </h2>

              {campaign.description && (
                <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-wrap">
                  {campaign.description}
                </p>
              )}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Budget",
                    value: campaign.budget
                      ? `₹${Number(campaign.budget).toLocaleString()}`
                      : "—",
                    icon: "💰",
                  },
                  {
                    label: "Niche",
                    value: campaign.niche || "—",
                    icon: "🎯",
                  },
                  {
                    label: "Deadline",
                    value: campaign.deadline
                      ? new Date(campaign.deadline).toLocaleDateString()
                      : "—",
                    icon: "📅",
                  },
                  {
                    label: "Token Cost",
                    value: campaign.token_cost ?? 2,
                    icon: "🪙",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl bg-gray-50 text-center"
                  >
                    <div className="text-xl mb-1">{stat.icon}</div>
                    <p className="font-bold text-[#393873]">{stat.value}</p>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Platforms */}
            {campaign.platforms && (
              <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="font-bold text-[#393873] mb-3 flex items-center gap-2">
                  📱 Target Platforms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {campaign.platforms.split(",").map((p, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-xl bg-[#5157a1]/10 text-[#5157a1] text-sm font-medium"
                    >
                      {p.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements & Deliverables */}
            <div className="grid lg:grid-cols-2 gap-6">
              {campaign.requirements && (
                <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="font-bold text-[#393873] mb-3 flex items-center gap-2">
                    📝 Requirements
                  </h3>
                  <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
                    {campaign.requirements}
                  </p>
                </div>
              )}
              {campaign.deliverables && (
                <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="font-bold text-[#393873] mb-3 flex items-center gap-2">
                    📦 Deliverables
                  </h3>
                  <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
                    {campaign.deliverables}
                  </p>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-[#393873] mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/sponsor/applicants?campaign=${id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm"
                >
                  👥 View Applicants ({campaign.applicant_count ?? 0})
                </Link>
                <Link
                  to="/sponsor/creators"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5157a1]/10 text-[#5157a1] font-semibold hover:bg-[#5157a1]/20 transition-all text-sm"
                >
                  🔍 Invite Creators
                </Link>
              </div>
            </div>

            {/* Meta info */}
            <div className="text-center text-xs text-gray-400 py-4">
              Campaign #{campaign.campaign_id} · Created{" "}
              {new Date(campaign.created_at).toLocaleDateString()}
            </div>
          </div>
        )}

        {/* EDIT MODE */}
        {campaign && editing && !loading && !error && (
          <form onSubmit={handleSave} className="space-y-6">
            {isClosed && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-center text-sm text-red-600 font-medium">
                🔒 This campaign is closed and cannot be edited.
              </div>
            )}

            {/* Title + Description */}
            <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
              <h3 className="font-bold text-[#393873] mb-4 flex items-center gap-2">
                ✏️ Basic Info
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Campaign Title *
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    maxLength={500}
                    className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all resize-none"
                  />
                  <p
                    className={`text-xs mt-1 text-right ${
                      form.description.length >= 500
                        ? "text-red-500 font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {form.description.length}/500
                  </p>
                </div>
              </div>
            </div>

            {/* Budget, Niche, Deadline */}
            <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
              <h3 className="font-bold text-[#393873] mb-4 flex items-center gap-2">
                💰 Campaign Details
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Budget (₹)
                  </label>
                  <input
                    name="budget"
                    type="number"
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="e.g. 50000"
                    className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Niche
                  </label>
                  <select
                    name="niche"
                    value={form.niche}
                    onChange={handleChange}
                    className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all"
                  >
                    <option value="">Select niche</option>
                    {NICHES.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Deadline
                  </label>
                  <input
                    name="deadline"
                    type="date"
                    value={form.deadline}
                    onChange={handleChange}
                    className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Platforms */}
            <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
              <h3 className="font-bold text-[#393873] mb-4 flex items-center gap-2">
                📱 Target Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePlatform(p)}
                    aria-label={`Toggle ${p}`}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200
                      ${
                        form.platforms.includes(p)
                          ? "bg-[#5157a1] text-white border-[#5157a1] shadow-md"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Requirements & Deliverables */}
            <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
              <h3 className="font-bold text-[#393873] mb-4 flex items-center gap-2">
                📝 Requirements & Deliverables
              </h3>
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Requirements
                  </label>
                  <textarea
                    name="requirements"
                    value={form.requirements}
                    onChange={handleChange}
                    rows={4}
                    placeholder="e.g. Must have 10k+ followers..."
                    className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Deliverables
                  </label>
                  <textarea
                    name="deliverables"
                    value={form.deliverables}
                    onChange={handleChange}
                    rows={4}
                    placeholder="e.g. 2 Instagram posts, 1 story..."
                    className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  populateForm(campaign);
                  setEditing(false);
                }}
                className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-semibold hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-60"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving…
                  </span>
                ) : (
                  "💾 Save Changes"
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <ConfirmModal
        open={showDelete}
        title="Delete Campaign?"
        message="This will permanently remove the campaign and all its applications. This action cannot be undone."
        confirmText="Yes, Delete"
        variant="danger"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />

      <Footer />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
