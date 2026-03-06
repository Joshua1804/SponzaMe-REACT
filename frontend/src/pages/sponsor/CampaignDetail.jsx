import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ConfirmModal from "../../components/ConfirmModal";
import { ToastContainer, useToast } from "../../components/Toast";
import api from "../../api";
import { ClipboardList, Pencil, Trash2, AlertTriangle, DollarSign, Target, CalendarDays, Coins, Smartphone, FileText, Package, Users, Search, Lock, Save, Sparkles, MapPin, Star, ChevronRight } from "lucide-react";

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

  /* ML Recommendations */
  const [recommendations, setRecommendations] = useState(null);
  const [recLoading, setRecLoading] = useState(false);
  const [recError, setRecError] = useState("");

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

  /* Fetch ML recommendations */
  const fetchRecommendations = () => {
    setRecLoading(true);
    setRecError("");
    setRecommendations(null);
    api
      .get(`/sponsor/campaign/${id}/recommendations`)
      .then((res) => setRecommendations(res.data.recommendations || []))
      .catch((err) =>
        setRecError(
          err.response?.data?.error || "Failed to get recommendations."
        )
      )
      .finally(() => setRecLoading(false));
  };

  /* Helpers */
  const isClosed = campaign?.status === "closed";

  const scoreBadgeColor = (score) => {
    if (score >= 75) return "from-emerald-400 to-emerald-600";
    if (score >= 50) return "from-amber-400 to-amber-500";
    return "from-red-400 to-red-500";
  };

  const scoreBgColor = (score) => {
    if (score >= 75) return "bg-emerald-50 border-emerald-200";
    if (score >= 50) return "bg-amber-50 border-amber-200";
    return "bg-red-50 border-red-200";
  };

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
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <ClipboardList size={24} className="text-white" />
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
                      <Pencil size={16} className="inline" /> Edit
                    </button>
                  )}
                  <button
                    onClick={() => setShowDelete(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 text-red-100 border border-red-400/30 font-semibold hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 size={16} className="inline" /> Delete
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
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <AlertTriangle size={28} className="text-red-500" />
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
                    icon: <DollarSign size={20} className="text-[#5157a1]" />,
                  },
                  {
                    label: "Niche",
                    value: campaign.niche || "—",
                    icon: <Target size={20} className="text-[#5157a1]" />,
                  },
                  {
                    label: "Deadline",
                    value: campaign.deadline
                      ? new Date(campaign.deadline).toLocaleDateString()
                      : "—",
                    icon: <CalendarDays size={20} className="text-[#5157a1]" />,
                  },
                  {
                    label: "Token Cost",
                    value: campaign.token_cost ?? 2,
                    icon: <Coins size={20} className="text-[#5157a1]" />,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl bg-gray-50 text-center"
                  >
                    <div className="mb-1 flex justify-center">{stat.icon}</div>
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
                  <Smartphone size={16} className="inline" /> Target Platforms
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
                    <FileText size={16} className="inline" /> Requirements
                  </h3>
                  <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
                    {campaign.requirements}
                  </p>
                </div>
              )}
              {campaign.deliverables && (
                <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="font-bold text-[#393873] mb-3 flex items-center gap-2">
                    <Package size={16} className="inline" /> Deliverables
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
                  <Users size={16} className="inline" /> View Applicants ({campaign.applicant_count ?? 0})
                </Link>
                <Link
                  to="/sponsor/creators"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5157a1]/10 text-[#5157a1] font-semibold hover:bg-[#5157a1]/20 transition-all text-sm"
                >
                  <Search size={16} className="inline" /> Invite Creators
                </Link>
              </div>
            </div>

            {/* ── AI-Powered Creator Recommendations ── */}
            <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="p-6 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-200">
                      <Sparkles size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#393873] text-lg">AI Recommended Creators</h3>
                      <p className="text-xs text-gray-400">ML-powered matching based on niche, location, platforms & reach</p>
                    </div>
                  </div>
                  <button
                    onClick={fetchRecommendations}
                    disabled={recLoading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-violet-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {recLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing…
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        {recommendations ? "Refresh" : "Find Best Creators"}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Initial state */}
                {!recommendations && !recLoading && !recError && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-violet-50 flex items-center justify-center mb-4">
                      <Sparkles size={28} className="text-violet-400" />
                    </div>
                    <p className="text-gray-500 text-sm">Click <strong>"Find Best Creators"</strong> to discover the top 3 creators that best match this campaign.</p>
                  </div>
                )}

                {/* Loading */}
                {recLoading && (
                  <div className="text-center py-10">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <div className="absolute inset-0 border-4 border-violet-100 rounded-full" />
                      <div className="absolute inset-0 border-4 border-transparent border-t-violet-500 rounded-full animate-spin" />
                      <div className="absolute inset-2 border-4 border-transparent border-t-purple-400 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
                    </div>
                    <p className="text-gray-500 text-sm font-medium">Analyzing creators with ML…</p>
                    <p className="text-gray-400 text-xs mt-1">Matching niche, location, platforms & follower reach</p>
                  </div>
                )}

                {/* Error */}
                {recError && (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-3">
                      <AlertTriangle size={24} className="text-red-400" />
                    </div>
                    <p className="text-red-500 text-sm font-medium mb-1">{recError}</p>
                    <p className="text-gray-400 text-xs">Make sure the recommendation service is running.</p>
                  </div>
                )}

                {/* Results */}
                {recommendations && recommendations.length > 0 && (
                  <div className="space-y-4">
                    {recommendations.map((rec, idx) => (
                      <div
                        key={rec.user_id || idx}
                        className={`relative rounded-2xl border p-5 transition-all hover:shadow-md ${scoreBgColor(rec.match_score)}`}
                        style={{ animationDelay: `${idx * 120}ms` }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          {/* Rank badge */}
                          <div className="flex-shrink-0">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${scoreBadgeColor(rec.match_score)} flex flex-col items-center justify-center shadow-lg text-white`}>
                              <span className="text-lg font-extrabold leading-none">{rec.match_score}%</span>
                              <span className="text-[9px] font-medium opacity-80 uppercase tracking-wider">match</span>
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-white bg-[#393873] px-2 py-0.5 rounded-md">#{idx + 1}</span>
                              <h4 className="font-bold text-[#393873] text-base truncate">{rec.name}</h4>
                            </div>

                            {/* Tags row */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              {rec.niche && rec.niche !== "—" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/80 text-xs font-medium text-[#5157a1] border border-[#5157a1]/10">
                                  <Target size={11} /> {rec.niche}
                                </span>
                              )}
                              {rec.location && rec.location !== "—" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/80 text-xs font-medium text-gray-600 border border-gray-200">
                                  <MapPin size={11} /> {rec.location}
                                </span>
                              )}
                              {rec.followers && rec.followers !== "0" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/80 text-xs font-medium text-gray-600 border border-gray-200">
                                  <Users size={11} /> {rec.followers} followers
                                </span>
                              )}
                              {rec.platforms && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/80 text-xs font-medium text-gray-600 border border-gray-200">
                                  <Smartphone size={11} /> {rec.platforms}
                                </span>
                              )}
                            </div>

                            {/* Reasoning */}
                            {rec.reasons && rec.reasons.length > 0 && (
                              <div className="space-y-1">
                                {rec.reasons.map((reason, ri) => (
                                  <div key={ri} className="flex items-start gap-2 text-xs text-gray-600">
                                    <Star size={10} className="flex-shrink-0 mt-0.5 text-amber-400 fill-amber-400" />
                                    <span>{reason}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Action */}
                          <div className="flex-shrink-0 self-center">
                            <Link
                              to={`/sponsor/creator/${rec.user_id}`}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#393873] text-white text-xs font-semibold hover:bg-[#5157a1] hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            >
                              View Profile <ChevronRight size={12} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty results */}
                {recommendations && recommendations.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
                      <Users size={24} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 text-sm">No creators found for matching.</p>
                    <p className="text-gray-400 text-xs">Try adding more creators to the platform first.</p>
                  </div>
                )}
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
                <Lock size={16} className="inline" /> This campaign is closed and cannot be edited.
              </div>
            )}

            {/* Title + Description */}
            <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
              <h3 className="font-bold text-[#393873] mb-4 flex items-center gap-2">
                <Pencil size={16} className="inline" /> Basic Info
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
                    className={`text-xs mt-1 text-right ${form.description.length >= 500
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
                <DollarSign size={16} className="inline" /> Campaign Details
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
                <Smartphone size={16} className="inline" /> Target Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePlatform(p)}
                    aria-label={`Toggle ${p}`}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200
                      ${form.platforms.includes(p)
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
                <FileText size={16} className="inline" /> Requirements & Deliverables
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
                  <><Save size={16} className="inline" /> Save Changes</>
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
