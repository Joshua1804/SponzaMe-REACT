import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import api from "../api";

const DASHBOARD = {
  creator: "/creator/dashboard",
  sponsor: "/sponsor/dashboard",
  admin: "/admin/admindashboard",
};

/**
 * Auth guard wrapper.
 *  - If not logged in  → redirect to /login
 *  - If wrong role     → redirect to that role's dashboard
 *  - Shows a spinner while checking
 */
export default function ProtectedRoute({ role, children }) {
  const [status, setStatus] = useState("loading"); // loading | ok | unauth | wrong
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    api
      .get("/auth/me")
      .then((res) => {
        if (cancelled) return;
        const u = res.data.user;
        if (!u) {
          setStatus("unauth");
        } else if (role && u.role !== role) {
          setUserRole(u.role);
          setStatus("wrong");
        } else {
          setStatus("ok");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("unauth");
      });
    return () => {
      cancelled = true;
    };
  }, [role, location.pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#5157a1]/20 border-t-[#5157a1] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Checking access…</p>
        </div>
      </div>
    );
  }

  if (status === "unauth") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (status === "wrong") {
    return <Navigate to={DASHBOARD[userRole] || "/"} replace />;
  }

  return children;
}
