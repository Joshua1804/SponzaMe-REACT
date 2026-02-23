import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../api";

export default function CreatorDetails() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ── Page title ── */
  useEffect(() => { document.title = "Creator Details — SponzaMe"; }, []);

  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState(null); // { type, message }

  /* ── Fetch creator + sponsor's campaigns ── */
  useEffect(() => {
    Promise.all([
      api.get(`/sponsor/creator/${id}`),
      api.get("/sponsor/campaigns"),
    ])
      .then(([creatorRes, campaignsRes]) => {
        setCreator(creatorRes.data.creator);
        // Only show active campaigns in the dropdown
        const active = (campaignsRes.data.campaigns || []).filter(
          (c) => c.status === "active"
        );
        setCampaigns(active);
      })
      .catch((err) =>
        setError(err.response?.data?.error || "Failed to load creator.")
      )
      .finally(() => setLoading(false));
  }, [id]);

  /* ── Scroll reveal ── */
  useEffect(() => {
    if (!creator) return;
    const els = document.querySelectorAll(".reveal:not(.active)");
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
  }, [creator, sendResult]);

  /* ── Send campaign ── */
  const handleSendCampaign = () => {
    if (!selectedCampaign) return;
    setSending(true);
    setSendResult(null);

    api
      .post("/sponsor/send-campaign", {
        campaign_id: Number(selectedCampaign),
        creator_user_id: Number(id),
      })
      .then((res) => {
        setSendResult({
          type: "success",
          message: res.data.message || "Invitation sent!",
        });
        setSelectedCampaign("");
      })
      .catch((err) => {
        const msg =
          err.response?.data?.error || "Failed to send campaign.";
        setSendResult({ type: "error", message: msg });
      })
      .finally(() => setSending(false));
  };

  /* ── Helpers ── */
  const name = creator?.fullname || creator?.name || "Creator";
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const platforms = creator?.platforms
    ? creator.platforms.split(",").map((p) => p.trim())
    : [];

  /* ── Loading ── */
  if (loading)
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#5157a1]/20 border-t-[#5157a1] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading creator profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );

  /* ── Error ── */
  if (error && !creator)
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh] flex-col gap-4">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-3xl">
            ⚠️
          </div>
          <p className="text-red-500">{error}</p>
          <Link
            to="/sponsor/creators"
            className="px-6 py-3 rounded-xl bg-[#5157a1] text-white font-semibold hover:shadow-lg transition-all"
          >
            ← Back to Creators
          </Link>
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="reveal flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link
                to="/sponsor/creators"
                className="hover:text-white transition-colors"
              >
                Browse Creators
              </Link>
              <span>→</span>
              <span className="text-white">{name}</span>
            </nav>

            {/* Profile header */}
            <div className="reveal flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#c7eff9] to-[#e7bdd3] flex items-center justify-center text-3xl font-bold text-[#393873] shadow-2xl">
                {initials}
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">
                  {name}
                </h1>
                {creator?.email && (
                  <p className="text-white/60 text-sm">{creator.email}</p>
                )}
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  {creator?.location && (
                    <span className="px-3 py-1 rounded-full bg-[#c7eff9]/20 text-[#c7eff9] text-sm font-medium border border-[#c7eff9]/30">
                      📍 {creator.location}
                    </span>
                  )}
                  {creator?.niche && (
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm font-medium border border-white/20">
                      🎯 {creator.niche}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="reveal delay-1 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                label: "Followers",
                value: creator?.followers || "—",
                icon: "👥",
                gradient: "from-blue-50 to-indigo-50",
              },
              {
                label: "Pricing",
                value: creator?.pricing || "—",
                icon: "💰",
                gradient: "from-emerald-50 to-teal-50",
              },
              {
                label: "Platforms",
                value: platforms.join(", ") || "—",
                icon: "📱",
                gradient: "from-purple-50 to-violet-50",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-4 border border-gray-100 shadow-sm`}
              >
                <div className="text-xl mb-1">{stat.icon}</div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-lg font-bold text-[#393873] truncate">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5157a1]/10 to-[#c7eff9]/30 flex items-center justify-center text-lg">
                  📝
                </div>
                <h2 className="text-lg font-bold text-[#393873]">
                  About Creator
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {creator?.bio ||
                  creator?.description ||
                  "No bio available."}
              </p>
            </div>

            {/* Platforms */}
            {platforms.length > 0 && (
              <div className="reveal delay-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/30 flex items-center justify-center text-lg">
                    📱
                  </div>
                  <h2 className="text-lg font-bold text-[#393873]">
                    Active Platforms
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {platforms.map((p, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-xl bg-gray-50 text-gray-700 font-medium text-sm border border-gray-200"
                    >
                      {p.toLowerCase() === "youtube"
                        ? "🎬"
                        : p.toLowerCase() === "instagram"
                        ? "📸"
                        : p.toLowerCase() === "twitter"
                        ? "🐦"
                        : p.toLowerCase() === "twitch"
                        ? "🎮"
                        : "📱"}{" "}
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social links */}
            {(creator?.instalink || creator?.youtube_url || creator?.twitter_url) && (
              <div className="reveal delay-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c7eff9]/30 to-[#5157a1]/10 flex items-center justify-center text-lg">
                    🔗
                  </div>
                  <h2 className="text-lg font-bold text-[#393873]">
                    Social Links
                  </h2>
                </div>
                <div className="space-y-2">
                  {[
                    {
                      label: "Instagram",
                      url: creator.instalink,
                      icon: "📸",
                    },
                    {
                      label: "YouTube",
                      url: creator.youtube_url,
                      icon: "🎬",
                    },
                    {
                      label: "Twitter",
                      url: creator.twitter_url,
                      icon: "🐦",
                    },
                  ]
                    .filter((s) => s.url)
                    .map((s, i) => (
                      <a
                        key={i}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#5157a1]/5 transition-colors group"
                      >
                        <span className="text-lg">{s.icon}</span>
                        <span className="font-medium text-gray-700 group-hover:text-[#5157a1] transition-colors">
                          {s.label}
                        </span>
                        <span className="ml-auto text-gray-400 text-sm group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </a>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* ── SEND CAMPAIGN CARD ── */}
            <div className="reveal delay-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center text-lg">
                  📤
                </div>
                <h3 className="font-bold text-[#393873]">
                  Send Campaign
                </h3>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Invite this creator to one of your active campaigns.
              </p>

              {campaigns.length === 0 ? (
                <div className="text-center p-4 rounded-xl bg-gray-50">
                  <p className="text-sm text-gray-500 mb-3">
                    No active campaigns available.
                  </p>
                  <Link
                    to="/sponsor/create-campaign"
                    className="text-sm text-[#5157a1] font-medium hover:underline"
                  >
                    Create a campaign first →
                  </Link>
                </div>
              ) : (
                <>
                  <select
                    value={selectedCampaign}
                    onChange={(e) => {
                      setSelectedCampaign(e.target.value);
                      setSendResult(null);
                    }}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/30 focus:border-[#5157a1] transition-all mb-3 text-sm"
                  >
                    <option value="">Select a campaign...</option>
                    {campaigns.map((c) => (
                      <option
                        key={c.campaign_id}
                        value={c.campaign_id}
                      >
                        {c.title}
                      </option>
                    ))}
                  </select>

                  <button
                    disabled={!selectedCampaign || sending}
                    onClick={handleSendCampaign}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-200
                      ${
                        !selectedCampaign || sending
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#5157a1] to-[#393873] text-white hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                      }`}
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>📤 Send Invitation</>
                    )}
                  </button>
                </>
              )}

              {/* Result feedback */}
              {sendResult && (
                <div
                  className={`mt-3 p-3 rounded-xl text-sm font-medium ${
                    sendResult.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {sendResult.type === "success" ? "✅" : "⚠️"}{" "}
                  {sendResult.message}
                </div>
              )}
            </div>

            {/* Creator ID */}
            <div className="text-center p-3 rounded-xl bg-gray-100 text-xs text-gray-400">
              Creator ID: {id}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
