import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./AuthPage.css";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(location.pathname === "/signup");

  useEffect(() => {
    setIsSignUp(location.pathname === "/signup");
  }, [location.pathname]);

  const toggleMode = () => {
    const next = !isSignUp;
    setIsSignUp(next);
    navigate(next ? "/signup" : "/login", { replace: true });
  };

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

        {/* ======== Auth Card ======== */}
        <div className="auth-card">

          {/* Mobile toggle */}
          <div className="auth-mobile-bar">
            <button
              className={!isSignUp ? "active" : ""}
              onClick={() => { if (isSignUp) toggleMode(); }}
            >
              Sign In
            </button>
            <button
              className={isSignUp ? "active" : ""}
              onClick={() => { if (!isSignUp) toggleMode(); }}
            >
              Sign Up
            </button>
          </div>

          {/* ---- Both forms side by side ---- */}
          <div style={{ display: "flex", minHeight: "580px" }} className="auth-forms-row">
            {/* Login — left half */}
            <div
              className={`auth-form-side login-side ${!isSignUp ? "auth-form-visible" : "auth-form-hidden"}`}
              style={{
                width: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                padding: "3rem 2.5rem", boxSizing: "border-box", flexShrink: 0
              }}
            >
              <div className="auth-form-box">
                <h2>Welcome Back</h2>
                <p className="auth-sub">Sign in to continue to your dashboard</p>

                <div className="auth-socials">
                  <button className="auth-social-btn" type="button" aria-label="Sign in with Google">
                    <FcGoogle /> Google
                  </button>
                  <button className="auth-social-btn" type="button" aria-label="Sign in with GitHub">
                    <FaGithub /> GitHub
                  </button>
                </div>

                <div className="auth-or"><span>or</span></div>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="auth-field">
                    <label htmlFor="login-email">Email</label>
                    <input id="login-email" type="email" placeholder="name@company.com" autoComplete="email" required />
                  </div>
                  <div className="auth-field">
                    <div className="auth-label-row">
                      <label htmlFor="login-password">Password</label>
                      <a className="auth-forgot" href="#forgot">Forgot?</a>
                    </div>
                    <input id="login-password" type="password" placeholder="••••••••" autoComplete="current-password" required />
                  </div>
                  <button type="submit" className="auth-submit">Sign In</button>
                </form>

                <p className="auth-switch">
                  Don't have an account?
                  <button type="button" onClick={toggleMode}>Sign Up</button>
                </p>
              </div>
            </div>

            {/* Signup — right half */}
            <div
              className={`auth-form-side signup-side ${isSignUp ? "auth-form-visible" : "auth-form-hidden"}`}
              style={{
                width: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                padding: "3rem 2.5rem", boxSizing: "border-box", flexShrink: 0
              }}
            >
              <div className="auth-form-box">
                <h2>Create Account</h2>
                <p className="auth-sub">Start your journey with SponzaMe</p>

                <div className="auth-socials">
                  <button className="auth-social-btn" type="button" aria-label="Sign up with Google">
                    <FcGoogle /> Google
                  </button>
                  <button className="auth-social-btn" type="button" aria-label="Sign up with GitHub">
                    <FaGithub /> GitHub
                  </button>
                </div>

                <div className="auth-or"><span>or</span></div>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="auth-field">
                    <label htmlFor="signup-name">Full Name</label>
                    <input id="signup-name" type="text" placeholder="Jane Doe" autoComplete="name" required />
                  </div>
                  <div className="auth-field">
                    <label htmlFor="signup-email">Email</label>
                    <input id="signup-email" type="email" placeholder="name@company.com" autoComplete="email" required />
                  </div>
                  <div className="auth-field">
                    <label htmlFor="signup-password">Password</label>
                    <input id="signup-password" type="password" placeholder="••••••••" autoComplete="new-password" required />
                  </div>
                  <div className="auth-field">
                    <label htmlFor="signup-confirm">Confirm Password</label>
                    <input id="signup-confirm" type="password" placeholder="••••••••" autoComplete="new-password" required />
                  </div>
                  <button type="submit" className="auth-submit">Create Account</button>
                </form>

                <p className="auth-switch">
                  Already have an account?
                  <button type="button" onClick={toggleMode}>Sign In</button>
                </p>
              </div>
            </div>
          </div>

          {/* ---- Sliding gradient overlay ---- */}
          <div
            className="auth-overlay-box"
            style={{
              position: "absolute", top: 0, width: "50%", height: "100%",
              zIndex: 20, overflow: "hidden",
              right: 0,
              transform: isSignUp ? "translateX(-100%)" : "translateX(0)",
              borderRadius: isSignUp ? "0 1.5rem 1.5rem 0" : "1.5rem 0 0 1.5rem"
            }}
          >
            {/* Gradient background */}
            <div className="auth-overlay-bg" />

            {/* Two inner content panels */}
            <div
              className="auth-overlay-inner"
              style={{
                position: "relative", zIndex: 1, width: "200%", height: "100%",
                display: "flex",
                transform: isSignUp ? "translateX(-50%)" : "translateX(0)"
              }}
            >
              {/* Panel 1: "New Here?" — visible when on login */}
              <div className="auth-overlay-pane" style={{
                width: "50%", height: "100%", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", padding: "2.5rem 2rem",
                textAlign: "center", flexShrink: 0
              }}>
                <h3>New Here?</h3>
                <p>Sign up and discover a world of sponsorship opportunities tailored for you.</p>
                <button className="auth-overlay-cta" onClick={toggleMode}>Sign Up</button>
              </div>

              {/* Panel 2: "Welcome Back!" — visible when on signup */}
              <div className="auth-overlay-pane" style={{
                width: "50%", height: "100%", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", padding: "2.5rem 2rem",
                textAlign: "center", flexShrink: 0
              }}>
                <h3>Welcome Back!</h3>
                <p>Already have an account? Sign in to pick up right where you left off.</p>
                <button className="auth-overlay-cta" onClick={toggleMode}>Sign In</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
