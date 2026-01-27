import Navbar from "../../components/Navbar"
import { Link } from "react-router-dom"

export default function BrowseCampaigns() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Browse Campaigns
            </h1>
            <p className="text-gray-500">
              Explore sponsorship opportunities that match your niche
            </p>
          </div>

          {/* FILTER BAR */}
          <div className="bg-white rounded-xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="border rounded-lg px-4 py-2">
              <option>All Niches</option>
              <option>Technology</option>
              <option>Gaming</option>
              <option>Fashion</option>
              <option>Fitness</option>
            </select>

            <select className="border rounded-lg px-4 py-2">
              <option>All Budgets</option>
              <option>Below ₹10,000</option>
              <option>₹10,000 – ₹25,000</option>
              <option>Above ₹25,000</option>
            </select>

            <button className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700">
              Apply Filters
            </button>
          </div>

          {/* CAMPAIGN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* CAMPAIGN CARD */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col">
              <h3 className="text-lg font-semibold mb-2">
                Smartphone Launch Promotion
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                TechCorp India
              </p>

              <p className="text-gray-600 flex-1">
                Looking for tech creators to promote our latest smartphone
                launch through video reviews and social media posts.
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-indigo-600 font-semibold">
                  ₹20,000
                </span>
                <Link
                  to="/creator/campaign/1"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>

            {/* CAMPAIGN CARD */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col">
              <h3 className="text-lg font-semibold mb-2">
                Gaming Accessories Review
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                GameZone
              </p>

              <p className="text-gray-600 flex-1">
                Seeking gaming creators for accessory reviews and gameplay
                integrations.
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-indigo-600 font-semibold">
                  ₹30,000
                </span>
                <Link
                  to="/creator/campaign/2"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>

            {/* CAMPAIGN CARD */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col">
              <h3 className="text-lg font-semibold mb-2">
                Fitness App Promotion
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                FitLife
              </p>

              <p className="text-gray-600 flex-1">
                Looking for fitness influencers to promote our mobile app
                through reels and stories.
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-indigo-600 font-semibold">
                  ₹15,000
                </span>
                <Link
                  to="/creator/campaign/3"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}
