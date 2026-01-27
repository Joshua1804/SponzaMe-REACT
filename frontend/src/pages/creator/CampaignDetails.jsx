import Navbar from "../../components/Navbar"
import { useParams } from "react-router-dom"

export default function CampaignDetails() {
  const { id } = useParams()

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Smartphone Launch Promotion
            </h1>
            <p className="text-gray-500">
              Sponsored by <span className="font-medium">TechCorp India</span>
            </p>
          </div>

          {/* CAMPAIGN META */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <p className="text-sm text-gray-500">Budget</p>
              <p className="text-lg font-semibold text-indigo-600">
                ₹20,000
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Niche</p>
              <p className="text-lg font-medium">Technology</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Required Platforms</p>
              <p className="text-lg font-medium">YouTube, Instagram</p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">
              Campaign Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We are launching our latest smartphone and are looking for
              technology content creators to produce in-depth reviews,
              unboxing videos, and social media posts. The collaboration
              should focus on highlighting key features and real-world usage.
            </p>
          </div>

          {/* REQUIREMENTS */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">
              Requirements
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Minimum 10k followers/subscribers</li>
              <li>1 YouTube video + 2 Instagram posts</li>
              <li>Content to be delivered within 14 days</li>
            </ul>
          </div>

          {/* APPLY SECTION */}
          <div className="border-t pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">
                Applying will cost
              </p>
              <p className="text-lg font-semibold text-indigo-600">
                5 Tokens 🪙
              </p>
            </div>

            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Apply for Campaign
            </button>
          </div>

          {/* DEBUG (ACADEMIC DEMO) */}
          <p className="text-xs text-gray-400 mt-6">
            Campaign ID: {id}
          </p>

        </div>
      </div>
    </>
  )
}
