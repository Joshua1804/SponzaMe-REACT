import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function CampaignApplicants() {
  const { id } = useParams();

  const [campaignStatus, setCampaignStatus] = useState("Open");

  const [applicants, setApplicants] = useState([
    {
      application_id: 1,
      creator_name: "Aarav Mehta",
      platform: "Instagram",
      followers: 25000,
      expected_price: 4000,
      status: "Pending",
    },
    {
      application_id: 2,
      creator_name: "Shreeya Bajpai",
      platform: "YouTube",
      followers: 50000,
      expected_price: 7000,
      status: "Pending",
    },
    {
      application_id: 3,
      creator_name: "Riya Sharma",
      platform: "Instagram",
      followers: 18000,
      expected_price: 3000,
      status: "Rejected",
    },
  ]);

  const approveCreator = (approvedId) => {
    setApplicants((prev) =>
      prev.map((app) => {
        if (app.application_id === approvedId) {
          return { ...app, status: "Approved" };
        }
        if (app.status === "Pending") {
          return { ...app, status: "Rejected" };
        }
        return app;
      })
    );

    setCampaignStatus("Closed");
  };

  const rejectCreator = (rejectedId) => {
    setApplicants((prev) =>
      prev.map((app) =>
        app.application_id === rejectedId
          ? { ...app, status: "Rejected" }
          : app
      )
    );
  };

  const isCampaignClosed = campaignStatus === "Closed";

  return (
    <>
      <Navbar />

      <div className="pt-16 bg-gray-50 min-h-screen">

        {/* HERO */}
        <div className="bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] py-12">
          <div className="max-w-6xl mx-auto px-6 text-white">
            <nav className="text-sm text-white/60 mb-4">
              <Link to="/sponsor/campaigns" className="hover:text-white">
                Manage Campaigns
              </Link>{" "}
              → <span className="text-white">Applicants</span>
            </nav>

            <h1 className="text-3xl font-bold mb-2">
              Campaign Applicants
            </h1>

            <p className="text-white/70">
              Campaign ID: {id}
            </p>

            <span
              className={`inline-block mt-4 px-5 py-2 rounded-full text-sm font-semibold ${isCampaignClosed
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
                }`}
            >
              {campaignStatus} Campaign
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-8 py-5 text-left">Creator</th>
                  <th className="px-8 py-5 text-left">Platform</th>
                  <th className="px-8 py-5 text-left">Followers</th>
                  <th className="px-8 py-5 text-left">Expected Price (₹)</th>
                  <th className="px-8 py-5 text-left">Status</th>
                  <th className="px-8 py-5 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {applicants.map((app) => {
                  const isDisabled =
                    isCampaignClosed || app.status !== "Pending";

                  return (
                    <tr
                      key={app.application_id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition-all duration-200"
                    >
                      <td className="px-8 py-6 font-semibold text-gray-800">
                        {app.creator_name}
                      </td>

                      <td className="px-8 py-6 text-gray-600">
                        {app.platform}
                      </td>

                      <td className="px-8 py-6">
                        {app.followers.toLocaleString()}
                      </td>

                      <td className="px-8 py-6 font-medium">
                        ₹{app.expected_price}
                      </td>

                      <td className="px-8 py-6">
                        <span
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold ${app.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : app.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {app.status}
                        </span>
                      </td>

                      <td className="px-8 py-6 flex gap-3">

                        <button
                          disabled={isDisabled}
                          onClick={() =>
                            approveCreator(app.application_id)
                          }
                          className={`px-4 py-2 rounded-xl text-sm font-medium
                            transition-all duration-200
                            ${isDisabled
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-green-600 text-white hover:bg-green-700 hover:shadow-md active:scale-95"
                            }`}
                        >
                          Approve
                        </button>

                        <button
                          disabled={isDisabled}
                          onClick={() =>
                            rejectCreator(app.application_id)
                          }
                          className={`px-4 py-2 rounded-xl text-sm font-medium
                            transition-all duration-200
                            ${isDisabled
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-red-600 text-white hover:bg-red-700 hover:shadow-md active:scale-95"
                            }`}
                        >
                          Reject
                        </button>

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {applicants.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No applications received yet.
              </p>
            )}
          </div>

          {isCampaignClosed && (
            <p className="mt-6 text-sm text-gray-500">
              This campaign is closed. No further actions are allowed.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
