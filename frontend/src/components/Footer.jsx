import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#393873] via-[#4a4a8a] to-[#5157a1] text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="inline-block group">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent transition-all duration-300 group-hover:from-white group-hover:to-purple-200">
                  SponzaMe
                </h3>
              </Link>
              <p className="mt-4 text-white/70 leading-relaxed max-w-xs">
                The structured sponsorship marketplace connecting creators and brands seamlessly.
              </p>

              {/* Social Icons */}
              <div className="mt-6 flex items-center gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-[#393873] hover:scale-110 hover:shadow-lg hover:shadow-white/20"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-[#393873] hover:scale-110 hover:shadow-lg hover:shadow-white/20"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-[#393873] hover:scale-110 hover:shadow-lg hover:shadow-white/20"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-[#393873] hover:scale-110 hover:shadow-lg hover:shadow-white/20"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="text-lg font-semibold mb-5 relative inline-block">
                Platform
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-white to-transparent"></span>
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/login" className="text-white/70 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="text-white/70 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white/70 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/sponsors" className="text-white/70 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                    Find Sponsors
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-5 relative inline-block">
                Support
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-white to-transparent"></span>
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/help" className="text-white/70 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white/70 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-white/70 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-white/70 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-5 relative inline-block">
                Stay Updated
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-white to-transparent"></span>
              </h4>
              <p className="text-white/70 text-sm mb-4">
                Subscribe to our newsletter for the latest updates.
              </p>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-white text-[#393873] font-semibold transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} SponzaMe. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-white/60">
                <Link to="/privacy" className="hover:text-white transition-colors duration-300">
                  Privacy
                </Link>
                <Link to="/terms" className="hover:text-white transition-colors duration-300">
                  Terms
                </Link>
                <Link to="/cookies" className="hover:text-white transition-colors duration-300">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}