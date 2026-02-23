import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api";

/* ── Role-based navigation links ── */
const NAV_LINKS = {
  guest: [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/sponsors", label: "Sponsors" },
    { to: "/contact", label: "Contact" },
  ],
  creator: [
    { to: "/creator/dashboard", label: "Dashboard" },
    { to: "/creator/campaigns", label: "Browse Campaigns" },
    { to: "/creator/applications", label: "My Applications" },
    { to: "/user/shop", label: "Token Shop" },
  ],
  sponsor: [
    { to: "/sponsor/dashboard", label: "Dashboard" },
    { to: "/sponsor/creators", label: "Browse Creators" },
    { to: "/sponsor/my-campaigns", label: "My Campaigns" },
    { to: "/sponsor/create-campaign", label: "Create Campaign" },
  ],
  admin: [
    { to: "/admin/admindashboard", label: "Admin Dashboard" },
  ],
};

const PROFILE_PATH = {
  creator: "/creator/profile",
  sponsor: "/sponsor/profile",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  /* Fetch current user on mount & route change */
  useEffect(() => {
    let cancelled = false;
    api
      .get("/auth/me")
      .then((res) => {
        if (!cancelled) setUser(res.data.user);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on desktop resize */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    if (!dropdownOpen) return;
    const close = () => setDropdownOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      /* ignore */
    }
    setUser(null);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const links = NAV_LINKS[user?.role] || NAV_LINKS.guest;
  const initial = user?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <>
      {/* Spacer to prevent content overlap with fixed navbar */}
      <div className="h-16 lg:h-20" />
      <nav
        className={`
        fixed top-0 left-0 right-0 w-full z-50
        transition-all duration-300 ease-in-out
        ${
          scrolled || mobileMenuOpen
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-[#e1e1eb]"
            : "bg-transparent"
        }
      `}
      >
        {/* Full-width container */}
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center gap-2 text-xl lg:text-2xl font-bold text-[#393873] transition-all duration-300 hover:scale-105"
            >
              <object
                data="/SponzaMe-Logo.svg"
                alt="SponzaMe Logo"
                className="h-8   w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-sm lg:text-base">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative font-medium transition-all duration-300 group ${
                    location.pathname === link.to
                      ? "text-[#5157a1]"
                      : "text-gray-600 hover:text-[#5157a1]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#5157a1] to-[#393873] transition-all duration-300 ${
                      location.pathname === link.to
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center gap-4">
              {loading ? (
                /* tiny spinner while auth state loads */
                <div className="w-8 h-8 rounded-full border-2 border-[#e4e4ee] border-t-[#5157a1] animate-spin" />
              ) : user ? (
                /* ── Logged-in: avatar + dropdown ── */
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen((prev) => !prev);
                    }}
                    className="flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-300 hover:bg-[#5157a1]/10 group"
                  >
                    {/* Avatar circle */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5157a1] to-[#393873] flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg transition-shadow">
                      {initial}
                    </div>
                    <span className="text-sm font-semibold text-[#393873] max-w-[120px] truncate">
                      {user.name}
                    </span>
                    {/* Chevron */}
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#e1e1eb] py-2 animate-in fade-in slide-in-from-top-2 z-50">
                      {/* User info header */}
                      <div className="px-4 py-3 border-b border-[#e1e1eb]">
                        <p className="text-sm font-semibold text-[#393873] truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.email}
                        </p>
                        <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#5157a1]/10 text-[#5157a1]">
                          {user.role}
                        </span>
                      </div>

                      {/* Profile link */}
                      {PROFILE_PATH[user.role] && (
                        <Link
                          to={PROFILE_PATH[user.role]}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#5157a1]/10 hover:text-[#5157a1] transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          My Profile
                        </Link>
                      )}

                      {/* Token count */}
                      {(user.role === "creator" || user.role === "sponsor") && (
                        <Link
                          to="/user/shop"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#5157a1]/10 hover:text-[#5157a1] transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>Tokens</span>
                          <span className="ml-auto px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-[#5157a1] to-[#393873] text-white">
                            {user.token_count ?? 0}
                          </span>
                        </Link>
                      )}

                      {/* Divider + Logout */}
                      <div className="border-t border-[#e1e1eb] mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors rounded-b-xl"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* ── Guest: Login / Sign Up buttons ── */
                <>
                  <Link
                    to="/login"
                    className="relative px-5 py-2.5 text-sm lg:text-base font-medium text-[#5157a1] rounded-lg transition-all duration-300 hover:bg-[#5157a1]/10 hover:shadow-md group overflow-hidden"
                  >
                    <span className="relative z-10">Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="relative px-6 py-2.5 text-sm lg:text-base font-medium rounded-lg bg-gradient-to-r from-[#5157a1] to-[#393873] text-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-[#393873] hover:to-[#5157a1] overflow-hidden group"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-all duration-300 hover:bg-[#5157a1]/10"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-[#393873] transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-[#393873] transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0 scale-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-[#393873] transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-4 space-y-2 bg-white/95 backdrop-blur-lg border-t border-[#e1e1eb]">
            {/* Mobile user info header (logged in only) */}
            {user && (
              <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-gradient-to-r from-[#5157a1]/5 to-[#393873]/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5157a1] to-[#393873] flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {initial}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#393873] truncate">
                    {user.name}
                  </p>
                  <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#5157a1]/10 text-[#5157a1]">
                    {user.role}
                  </span>
                </div>
                {(user.role === "creator" || user.role === "sponsor") && (
                  <span className="ml-auto px-2.5 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-[#5157a1] to-[#393873] text-white">
                    🪙 {user.token_count ?? 0}
                  </span>
                )}
              </div>
            )}

            {/* Nav links */}
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 font-medium rounded-lg transition-all duration-300 hover:translate-x-2 ${
                  location.pathname === link.to
                    ? "bg-[#5157a1]/10 text-[#5157a1]"
                    : "text-gray-600 hover:bg-[#5157a1]/10 hover:text-[#5157a1]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile auth section */}
            <div className="pt-4 mt-4 border-t border-[#e1e1eb] space-y-3">
              {user ? (
                <>
                  {/* Profile link */}
                  {PROFILE_PATH[user.role] && (
                    <Link
                      to={PROFILE_PATH[user.role]}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center font-medium text-[#5157a1] rounded-lg border-2 border-[#5157a1] transition-all duration-300 hover:bg-[#5157a1] hover:text-white"
                    >
                      My Profile
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-3 text-center font-medium rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center font-medium text-[#5157a1] rounded-lg border-2 border-[#5157a1] transition-all duration-300 hover:bg-[#5157a1] hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center font-medium rounded-lg bg-gradient-to-r from-[#5157a1] to-[#393873] text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}