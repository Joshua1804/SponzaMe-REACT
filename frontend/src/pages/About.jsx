import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UserCircle, Monitor, Wrench, Palette, Users, Building2, DollarSign, Target, Search, Handshake, Lightbulb, ShieldCheck, Sparkles } from "lucide-react";

export default function About() {
    useEffect(() => {
        const els = document.querySelectorAll(".reveal");
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("active");
                        obs.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.15 },
        );
        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    const team = [
        { name: "Rahul Sharma", role: "Founder & CEO", emoji: <UserCircle size={32} className="text-[#393873]" />, bio: "10+ years in digital marketing" },
        { name: "Priya Patel", role: "Head of Operations", emoji: <Monitor size={32} className="text-[#393873]" />, bio: "Ex-Google, product expert" },
        { name: "Arjun Menon", role: "Lead Developer", emoji: <Wrench size={32} className="text-[#393873]" />, bio: "Full-stack wizard" },
        { name: "Sneha Gupta", role: "Community Manager", emoji: <Palette size={32} className="text-[#393873]" />, bio: "Creator ecosystem specialist" },
    ];

    const stats = [
        { value: "10K+", label: "Creators", icon: <Users size={28} className="text-[#5157a1]" /> },
        { value: "500+", label: "Brands", icon: <Building2 size={28} className="text-[#5157a1]" /> },
        { value: "₹2Cr+", label: "Paid Out", icon: <DollarSign size={28} className="text-[#5157a1]" /> },
        { value: "5K+", label: "Campaigns", icon: <Target size={28} className="text-[#5157a1]" /> },
    ];

    const values = [
        { title: "Transparency", desc: "Clear pricing, honest communication, no hidden fees", icon: <Search size={28} className="text-[#5157a1]" /> },
        { title: "Community First", desc: "We build for creators and sponsors equally", icon: <Handshake size={28} className="text-[#5157a1]" /> },
        { title: "Innovation", desc: "Constantly improving with cutting-edge tech", icon: <Lightbulb size={28} className="text-[#5157a1]" /> },
        { title: "Trust", desc: "Verified profiles and secure transactions", icon: <ShieldCheck size={28} className="text-[#5157a1]" /> },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e7bdd3]/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                            <Sparkles size={18} className="text-white" />
                            <span className="text-sm font-medium text-white/90">Our Story</span>
                        </div>

                        <h1 className="reveal text-4xl lg:text-6xl font-bold text-white mb-6">
                            Connecting <span className="bg-gradient-to-r from-[#c7eff9] to-[#e7bdd3] bg-clip-text text-transparent">Creators</span> with{" "}
                            <span className="bg-gradient-to-r from-[#e7bdd3] to-[#c7eff9] bg-clip-text text-transparent">Brands</span>
                        </h1>

                        <p className="reveal delay-1 text-lg lg:text-xl text-white/70 max-w-2xl mx-auto">
                            SponzaMe is India's leading platform for influencer-brand collaborations.
                            We make sponsorships simple, transparent, and rewarding for everyone.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="w-full px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
                <div className="max-w-4xl mx-auto">
                    <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                            >
                                <div className="mb-2 flex justify-center">{stat.icon}</div>
                                <div className="text-3xl font-bold text-[#393873]">{stat.value}</div>
                                <div className="text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="w-full px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="reveal grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-[#5157a1]/10 text-[#5157a1] text-sm font-semibold mb-4">
                                Our Mission
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                Empowering the Creator Economy
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                We started SponzaMe with a simple vision: to democratize influencer marketing in India.
                                Too many talented creators were struggling to find brand deals, while brands couldn't
                                discover authentic voices for their campaigns.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                Our platform bridges this gap with smart matching, transparent pricing, and secure
                                transactions. Whether you're a nano-influencer or a celebrity creator, SponzaMe is
                                your gateway to meaningful brand partnerships.
                            </p>
                            <Link
                                to="/signup"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Join Our Community
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 rounded-3xl p-8 lg:p-12">
                                <div className="grid grid-cols-2 gap-4">
                                    {values.map((value, i) => (
                                        <div key={i} className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow">
                                            <div className="mb-3">{value.icon}</div>
                                            <h3 className="font-bold text-gray-900 mb-1">{value.title}</h3>
                                            <p className="text-sm text-gray-500">{value.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="reveal inline-block px-3 py-1 rounded-full bg-[#5157a1]/10 text-[#5157a1] text-sm font-semibold mb-4">
                            Meet the Team
                        </span>
                        <h2 className="reveal text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            The People Behind SponzaMe
                        </h2>
                        <p className="reveal delay-1 text-gray-600 max-w-2xl mx-auto">
                            A passionate team dedicated to building the best creator-brand platform in India
                        </p>
                    </div>

                    <div className="reveal delay-2 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, i) => (
                            <div
                                key={i}
                                className="group bg-gray-50 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-gradient-to-br hover:from-[#5157a1] hover:to-[#393873] hover:shadow-xl"
                            >
                                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#c7eff9] to-[#e7bdd3] flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {member.emoji}
                                </div>
                                <h3 className="font-bold text-gray-900 group-hover:text-white transition-colors">{member.name}</h3>
                                <p className="text-sm text-[#5157a1] group-hover:text-[#c7eff9] mb-2 transition-colors">{member.role}</p>
                                <p className="text-xs text-gray-500 group-hover:text-white/70 transition-colors">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="w-full px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="reveal bg-gradient-to-br from-[#393873] to-[#5157a1] rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#e7bdd3]/20 rounded-full blur-3xl" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                Ready to Start Your Journey?
                            </h2>
                            <p className="text-white/70 mb-8 max-w-xl mx-auto">
                                Join thousands of creators and brands already using SponzaMe to create amazing collaborations.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/signup"
                                    className="px-8 py-4 rounded-xl bg-white text-[#5157a1] font-semibold hover:shadow-xl transition-all"
                                >
                                    Get Started Free
                                </Link>
                                <Link
                                    to="/contact"
                                    className="px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
