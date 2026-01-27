import Navbar from "../../components/Navbar"

export default function CreatorDashboard() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Creator Dashboard
              </h1>
              <p className="text-gray-500">
                Manage your profile and sponsorship applications
              </p>
            </div>

            {/* TOKEN CARD */}
            <div className="mt-4 md:mt-0 bg-white rounded-xl shadow px-6 py-4">
              <p className="text-sm text-gray-500">Token Balance</p>
              <p className="text-2xl font-bold text-indigo-600">
                120 🪙
              </p>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* PROFILE SUMMARY */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">
                Profile Summary
              </h2>

              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Name:</span> John Creator</p>
                <p><span className="font-medium">Niche:</span> Tech & Gadgets</p>
                <p><span className="font-medium">Status:</span> Profile Complete</p>
              </div>

              <button className="mt-4 w-full border border-indigo-600 text-indigo-600 py-2 rounded hover:bg-indigo-50">
                Edit Profile
              </button>
            </div>

            {/* APPLICATIONS */}
            <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">
                Applied Campaigns
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b text-gray-500 text-sm">
                      <th className="py-2">Campaign</th>
                      <th>Status</th>
                      <th>Budget</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr className="border-b">
                      <td className="py-3">Tech Product Review</td>
                      <td>
                        <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                          Pending
                        </span>
                      </td>
                      <td>₹15,000</td>
                    </tr>

                    <tr className="border-b">
                      <td className="py-3">Gaming Accessories Promotion</td>
                      <td>
                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                          Accepted
                        </span>
                      </td>
                      <td>₹25,000</td>
                    </tr>

                    <tr>
                      <td className="py-3">Mobile App Launch</td>
                      <td>
                        <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                          Rejected
                        </span>
                      </td>
                      <td>₹10,000</td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}
