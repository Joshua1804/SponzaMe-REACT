import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../../components/Navbar"


export default function Signup() {
  const [role, setRole] = useState("creator")

  return (
    <>
  <Navbar />
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    {/* existing signup code */}

    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8">

        <h2 className="text-2xl font-bold text-center mb-2">
          Create your account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join SponzaMe as a Creator or Sponsor
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

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* ROLE SELECTION */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Select your role
            </p>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setRole("creator")}
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  role === "creator"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                Creator
              </button>

              <button
                type="button"
                onClick={() => setRole("sponsor")}
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  role === "sponsor"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                Sponsor
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Sign Up
          </button>
        </form>

        {/* FOOTER LINKS */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
      </div>
</>
  )
}
