import { Link } from "react-router-dom"
import Navbar from "../../components/Navbar"

export default function Login() {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow p-8">

          <h2 className="text-2xl font-bold text-center mb-2">
            Welcome back
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Login to your SponzaMe account
          </p>

          {/* FORM */}
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Login
            </button>
          </form>

          {/* LINKS */}
          <div className="flex justify-between text-sm text-gray-500 mt-4">
            <Link to="/signup" className="hover:underline">
              Create account
            </Link>
            <span className="cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

        </div>
      </div>
    </>
  )
}
