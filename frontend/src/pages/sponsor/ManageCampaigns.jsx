import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function ManageCampaigns() {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState([
    {
      campaign_id: 1,
      title: "Instagram Fashion Promo",
      platform: "Instagram",
      budget: 5000,
      tokens_used: 2,
      status: "Active",
      created_at: "2026-01-20",
    },
    {
      campaign_id: 2,
      title: "YouTube Tech Review",
      platform: "YouTube",
      budget: 10000,
      tokens_used: 2,
      status: "Closed",
      created_at: "2026-01-22",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.campaign_id === id ? { ...c, status: newStatus } : c
      )
    );
  };

  return (
    <>
      <Navbar />

      <div className="pt-16 bg-gray-50 min-h-screen">
        {/* HERO */}
        <div className="bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] py-12">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <nav className="text-sm text-white/60 mb-4">
              <Link to="/sponsor/dashboard" className="hover:text-white">
                Dashboard
              </Link>{" "}
              → <span className="text-white">Manage Campaigns</span>
            </nav>

            <h1 className="text-3xl font-bold mb-2">
              Manage Campaigns
            </h1>
            <p className="text-white/70">
              Track performance and manage campaign statuses
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-8 py-5 text-left">Title</th>
                  <th className="px-8 py-5 text-left">Platform</th>
                  <th className="px-8 py-5 text-left">Budget (₹)</th>
                  <th className="px-8 py-5 text-left">Tokens</th>
                  <th className="px-8 py-5 text-left">Created</th>
                  <th className="px-8 py-5 text-left">Status</th>
                  <th className="px-8 py-5 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {campaigns.map((campaign) => {
                  const isClosed = campaign.status === "Closed";

                  return (
                    <tr
                      key={campaign.campaign_id}
                      className="border-t border-gray-100/70  hover:bg-gray-50 transition-all duration-200"
                    >
                      <td className="px-8 py-6 font-semibold text-gray-800">
                        {campaign.title}
                      </td>

                      <td className="px-8 py-6 text-gray-600">
                        {campaign.platform}
                      </td>

                      <td className="px-8 py-6 font-medium">
                        ₹{campaign.budget}
                      </td>

                      <td className="px-8 py-6">
                        {campaign.tokens_used}
                      </td>

                      <td className="px-8 py-6 text-gray-500">
                        {campaign.created_at}
                      </td>

                      {/* STATUS BADGE */}
                      <td className="px-8 py-6">
                        <span
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold ${campaign.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : campaign.status === "Paused"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                            }`}
                        >
                          {campaign.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-8 py-6 flex gap-4 items-center">

                        {/* Modern Select */}
                        <select
                          value={campaign.status}
                          disabled={isClosed}
                          onChange={(e) =>
                            handleStatusChange(
                              campaign.campaign_id,
                              e.target.value
                            )
                          }
                          className={`px-3 py-2 rounded-xl shadow-md text-sm
                            focus:outline-none focus:ring-2 focus:ring-[#5157a1]
                            transition-all
                            ${isClosed
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-white"
                            }`}
                        >
                          <option value="Active">Active</option>
                          <option value="Paused">Paused</option>
                          <option value="Closed">Closed</option>
                        </select>

                        {/* Gradient Button */}
                        <button
                          onClick={() =>
                            navigate(
                              `/sponsor/campaign/${campaign.campaign_id}/applicants`
                            )
                          }
                          disabled={isClosed}
                          className={`px-5 py-2 rounded-xl font-medium text-sm
                            transition-all duration-200
                            ${isClosed
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-[#5157a1] to-[#393873] text-white hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                            }`}
                        >
                          View Applicants
                        </button>

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {campaigns.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No campaigns found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
