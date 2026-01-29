
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Landing() {
  const [stats, setStats] = useState({ creators: 0, sponsors: 0, campaigns: 0 });

  // Scroll reveal logic (optimized)
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Animated counter effect
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        creators: Math.floor(5000 * progress),
        sponsors: Math.floor(1200 * progress),
        campaigns: Math.floor(8500 * progress),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white text-gray-900 overflow-hidden pt-16">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-[10%] w-72 h-72 bg-gradient-to-br from-[#5157a1]/10 to-[#c7eff9]/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-gradient-to-tr from-[#e7bdd3]/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#c7eff9]/10 via-transparent to-[#e7bdd3]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="reveal order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#5157a1]/10 to-[#c7eff9]/30 border border-[#5157a1]/20 mb-6">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5157a1] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5157a1]"></span>
                </span>
                <span className="text-sm font-medium text-[#393873]">Now connecting 5,000+ creators</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                <span className="text-gray-900">Where </span>
                <span className="bg-gradient-to-r from-[#5157a1] to-[#393873] bg-clip-text text-transparent">Creators</span>
                <br />
                <span className="text-gray-900">and </span>
                <span className="bg-gradient-to-r from-[#e7bdd3] via-[#5157a1] to-[#393873] bg-clip-text text-transparent">Brands</span>
                <br />
                <span className="text-gray-900">Collaborate </span>
                <span className="relative inline-block">
                  <span className="text-[#5157a1]">Smarter</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C50 4 150 4 198 10" stroke="#5157a1" strokeWidth="3" strokeLinecap="round" className="animate-draw" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-lg mb-8 leading-relaxed">
                SponzaMe is the structured sponsorship marketplace that connects content creators with brands seeking authentic partnerships. Build your profile, discover opportunities, and manage campaigns—all in one place.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  to="/signup"
                  className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-semibold shadow-lg shadow-[#5157a1]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#5157a1]/30 hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Free
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#393873] to-[#5157a1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold transition-all duration-300 hover:border-[#5157a1] hover:text-[#5157a1] hover:bg-[#5157a1]/5"
                >
                  Sign In
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free to join</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure platform</span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Visual */}
            <div className="reveal delay-1 order-1 lg:order-2 relative">
              <div className="relative">
                {/* Main image container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#393873]/20 border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#5157a1]/10 via-transparent to-[#c7eff9]/20 z-10" />
                  <img
                    src="/hero.png"
                    alt="Platform preview"
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                </div>

                {/* Floating card 1 */}
                <div className="absolute -left-4 lg:-left-8 top-1/4 bg-white rounded-2xl p-4 shadow-xl shadow-gray-200/50 border border-gray-100 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c7eff9] to-[#5157a1]/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#5157a1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Active Campaigns</p>
                      <p className="font-bold text-[#393873]">2,340+</p>
                    </div>
                  </div>
                </div>

                {/* Floating card 2 */}
                <div className="absolute -right-4 lg:-right-8 bottom-1/4 bg-white rounded-2xl p-4 shadow-xl shadow-gray-200/50 border border-gray-100 animate-float-delayed">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e7bdd3] to-[#5157a1]/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#5157a1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Partnerships Made</p>
                      <p className="font-bold text-[#393873]">12,500+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative py-16 bg-gradient-to-r from-gray-50 via-white to-gray-50">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: `${stats.creators.toLocaleString()}+`, label: "Active Creators", icon: "👨‍🎨" },
              { value: `${stats.sponsors.toLocaleString()}+`, label: "Brand Partners", icon: "🏢" },
              { value: `${stats.campaigns.toLocaleString()}+`, label: "Campaigns Created", icon: "🚀" },
              { value: "98%", label: "Satisfaction Rate", icon: "⭐" },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl mb-2 transition-transform group-hover:scale-125">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold text-[#393873] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c7eff9]/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="reveal inline-block px-4 py-2 rounded-full bg-[#5157a1]/10 text-[#5157a1] text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="reveal text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="reveal delay-1 text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our streamlined process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#c7eff9] via-[#5157a1] to-[#e7bdd3]" />

            {[
              {
                step: "01",
                title: "Create Your Profile",
                desc: "Sign up and build your creator or sponsor profile with all your relevant details and portfolio.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
                color: "from-[#c7eff9] to-[#5157a1]/20",
              },
              {
                step: "02",
                title: "Discover Opportunities",
                desc: "Browse campaigns, explore creator profiles, and find the perfect match for your goals.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                color: "from-[#5157a1]/20 to-[#5157a1]/30",
              },
              {
                step: "03",
                title: "Collaborate & Grow",
                desc: "Connect, negotiate, and manage your partnerships through our intuitive platform.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                color: "from-[#e7bdd3] to-[#5157a1]/20",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`reveal delay-${i + 1} group relative bg-white p-8 rounded-3xl border border-gray-100
                shadow-lg shadow-gray-100/50 transition-all duration-500 ease-out hover:-translate-y-3
                hover:shadow-2xl hover:shadow-[#5157a1]/10`}
              >
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5157a1] to-[#393873] flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {item.step}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 text-[#5157a1] transition-transform group-hover:scale-110`}>
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES / BUILT FOR BOTH SIDES */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="reveal inline-block px-4 py-2 rounded-full bg-[#e7bdd3]/30 text-[#393873] text-sm font-medium mb-4">
              For Everyone
            </span>
            <h2 className="reveal text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Built for Both Sides
            </h2>
            <p className="reveal delay-1 text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed for creators and sponsors alike
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                label: "For Creators",
                gradient: "from-[#c7eff9] to-[#5157a1]/10",
                borderColor: "border-[#c7eff9]",
                items: [
                  { icon: "🎯", text: "Discover sponsorship opportunities tailored to your niche" },
                  { icon: "📊", text: "Build a professional profile that showcases your work" },
                  { icon: "📈", text: "Track applications and responses in real-time" },
                  { icon: "💰", text: "Secure payments and transparent agreements" },
                ],
              },
              {
                label: "For Sponsors",
                gradient: "from-[#e7bdd3] to-[#5157a1]/10",
                borderColor: "border-[#e7bdd3]",
                items: [
                  { icon: "🔍", text: "Find creators that align with your brand values" },
                  { icon: "📋", text: "Manage multiple campaigns from one dashboard" },
                  { icon: "✅", text: "Review applications with detailed creator insights" },
                  { icon: "📊", text: "Track campaign performance and ROI metrics" },
                ],
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`reveal delay-${i + 1} group bg-white rounded-3xl p-8 lg:p-10 border-2 ${card.borderColor}
                shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}
              >
                <div className={`inline-block px-5 py-2 rounded-full bg-gradient-to-r ${card.gradient} mb-8`}>
                  <span className="font-semibold text-[#393873]">{card.label}</span>
                </div>

                <ul className="space-y-5">
                  {card.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 group/item">
                      <span className="text-2xl transition-transform group-hover/item:scale-125">{item.icon}</span>
                      <span className="text-gray-600 leading-relaxed pt-1">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#c7eff9]/5 to-white pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="reveal inline-block px-4 py-2 rounded-full bg-[#5157a1]/10 text-[#5157a1] text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="reveal text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Loved by Creators & Brands
            </h2>
            <p className="reveal delay-1 text-lg text-gray-600 max-w-2xl mx-auto">
              See what our community has to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "SponzaMe helped me land my first major sponsorship deal. The platform is intuitive and the opportunities are endless!",
                name: "Sarah Chen",
                role: "Content Creator",
                avatar: "👩‍🎨",
              },
              {
                quote: "We've found amazing creators who truly understand our brand. The quality of partnerships has exceeded our expectations.",
                name: "Michael Ross",
                role: "Marketing Director",
                avatar: "👨‍💼",
              },
              {
                quote: "The structured workflow makes collaboration so much easier. I can focus on creating while SponzaMe handles the rest.",
                name: "Alex Rivera",
                role: "YouTuber",
                avatar: "🎬",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className={`reveal delay-${i + 1} bg-white rounded-3xl p-8 border border-gray-100 shadow-lg
                transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c7eff9] to-[#e7bdd3] flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873]" />
        <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="reveal text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Next
            <br />
            <span className="bg-gradient-to-r from-[#c7eff9] to-[#e7bdd3] bg-clip-text text-transparent">
              Collaboration?
            </span>
          </h2>
          <p className="reveal delay-1 text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Join thousands of creators and brands building meaningful partnerships through SponzaMe. It's free to get started.
          </p>

          <div className="reveal delay-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="group px-8 py-4 rounded-xl bg-white text-[#5157a1] font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:bg-gray-50"
            >
              <span className="flex items-center justify-center gap-2">
                Join as Creator
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <Link
              to="/signup"
              className="group px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/50"
            >
              <span className="flex items-center justify-center gap-2">
                Join as Sponsor
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes draw {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-draw {
          stroke-dasharray: 200;
          animation: draw 2s ease-out forwards;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}
