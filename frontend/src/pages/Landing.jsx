import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Landing() {
  // Scroll reveal logic (optimized)
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // performance optimization
          }
        });
      },
      { threshold: 0.15 },
    );

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white text-gray-900 overflow-hidden pt-16">
      <Navbar />

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* Soft glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#c7eff9] rounded-full blur-3xl opacity-40 -z-10" />

        <div className="reveal">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 text-[#393873]">
            Where Creators <br />
            and Brands <br />
            Collaborate Smarter
          </h1>

          <p className="text-gray-600 max-w-md mb-10 leading-relaxed">
            SponzaMe is a structured sponsorship marketplace that connects
            content creators with brands seeking authentic partnerships. Build
            your profile, discover opportunities, and manage campaigns in one
            place.
          </p>

          <div className="flex gap-4">
            <Link
              to="/signup"
              className="px-7 py-3 rounded-lg bg-[#5157a1] text-white font-medium shadow-md transition-all duration-300 ease-out hover:bg-[#393873] hover:-translate-y-0.5"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-7 py-3 rounded-lg border border-[#e1e1eb] text-gray-700 transition-all duration-300 ease-out hover:border-[#5157a1] hover:text-[#5157a1]"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="reveal delay-1 relative rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#c7eff9]/40 to-transparent z-10" />
          <img
            src="/hero.png"
            alt="Platform preview"
            className="w-full h-[420px] object-cover"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#e1e1eb] py-24 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d0d0e0] to-transparent" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="reveal text-2xl font-semibold tracking-tight mb-2 text-[#393873]">
            How It Works
          </h2>
          <p className="reveal delay-1 text-gray-600 mb-14">
            Simple steps to successful collaborations
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Creators Build Profiles",
                desc: "Creators showcase their profiles and apply to relevant sponsorship campaigns.",
              },
              {
                title: "Sponsors Create Campaigns",
                desc: "Brands create campaigns and discover creators that align with their goals.",
              },
              {
                title: "Collaborate on Platform",
                desc: "Work together through a structured and transparent collaboration workflow.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`reveal delay-${i + 1} bg-white p-8 rounded-2xl border border-[#e1e1eb]
                shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                transition-all duration-300 ease-out hover:-translate-y-2
                hover:shadow-[0_20px_45px_rgba(81,87,161,0.25)] text-left`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#c7eff9] flex items-center justify-center mb-6">
                  <div className="w-5 h-5 rounded bg-[#5157a1]" />
                </div>
                <h3 className="font-semibold mb-2 text-[#393873]">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR BOTH SIDES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="reveal text-2xl font-semibold tracking-tight text-[#393873]">
            Built for Both Sides
          </h2>
          <p className="reveal delay-1 text-gray-600">
            Powerful features for creators and sponsors alike
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {[
            {
              label: "For Creators",
              bg: "#c7eff9",
              items: [
                "Discover sponsorship opportunities",
                "Build professional creator profiles",
                "Track applications and responses",
              ],
            },
            {
              label: "For Sponsors",
              bg: "#e7bdd3",
              items: [
                "Find relevant creators",
                "Manage campaigns efficiently",
                "Review applications with ease",
              ],
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`reveal delay-${i + 1} bg-white rounded-2xl p-10 border border-[#e1e1eb]
              shadow-[0_12px_32px_rgba(0,0,0,0.06)]
              transition-all duration-300 ease-out hover:-translate-y-2
              hover:shadow-[0_24px_60px_rgba(57,56,115,0.25)]`}
            >
              <span
                className="inline-block mb-5 px-4 py-1 rounded-full text-sm font-medium text-[#393873]"
                style={{ backgroundColor: card.bg }}
              >
                {card.label}
              </span>
              <ul className="space-y-4 text-gray-600 list-disc list-inside">
                {card.items.map((text, idx) => (
                  <li key={idx}>{text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#5157a1] py-28 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#393873] to-transparent opacity-30" />
        <h2 className="reveal text-3xl font-bold mb-4 relative">
          Ready to Start Your Next Collaboration?
        </h2>
        <p className="reveal delay-1 mb-10 text-gray-200 max-w-xl mx-auto relative">
          Join thousands of creators and brands building meaningful partnerships
          through SponzaMe.
        </p>

        <div className="reveal delay-2 flex justify-center gap-4 relative">
          <Link
            to="/signup"
            className="px-7 py-3 rounded-lg bg-white text-[#5157a1] font-medium transition hover:bg-[#e1e1eb]"
          >
            Join as Creator
          </Link>
          <Link
            to="/signup"
            className="px-7 py-3 rounded-lg border border-white transition hover:bg-white hover:text-[#5157a1]"
          >
            Join as Sponsor
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
