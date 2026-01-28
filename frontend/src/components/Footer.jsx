export default function Footer() {
  return (
    <footer className="bg-[#e1e1eb] py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm text-gray-600">
        {/* Brand */}
        <div>
          <p className="font-semibold text-[#393873]">SponzaMe</p>
          <p className="mt-2 leading-relaxed">
            The structured sponsorship marketplace connecting creators and
            brands.
          </p>
        </div>

        {/* Platform */}
        <div>
          <p className="font-semibold text-[#393873]">Platform</p>
          <ul className="mt-2 space-y-1">
            <li className="hover:text-[#5157a1] cursor-pointer transition">
              Login
            </li>
            <li className="hover:text-[#5157a1] cursor-pointer transition">
              Signup
            </li>
            <li className="hover:text-[#5157a1] cursor-pointer transition">
              About
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <p className="font-semibold text-[#393873]">Support</p>
          <ul className="mt-2 space-y-1">
            <li className="hover:text-[#5157a1] cursor-pointer transition">
              Help Center
            </li>
            <li className="hover:text-[#5157a1] cursor-pointer transition">
              Contact
            </li>
            <li className="hover:text-[#5157a1] cursor-pointer transition">
              Privacy Policy
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} SponzaMe. All rights reserved.
      </div>
    </footer>
  );
}
