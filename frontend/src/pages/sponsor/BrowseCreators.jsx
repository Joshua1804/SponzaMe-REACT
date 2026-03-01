import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../api";
import { Handshake, Search, AlertTriangle, Users, MapPin } from "lucide-react";

export default function BrowseCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [nicheFilter, setNicheFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");

  /* ── Page title ── */
  useEffect(() => { document.title = "Browse Creators — SponzaMe"; }, []);

  /* ── Fetch creators from backend ── */
  useEffect(() => {
    api
      .get("/sponsor/creators")
      .then((res) => setCreators(res.data.creators || []))
      .catch((err) =>
        setError(err.response?.data?.error || "Failed to load creators.")
      )
      .finally(() => setLoading(false));
  }, []);

  /* ── Scroll reveal ── */
  useEffect(() => {
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
  }, [loading]);

  /* ── Derive unique niches & platforms for filters ── */
  const allNiches = [
    "All",
    ...new Set(creators.map((c) => c.niche).filter(Boolean)),
  ];
  const allPlatforms = (() => {
    const set = new Set();
    creators.forEach((c) => {
      if (c.platforms) {
        c.platforms.split(",").forEach((p) => set.add(p.trim()));
      }
    });
    return ["All", ...set];
  })();

  /* ── Filter ── */
  const filtered = creators
    .filter((c) => nicheFilter === "All" || c.niche === nicheFilter)
    .filter(
      (c) =>
        platformFilter === "All" ||
        (c.platforms && c.platforms.includes(platformFilter))
    )
    .filter(
      (c) =>
        !searchQuery ||
        (c.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.fullname || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.niche || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

  /* ── Colour palette per niche ── */
  const nicheColors = {
    Technology: "from-blue-400 to-indigo-500",
    Fashion: "from-pink-400 to-rose-500",
    Gaming: "from-purple-400 to-violet-500",
    Fitness: "from-emerald-400 to-teal-500",
    Food: "from-orange-400 to-amber-500",
    Travel: "from-cyan-400 to-blue-500",
    Education: "from-yellow-400 to-orange-400",
    Music: "from-fuchsia-400 to-pink-500",
  };
  const getColor = (niche) =>
    nicheColors[niche] || "from-[#5157a1] to-[#393873]";

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
          <div className="max-w-7xl mx-auto text-center">
            <div className="reveal max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                <Handshake size={18} className="text-white" />
                <span className="text-sm font-medium text-white/90">
                  Discover Talent
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Browse{" "}
                <span className="bg-gradient-to-r from-[#c7eff9] to-[#e7bdd3] bg-clip-text text-transparent">
                  Creators
                </span>
              </h1>
              <p className="text-white/70 text-lg">
                Find creators that match your brand and send them your
                campaigns directly
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="reveal bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-2 relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Search by name or niche..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 focus:border-[#5157a1] transition-all"
                />
              </div>

              <select
                value={nicheFilter}
                onChange={(e) => setNicheFilter(e.target.value)}
                className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 transition-all"
              >
                {allNiches.map((n) => (
                  <option key={n} value={n}>
                    {n === "All" ? "All Niches" : n}
                  </option>
                ))}
              </select>

              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 transition-all"
              >
                {allPlatforms.map((p) => (
                  <option key={p} value={p}>
                    {p === "All" ? "All Platforms" : p}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Creator Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-200" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-4/5 mb-4" />
                  <div className="flex gap-2 mb-4">
                    <div className="h-8 bg-gray-200 rounded-xl w-1/2" />
                    <div className="h-8 bg-gray-200 rounded-xl w-1/2" />
                  </div>
                  <div className="h-10 bg-gray-200 rounded-xl" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                <AlertTriangle size={28} className="text-red-500" />
              </div>
              <h3 className="font-bold text-gray-700 mb-2">
                Failed to load creators
              </h3>
              <p className="text-gray-500 text-sm mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl bg-[#5157a1] text-white font-semibold hover:shadow-lg transition-all"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && creators.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#5157a1]/10 to-[#c7eff9]/30 flex items-center justify-center mb-4">
                <Users size={36} className="text-[#5157a1]" />
              </div>
              <h3 className="text-xl font-bold text-[#393873] mb-2">
                No Creators Yet
              </h3>
              <p className="text-gray-500">
                There are no registered creators on the platform yet.
              </p>
            </div>
          )}

          {/* No filter results */}
          {!loading && !error && creators.length > 0 && filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <Search size={28} className="text-gray-500" />
              </div>
              <h3 className="font-bold text-gray-700 mb-2">
                No creators match your filters
              </h3>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setNicheFilter("All");
                  setPlatformFilter("All");
                }}
                className="text-[#5157a1] font-medium hover:underline mt-2"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Creator cards */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((creator, i) => {
                const color = getColor(creator.niche);
                const name = creator.fullname || creator.name || "Creator";
                const initial = name.charAt(0).toUpperCase();
                const platforms = creator.platforms
                  ? creator.platforms.split(",").map((p) => p.trim())
                  : [];

                return (
                  <div
                    key={creator.user_id}
                    className="reveal group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {/* Accent bar */}
                    <div className={`h-1.5 bg-gradient-to-r ${color}`} />

                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-lg font-bold shadow-lg`}
                          >
                            {initial}
                          </div>
                          <div>
                            <h3 className="font-bold text-[#393873]">
                              {name}
                            </h3>
                            {creator.location && (
                              <p className="text-xs text-gray-500">
                                <MapPin size={12} className="inline" /> {creator.location}
                              </p>
                            )}
                          </div>
                        </div>
                        {creator.niche && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#5157a1]/10 text-[#5157a1]">
                            {creator.niche}
                          </span>
                        )}
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {creator.bio || creator.description || "No bio available."}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-4 p-3 rounded-xl bg-gray-50">
                        <div className="text-center flex-1">
                          <p className="text-lg font-bold text-[#5157a1]">
                            {creator.followers || "—"}
                          </p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                            Followers
                          </p>
                        </div>
                        {creator.pricing && (
                          <>
                            <div className="w-px h-8 bg-gray-200" />
                            <div className="text-center flex-1">
                              <p className="text-sm font-bold text-emerald-600 truncate">
                                {creator.pricing}
                              </p>
                              <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                                Pricing
                              </p>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Platforms */}
                      {platforms.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {platforms.map((p, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <Link
                        to={`/sponsor/creator/${creator.user_id}`}
                        className="block text-center py-3 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-semibold hover:shadow-lg hover:shadow-[#5157a1]/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all text-sm"
                      >
                        View Profile & Send Campaign →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
