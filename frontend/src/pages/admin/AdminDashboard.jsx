import { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../../api";
import { Hand } from "lucide-react";

/* -------------------- Palette -------------------- */
const COLORS = ["#c7eff9", "#e7bdd3", "#5157a1", "#393873"];

/* -------------------- CLOCK -------------------- */
function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#e1e1eb] px-6 py-3 rounded-2xl text-right shadow-sm">
      <p className="text-[#393873] font-semibold">
        {time.toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className="text-[#5157a1] text-sm">{time.toLocaleTimeString()}</p>
    </div>
  );
}

/* -------------------- DASHBOARD -------------------- */
export default function AdminDashboard() {
  /* ── Stats ── */
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    creators: 0,
    sponsors: 0,
    campaigns: 0,
    activeCampaigns: 0,
    totalApplications: 0,
  });

  /* ── Chart data ── */
  const [roleData, setRoleData] = useState([
    { name: "Content Creators", value: 0 },
    { name: "Sponsors", value: 0 },
  ]);
  const [userTypeData, setUserTypeData] = useState([
    { name: "Total Users", value: 0 },
    { name: "Active Users", value: 0 },
  ]);

  /* ── Campaign table ── */
  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);

  /* ── Fetch dashboard stats ── */
  useEffect(() => {
    api
      .get("/admin/dashboard")
      .then((res) => {
        const u = res.data.users || {};
        setStats({
          totalUsers: u.total || 0,
          activeUsers: u.active || 0,
          creators: u.creators || 0,
          sponsors: u.sponsors || 0,
          campaigns: res.data.campaigns || 0,
          activeCampaigns: res.data.activeCampaigns || 0,
          totalApplications: res.data.totalApplications || 0,
        });
        setRoleData([
          { name: "Content Creators", value: u.creators || 0 },
          { name: "Sponsors", value: u.sponsors || 0 },
        ]);
        setUserTypeData([
          { name: "Total Users", value: u.total || 0 },
          { name: "Active Users", value: u.active || 0 },
        ]);
      })
      .catch(() => { });
  }, []);

  /* ── Fetch campaigns ── */
  useEffect(() => {
    api
      .get("/admin/campaigns")
      .then((res) => setCampaigns(res.data.campaigns || []))
      .catch(() => { })
      .finally(() => setLoadingCampaigns(false));
  }, []);

  /* ── Campaign actions ── */
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "paused" : "active";
    try {
      await api.put("/admin/campaign-status", {
        campaign_id: id,
        status: newStatus,
      });
      setCampaigns((prev) =>
        prev.map((c) =>
          c.campaign_id === id ? { ...c, status: newStatus } : c
        )
      );
      // Update stats
      setStats((prev) => ({
        ...prev,
        activeCampaigns:
          newStatus === "active"
            ? prev.activeCampaigns + 1
            : prev.activeCampaigns - 1,
      }));
    } catch {
      /* ignore */
    }
  };

  const deleteCampaign = async (id) => {
    if (!window.confirm("Are you sure you want to delete this campaign?"))
      return;
    try {
      await api.delete(`/admin/campaign?id=${id}`);
      const removed = campaigns.find((c) => c.campaign_id === id);
      setCampaigns((prev) => prev.filter((c) => c.campaign_id !== id));
      setStats((prev) => ({
        ...prev,
        campaigns: prev.campaigns - 1,
        activeCampaigns:
          removed?.status === "active"
            ? prev.activeCampaigns - 1
            : prev.activeCampaigns,
      }));
    } catch {
      /* ignore */
    }
  };

  const memoUserTypeData = useMemo(() => userTypeData, [userTypeData]);
  const memoRoleData = useMemo(() => roleData, [roleData]);

  /* ── Stat cards driven by live data ── */
  const statCards = [
    { label: "Total Users", value: stats.totalUsers },
    { label: "Active Users", value: stats.activeUsers },
    { label: "Total Campaigns", value: stats.campaigns },
    { label: "Total Applications", value: stats.totalApplications },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-5xl font-extrabold text-[#393873] leading-tight">
                Hi, Admin <Hand size={36} className="inline text-[#5157a1]" />
              </h1>
              <p className="text-[#5157a1] mt-2 text-lg">
                Dashboard overview for SponzaMe
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Clock />
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            {statCards.map((item, i) => (
              <div
                key={i}
                className="bg-[#e1e1eb] rounded-2xl p-5 text-center shadow-sm"
              >
                <p className="text-2xl font-bold text-[#393873]">
                  {item.value}
                </p>
                <p className="text-[#5157a1] text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Pie Chart 1 */}
            <div className="bg-white border border-[#e1e1eb] rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#393873] mb-4">
                User Distribution
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={memoUserTypeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label
                      isAnimationActive={true}
                      animationDuration={600}
                      animationEasing="ease-in-out"
                    >
                      {memoUserTypeData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart 2 */}
            <div className="bg-white border border-[#e1e1eb] rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#393873] mb-4">
                Creators vs Sponsors
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={memoRoleData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label
                      isAnimationActive={true}
                      animationDuration={600}
                      animationEasing="ease-in-out"
                    >
                      {memoRoleData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ── Campaign Management Table ── */}
          <div className="bg-white border border-[#e1e1eb] rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#393873] mb-4">
              Manage Campaigns
            </h2>

            {loadingCampaigns ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-[#5157a1]/20 border-t-[#5157a1] rounded-full animate-spin" />
              </div>
            ) : campaigns.length === 0 ? (
              <p className="text-gray-400 text-center py-10">
                No campaigns found.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-[#e1e1eb] text-[#5157a1]">
                      <th className="py-3 px-4 font-semibold">Title</th>
                      <th className="py-3 px-4 font-semibold">Sponsor</th>
                      <th className="py-3 px-4 font-semibold text-center">
                        Applicants
                      </th>
                      <th className="py-3 px-4 font-semibold text-center">
                        Status
                      </th>
                      <th className="py-3 px-4 font-semibold text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((c) => (
                      <tr
                        key={c.campaign_id}
                        className="border-b border-[#e1e1eb]/50 hover:bg-[#f5f5fa] transition-colors"
                      >
                        <td className="py-3 px-4 font-medium text-[#393873]">
                          {c.title}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {c.sponsor_name || "—"}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#5157a1]/10 text-[#5157a1]">
                            {c.applicant_count}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full ${c.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                              }`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                toggleStatus(c.campaign_id, c.status)
                              }
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${c.status === "active"
                                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                  : "bg-green-100 text-green-700 hover:bg-green-200"
                                }`}
                            >
                              {c.status === "active" ? "Pause" : "Activate"}
                            </button>
                            <button
                              onClick={() => deleteCampaign(c.campaign_id)}
                              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
