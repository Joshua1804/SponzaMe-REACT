import { useEffect, useState } from "react";

export default function SplashScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    // Trigger logo animation after mount
    const logoTimer = setTimeout(() => setLogoLoaded(true), 100);

    // Start fade out after animation completes
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);

    // Complete and unmount after fade
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2800);

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
        bg-gradient-to-br from-[#f8f9fc] via-white to-[#e8eaf6]
        transition-all duration-600 ease-out
        ${fadeOut ? "opacity-0 scale-105" : "opacity-100 scale-100"}
      `}
      style={{ transitionDuration: "600ms" }}
    >
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`
            absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full
            bg-gradient-to-br from-[#5157a1]/10 to-[#393873]/5
            transition-all duration-1000 ease-out
            ${logoLoaded ? "scale-100 opacity-100" : "scale-50 opacity-0"}
          `}
          style={{ transitionDelay: "100ms" }}
        />
        <div
          className={`
            absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full
            bg-gradient-to-br from-[#c7eff9]/30 to-[#5157a1]/10
            transition-all duration-1000 ease-out
            ${logoLoaded ? "scale-100 opacity-100" : "scale-50 opacity-0"}
          `}
          style={{ transitionDelay: "200ms" }}
        />
        <div
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[800px] h-[800px] rounded-full
            bg-gradient-radial from-[#5157a1]/5 to-transparent
            transition-all duration-1200 ease-out
            ${logoLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"}
          `}
          style={{ transitionDelay: "0ms" }}
        />
      </div>

      {/* Logo Container */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Logo with Animation */}
        <div
          className={`
            relative transition-all duration-700 ease-out
            ${logoLoaded ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"}
          `}
        >
          {/* Glow Effect Behind Logo */}
          <div
            className={`
              absolute inset-0 blur-3xl rounded-full
              bg-gradient-to-r from-[#5157a1]/30 to-[#393873]/20
              transition-all duration-1000 ease-out
              ${logoLoaded ? "opacity-100 scale-150" : "opacity-0 scale-100"}
            `}
            style={{ transitionDelay: "300ms" }}
          />

          {/* Logo */}
          <object
            data="/SponzaMe-Logo.svg"
            alt="SponzaMe"
            className="relative w-48 h-auto sm:w-56 md:w-64 drop-shadow-lg"
          />
        </div>

        {/* Loading Indicator */}
        <div
          className={`
            flex items-center gap-2 transition-all duration-500 ease-out
            ${logoLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
          `}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="flex gap-1.5">
            <span
              className="w-2 h-2 rounded-full bg-gradient-to-r from-[#5157a1] to-[#393873]"
              style={{
                animation: "pulse-dot 1.4s ease-in-out infinite",
                animationDelay: "0ms",
              }}
            />
            <span
              className="w-2 h-2 rounded-full bg-gradient-to-r from-[#5157a1] to-[#393873]"
              style={{
                animation: "pulse-dot 1.4s ease-in-out infinite",
                animationDelay: "200ms",
              }}
            />
            <span
              className="w-2 h-2 rounded-full bg-gradient-to-r from-[#5157a1] to-[#393873]"
              style={{
                animation: "pulse-dot 1.4s ease-in-out infinite",
                animationDelay: "400ms",
              }}
            />
          </div>
        </div>

        {/* Tagline */}
        <p
          className={`
            text-sm sm:text-base text-[#5157a1]/70 font-medium tracking-wide
            transition-all duration-500 ease-out
            ${logoLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
          `}
          style={{ transitionDelay: "600ms" }}
        >
          Connecting Ideas with Opportunities
        </p>
      </div>

      {/* Inline Keyframes */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
