import { useEffect, useState } from "react";

export default function SplashScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => setLogoLoaded(true), 100);
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3100);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center
        transition-all ease-out overflow-hidden
        ${fadeOut ? "opacity-0 scale-105" : "opacity-100 scale-100"}
      `}
      style={{
        transitionDuration: "600ms",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%)",
      }}
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`
            absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full
            transition-all duration-[1200ms] ease-out
            ${logoLoaded ? "scale-100 opacity-100" : "scale-50 opacity-0"}
          `}
          style={{
            transitionDelay: "100ms",
            background: "radial-gradient(circle, rgba(81,87,161,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className={`
            absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full
            transition-all duration-[1200ms] ease-out
            ${logoLoaded ? "scale-100 opacity-100" : "scale-50 opacity-0"}
          `}
          style={{
            transitionDelay: "200ms",
            background: "radial-gradient(circle, rgba(199,239,249,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[900px] h-[900px] rounded-full
            transition-all duration-[1500ms] ease-out
            ${logoLoaded ? "scale-100 opacity-60" : "scale-75 opacity-0"}
          `}
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%)",
          }}
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: `rgba(${120 + i * 20}, ${140 + i * 15}, 255, ${0.15 + (i % 3) * 0.1})`,
              animation: `float-particle ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Center Content */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Logo with Animation */}
        <div
          className={`
            relative transition-all duration-[800ms] ease-out
            ${logoLoaded ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-90"}
          `}
        >
          {/* Glow Effect Behind Logo */}
          <div
            className={`
              absolute inset-0 blur-3xl rounded-full
              transition-all duration-[1200ms] ease-out
              ${logoLoaded ? "opacity-100 scale-[1.8]" : "opacity-0 scale-100"}
            `}
            style={{
              transitionDelay: "300ms",
              background: "radial-gradient(circle, rgba(255, 255, 255, 0.35) 0%, rgba(57,56,115,0.15) 60%, transparent 100%)",
            }}
          />

          {/* Logo */}
          <object
            data="/SponzaMe-Logo.svg"
            type="image/svg+xml"
            aria-label="SponzaMe"
            className="relative w-52 h-auto sm:w-60 md:w-72"
            style={{
              filter: "drop-shadow(0 4px 24px rgba(81,87,161,0.4))",
            }}
          />

          {/* Shimmer sweep over logo */}
          <div
            className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none"
            style={{ opacity: logoLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "60%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                animation: "shimmer-sweep 2.5s ease-in-out infinite",
                animationDelay: "0.8s",
              }}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className={`
            transition-all duration-500 ease-out
            ${logoLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
          `}
          style={{ transitionDelay: "500ms" }}
        >
          <div
            className="relative overflow-hidden rounded-full"
            style={{
              width: "180px",
              height: "3px",
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, #5157a1, #7c83d4, #c7eff9)",
                animation: logoLoaded ? "progress-fill 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards" : "none",
                animationDelay: "0.6s",
                width: "0%",
              }}
            />
            {/* Glow on the progress tip */}
            <div
              className="absolute inset-y-0 rounded-full"
              style={{
                width: "20px",
                background: "radial-gradient(circle, rgba(199,239,249,0.6), transparent)",
                animation: logoLoaded ? "progress-glow 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards" : "none",
                animationDelay: "0.6s",
                left: "0%",
                filter: "blur(3px)",
              }}
            />
          </div>
        </div>

        {/* Tagline */}
        <p
          className={`
            text-sm sm:text-base font-medium tracking-widest uppercase
            transition-all duration-500 ease-out
            ${logoLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
          `}
          style={{
            transitionDelay: "700ms",
            color: "rgba(199, 220, 249, 0.6)",
            letterSpacing: "0.2em",
          }}
        >
          Connecting Ideas with Opportunities
        </p>
      </div>

      {/* Inline Keyframes */}
      <style>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-15px) translateX(5px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-8px) translateX(-5px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-20px) translateX(3px);
            opacity: 0.5;
          }
        }

        @keyframes shimmer-sweep {
          0% {
            left: -100%;
          }
          40%, 100% {
            left: 200%;
          }
        }

        @keyframes progress-fill {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes progress-glow {
          0% {
            left: 0%;
          }
          100% {
            left: calc(100% - 20px);
          }
        }
      `}</style>
    </div>
  );
}
