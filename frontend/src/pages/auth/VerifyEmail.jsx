import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./AuthPage.css";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [countdown, setCountdown] = useState(5);

  // Prevent double-call in React StrictMode (dev mode runs useEffect twice)
  const calledRef = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found. Please check your email link.");
      return;
    }

    if (calledRef.current) return;
    calledRef.current = true;

    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify-email?token=${encodeURIComponent(token)}`);
        setStatus("success");
        setMessage(res.data.message || "Email verified successfully!");
        setUser(res.data.user || null);
      } catch (err) {
        setStatus("error");
        setMessage(
          err.response?.data?.error ||
          "Verification failed. The link may have expired."
        );
      }
    };

    verify();
  }, [token]);

  // Auto-redirect countdown after successful verification
  useEffect(() => {
    if (status !== "success" || !user) return;

    if (countdown <= 0) {
      if (user.role === "creator") navigate("/creator/dashboard");
      else if (user.role === "sponsor") navigate("/sponsor/dashboard");
      else if (user.role === "admin") navigate("/admin/admindashboard");
      else navigate("/");
      return;
    }

    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, user, countdown, navigate]);

  return (
    <div style={{ minHeight: "100vh", background: "#fafbff", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "3rem 1rem", position: "relative", overflow: "hidden"
      }}>
        {/* Background blobs */}
        <div className="auth-blob auth-blob-1" />
        <div className="auth-blob auth-blob-2" />

        <div className="auth-card" style={{ maxWidth: 520, textAlign: "center", padding: "3rem 2.5rem" }}>

          {/* ── Loading ── */}
          {status === "loading" && (
            <div style={{ padding: "2rem 0" }}>
              <div style={{
                width: 56, height: 56, margin: "0 auto 1.5rem",
                border: "4px solid #e4e4ee", borderTopColor: "#5157a1",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite"
              }} />
              <h2 style={{ color: "#393873", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                Verifying Your Email…
              </h2>
              <p style={{ color: "#7c7c9a", fontSize: "0.95rem" }}>
                Please wait while we confirm your email address.
              </p>
            </div>
          )}

          {/* ── Success ── */}
          {status === "success" && (
            <div style={{ padding: "2rem 0" }}>
              <div style={{
                width: 72, height: 72, margin: "0 auto 1.5rem",
                background: "linear-gradient(135deg, #10b981, #059669)",
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 8px 24px rgba(16, 185, 129, 0.3)"
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 style={{ color: "#393873", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                Email Verified!
              </h2>
              <p style={{ color: "#7c7c9a", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                {message}
              </p>
              <p style={{ color: "#a5a5bd", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
                Redirecting to your dashboard in <strong style={{ color: "#5157a1" }}>{countdown}</strong> second{countdown !== 1 ? "s" : ""}…
              </p>
              <button
                className="auth-submit"
                onClick={() => {
                  if (user?.role === "creator") navigate("/creator/dashboard");
                  else if (user?.role === "sponsor") navigate("/sponsor/dashboard");
                  else if (user?.role === "admin") navigate("/admin/admindashboard");
                  else navigate("/");
                }}
                style={{ maxWidth: 260, margin: "0 auto" }}
              >
                Go to Dashboard Now
              </button>
            </div>
          )}

          {/* ── Error ── */}
          {status === "error" && (
            <div style={{ padding: "2rem 0" }}>
              <div style={{
                width: 72, height: 72, margin: "0 auto 1.5rem",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 8px 24px rgba(239, 68, 68, 0.3)"
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <h2 style={{ color: "#393873", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                Verification Failed
              </h2>
              <p style={{ color: "#7c7c9a", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                {message}
              </p>
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  className="auth-submit"
                  onClick={() => navigate("/signup")}
                  style={{ maxWidth: 200 }}
                >
                  Sign Up Again
                </button>
                <button
                  className="auth-overlay-cta"
                  onClick={() => navigate("/login")}
                  style={{
                    color: "#5157a1", borderColor: "#5157a1",
                    padding: "0.75rem 1.5rem", background: "transparent"
                  }}
                >
                  Go to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
