import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          SponzaMe
        </Link>

        {/* NAV LINKS */}
        <nav className="space-x-6">
          <Link
            to="/login"
            className="text-gray-600 hover:text-indigo-600"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Sign Up
          </Link>
        </nav>

      </div>
    </header>
  )
}
