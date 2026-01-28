import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md border-b border-[#e1e1eb]"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-lg font-semibold text-[#393873]">
          SponzaMe
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm">
          <Link
            to="/login"
            className="text-gray-600 hover:text-[#5157a1] transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg bg-[#5157a1] text-white hover:bg-[#393873] transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
