import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Spacer to prevent content overlap with fixed navbar */}
      <div className="h-16 lg:h-20" />
      <nav
        className={`
        fixed top-0 left-0 right-0 w-full z-50
        transition-all duration-300 ease-in-out
        ${scrolled || mobileMenuOpen
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
              <span className="bg-gradient-to-r from-[#5157a1] to-[#393873] bg-clip-text text-transparent">
                SponzaMe
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-sm lg:text-base">
              <Link
                to="/"
                className="relative text-gray-600 font-medium transition-all duration-300 hover:text-[#5157a1] group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#5157a1] to-[#393873] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/about"
                className="relative text-gray-600 font-medium transition-all duration-300 hover:text-[#5157a1] group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#5157a1] to-[#393873] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/sponsors"
                className="relative text-gray-600 font-medium transition-all duration-300 hover:text-[#5157a1] group"
              >
                Sponsors
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#5157a1] to-[#393873] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/contact"
                className="relative text-gray-600 font-medium transition-all duration-300 hover:text-[#5157a1] group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#5157a1] to-[#393873] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
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
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-all duration-300 hover:bg-[#5157a1]/10"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-[#393873] transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-[#393873] transition-all duration-300 ${mobileMenuOpen ? "opacity-0 scale-0" : ""
                  }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-[#393873] transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-4 py-4 space-y-2 bg-white/95 backdrop-blur-lg border-t border-[#e1e1eb]">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-600 font-medium rounded-lg transition-all duration-300 hover:bg-[#5157a1]/10 hover:text-[#5157a1] hover:translate-x-2"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-600 font-medium rounded-lg transition-all duration-300 hover:bg-[#5157a1]/10 hover:text-[#5157a1] hover:translate-x-2"
            >
              About
            </Link>
            <Link
              to="/sponsors"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-600 font-medium rounded-lg transition-all duration-300 hover:bg-[#5157a1]/10 hover:text-[#5157a1] hover:translate-x-2"
            >
              Sponsors
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-600 font-medium rounded-lg transition-all duration-300 hover:bg-[#5157a1]/10 hover:text-[#5157a1] hover:translate-x-2"
            >
              Contact
            </Link>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 mt-4 border-t border-[#e1e1eb] space-y-3">
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
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}