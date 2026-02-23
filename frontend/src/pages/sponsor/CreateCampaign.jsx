import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../api";

export default function CreateCampaign() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    niche: "Technology",
    deadline: "",
    tokenCost: 2,
    platforms: [],
    requirements: "",
    deliverables: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});

  /* ── Page title ── */
  useEffect(() => { document.title = "Create Campaign — SponzaMe"; }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const togglePlatform = (platform) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = {
      title: form.title,
      description: form.description,
      budget: form.budget,
      niche: form.niche,
      deadline: form.deadline,
      token_cost: form.tokenCost,
      platforms: form.platforms.join(","),
      requirements: form.requirements,
      deliverables: form.deliverables,
    };

    api
      .post("/sponsor/campaigns", payload)
      .then(() => {
        navigate("/sponsor/my-campaigns");
      })
      .catch((err) => {
        setError(
          err.response?.data?.error ||
            "Failed to create campaign. Please try again."
        );
        setSubmitting(false);
      });
  };

  const platforms = [
    { name: "YouTube", icon: "🎬" },
    { name: "Instagram", icon: "📸" },
    { name: "Twitter", icon: "🐦" },
    { name: "LinkedIn", icon: "💼" },
    { name: "TikTok", icon: "🎵" },
  ];

  const niches = [
    "Technology",
    "Gaming",
    "Fashion",
    "Fitness",
    "Food",
    "Travel",
    "Education",
    "Entertainment",
    "Business",
    "Health",
  ];

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
          <div className="max-w-4xl mx-auto">
            <div className="reveal text-white">
              <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
                <Link to="/sponsor/dashboard" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
                <span>→</span>
                <span className="text-white">Create Campaign</span>
              </nav>

              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl">
                  ✨
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold">
                    Create New{" "}
                    <span className="bg-gradient-to-r from-[#c7eff9] to-[#e7bdd3] bg-clip-text text-transparent">
                      Campaign
                    </span>
                  </h1>
                  <p className="text-white/70 mt-1">
                    Post a campaign and start receiving creator applications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 -mt-6 relative z-20">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error banner */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-3 shadow-sm animate-[fadeIn_0.3s_ease]">
              <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">⚠️</div>
              <span className="flex-1">{error}</span>
              <button
                type="button"
                onClick={() => setError("")}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                ✕
              </button>
            </div>
          )}

          {/* ── Section 1: Campaign Info ── */}
          <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5157a1]/10 to-[#c7eff9]/30 flex items-center justify-center text-lg">
                📋
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#393873]">
                  Campaign Details
                </h2>
                <p className="text-xs text-gray-400">
                  Basic information about your campaign
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Campaign Title <span className="text-red-400">*</span>
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Summer Fashion Brand Promotion"
                  className={`w-full p-3.5 rounded-xl bg-gray-50 border focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all duration-200 ${
                    touched.title && !form.title
                      ? "border-red-300 bg-red-50/30"
                      : "border-gray-200"
                  }`}
                  onBlur={() => setTouched({ ...touched, title: true })}
                />
                {touched.title && !form.title && (
                  <p className="text-xs text-red-500 mt-1">Campaign title is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  placeholder="Describe what you're looking for, the campaign goals, and any specific requirements..."
                  rows={4}
                  maxLength={500}
                  onBlur={() => setTouched({ ...touched, description: true })}
                  className={`w-full p-3.5 rounded-xl bg-gray-50 border focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all duration-200 resize-none ${
                    touched.description && !form.description
                      ? "border-red-300 bg-red-50/30"
                      : "border-gray-200"
                  }`}
                />
                <p className={`text-xs mt-1 text-right ${
                  form.description.length >= 500 ? "text-red-500 font-medium" : "text-gray-400"
                }`}>
                  {form.description.length}/500
                </p>
                {touched.description && !form.description && (
                  <p className="text-xs text-red-500 mt-1">Description is required</p>
                )}
              </div>
            </div>
          </div>

          {/* ── Section 2: Budget, Niche, Deadline ── */}
          <div className="reveal delay-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e7bdd3]/30 to-[#5157a1]/10 flex items-center justify-center text-lg">
                ⚙️
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#393873]">
                  Campaign Settings
                </h2>
                <p className="text-xs text-gray-400">
                  Budget, category and timeline
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Budget (₹) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                    ₹
                  </span>
                  <input
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    required
                    type="number"
                    min="0"
                    placeholder="20,000"
                    className="w-full p-3.5 pl-8 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Niche <span className="text-red-400">*</span>
                </label>
                <select
                  name="niche"
                  value={form.niche}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all duration-200 appearance-none"
                >
                  <option value="" disabled>
                    Select Niche
                  </option>
                  {niches.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Deadline <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Token Cost
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={2}
                    disabled
                    className="w-full p-3.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded-lg">
                    Fixed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Section 3: Platforms ── */}
          <div className="reveal delay-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c7eff9]/30 to-[#5157a1]/10 flex items-center justify-center text-lg">
                📱
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#393873]">
                  Target Platforms
                </h2>
                <p className="text-xs text-gray-400">
                  Select platforms for this campaign
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {platforms.map((p) => (
                <button
                  type="button"
                  key={p.name}
                  onClick={() => togglePlatform(p.name)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl cursor-pointer transition-all duration-200 font-medium text-sm border
                    ${
                      form.platforms.includes(p.name)
                        ? "bg-[#5157a1] text-white border-[#5157a1] shadow-md shadow-[#5157a1]/20 scale-[0.97]"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                    }`}
                >
                  <span className="text-lg">{p.icon}</span>
                  {p.name}
                  {form.platforms.includes(p.name) && (
                    <span className="ml-1 text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Section 4: Requirements & Deliverables ── */}
          <div className="reveal delay-3 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/30 flex items-center justify-center text-lg">
                📝
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#393873]">
                  Requirements & Deliverables
                </h2>
                <p className="text-xs text-gray-400">
                  What you need from the creator
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  placeholder="e.g. Min 10K followers&#10;Must create original content&#10;English speaking"
                  rows={5}
                  className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all duration-200 resize-none"
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
                  placeholder="e.g. 1 YouTube video (5+ min)&#10;3 Instagram reels&#10;2 story mentions"
                  rows={5}
                  className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all duration-200 resize-none"
                />
              </div>
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="reveal delay-4 flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <Link
              to="/sponsor/my-campaigns"
              className="px-6 py-3.5 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 text-center hover:bg-gray-50 transition-all"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-semibold cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-[#5157a1]/20 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Creating…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  🚀 Create Campaign
                </span>
              )}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
