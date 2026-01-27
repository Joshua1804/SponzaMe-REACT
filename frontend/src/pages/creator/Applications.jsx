import Navbar from "../../components/Navbar"

export default function Applications() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              My Applications
            </h1>
            <p className="text-gray-500">
              Track the status of your campaign applications
            </p>
          </div>

          {/* APPLICATIONS TABLE */}
          <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-500 text-sm">
                  <th className="py-3">Campaign</th>
                  <th>Sponsor</th>
                  <th>Status</th>
                  <th>Budget</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>

                <tr className="border-b">
                  <td className="py-4">Smartphone Launch Promotion</td>
                  <td>TechCorp India</td>
                  <td>
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                      Pending
                    </span>
                  </td>
                  <td>₹20,000</td>
                  <td>
                    <button className="text-gray-400 cursor-not-allowed">
                      Locked
                    </button>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-4">Gaming Accessories Review</td>
                  <td>GameZone</td>
                  <td>
                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                      Accepted
                    </span>
                  </td>
                  <td>₹30,000</td>
                  <td>
                    <button className="text-indigo-600 hover:underline">
                      View Contact (5 🪙)
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="py-4">Fitness App Promotion</td>
                  <td>FitLife</td>
                  <td>
                    <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                      Rejected
                    </span>
                  </td>
                  <td>₹15,000</td>
                  <td>
                    <button className="text-gray-400 cursor-not-allowed">
                      Locked
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  )
}
