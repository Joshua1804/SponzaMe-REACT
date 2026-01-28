import { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

/* -------------------- DATA -------------------- */
const userTypeData = [
  { name: "Free Users", value: 400 },
  { name: "Basic Users", value: 300 },
  { name: "Value Users", value: 250 },
  { name: "Premium Users", value: 200 },
];

const roleData = [
  { name: "Content Creators", value: 650 },
  { name: "Sponsors", value: 450 },
];

const COLORS = ["#c7eff9", "#e7bdd3", "#5157a1", "#393873"];

/* -------------------- CLOCK COMPONENT -------------------- */
function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

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
      <p className="text-[#5157a1] text-sm">
        {time.toLocaleTimeString()}
      </p>
    </div>
  );
}

/* -------------------- DASHBOARD -------------------- */
export default function AdminDashboard() {

  // Memoized data so charts NEVER re-render unless page reloads
  const memoUserTypeData = useMemo(() => userTypeData, []);
  const memoRoleData = useMemo(() => roleData, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-5xl font-extrabold text-[#393873] leading-tight">
                Hi, Admin 👋
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
            {[
              { label: "Total Users", value: "1,240" },
              { label: "Active Today", value: "320" },
              { label: "Retention", value: "78%" },
              { label: "Revenue", value: "₹45,600" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#e1e1eb] rounded-2xl p-5 text-center shadow-sm"
              >
                <p className="text-2xl font-bold text-[#393873]">
                  {item.value}
                </p>
                <p className="text-[#5157a1] text-sm mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">

            {/* Pie Chart 1 */}
            <div className="bg-white border border-[#e1e1eb] rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#393873] mb-4">
                User Plan Distribution
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
                      {memoUserTypeData.map((entry, index) => (
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
                      {memoRoleData.map((entry, index) => (
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

          {/* Manage Campaigns */}
          <div className="bg-white border border-[#e1e1eb] rounded-3xl p-6 shadow-sm flex flex-col justify-between max-w-md">
            <div>
              <h2 className="text-xl font-semibold text-[#393873] mb-3">
                Manage Campaigns
              </h2>

              <ul className="text-black space-y-2 text-sm">
                <li>• Create campaigns</li>
                <li>• Edit campaigns</li>
                <li>• Pause or delete</li>
                <li>• Track performance</li>
              </ul>
            </div>

            <button className="mt-6 bg-[#5157a1] text-white py-3 rounded-full hover:bg-[#393873] transition cursor-pointer">
              Open Campaign Manager
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
