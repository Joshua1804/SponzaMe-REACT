import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);
    };

    const contactInfo = [
        { icon: "📧", label: "Email", value: "hello@sponzame.com", link: "mailto:hello@sponzame.com" },
        { icon: "📞", label: "Phone", value: "+91 98765 43210", link: "tel:+919876543210" },
        { icon: "📍", label: "Address", value: "Mumbai, Maharashtra, India", link: null },
        { icon: "⏰", label: "Hours", value: "Mon-Fri, 9AM-6PM IST", link: null },
    ];

    const faqs = [
        { q: "How do I become a creator?", a: "Sign up for free, complete your profile, and start browsing campaigns!" },
        { q: "What are tokens used for?", a: "Tokens are used to apply for campaigns and unlock sponsor contact details." },
        { q: "How do sponsors pay creators?", a: "Payments are handled directly between creators and sponsors after a deal is confirmed." },
        { q: "Is there a fee to use SponzaMe?", a: "Creating an account is free! We use a token-based system for premium features." },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                            <span className="text-lg">💬</span>
                            <span className="text-sm font-medium text-white/90">Get in Touch</span>
                        </div>

                        <h1 className="reveal text-4xl lg:text-5xl font-bold text-white mb-4">
                            We'd Love to <span className="bg-gradient-to-r from-[#c7eff9] to-[#e7bdd3] bg-clip-text text-transparent">Hear From You</span>
                        </h1>

                        <p className="reveal delay-1 text-lg text-white/70 max-w-2xl mx-auto">
                            Have questions, feedback, or just want to say hello? We're here to help!
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Cards */}
            <div className="w-full px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <div className="max-w-5xl mx-auto">
                    <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {contactInfo.map((info, i) => (
                            <a
                                key={i}
                                href={info.link || "#"}
                                className={`bg-white rounded-2xl p-5 shadow-xl shadow-gray-200/50 border border-gray-100 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${info.link ? "cursor-pointer" : "cursor-default"}`}
                            >
                                <div className="text-3xl mb-2">{info.icon}</div>
                                <div className="text-sm text-gray-500 mb-1">{info.label}</div>
                                <div className="font-semibold text-gray-900 text-sm">{info.value}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">

                        {/* Contact Form */}
                        <div className="reveal">
                            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center">
                                        ✉️
                                    </span>
                                    Send us a Message
                                </h2>

                                {submitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-4xl">
                                            ✓
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                        <p className="text-gray-600 mb-6">We'll get back to you within 24 hours.</p>
                                        <button
                                            onClick={() => {
                                                setSubmitted(false);
                                                setFormData({ name: "", email: "", subject: "", message: "" });
                                            }}
                                            className="text-[#5157a1] font-medium hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 focus:border-[#5157a1] transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="john@example.com"
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 focus:border-[#5157a1] transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 focus:border-[#5157a1] transition-all bg-white"
                                            >
                                                <option value="">Select a topic</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="creator">Creator Support</option>
                                                <option value="sponsor">Sponsor Support</option>
                                                <option value="technical">Technical Issue</option>
                                                <option value="billing">Billing Question</option>
                                                <option value="partnership">Partnership</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Tell us how we can help..."
                                                required
                                                rows={5}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 focus:border-[#5157a1] transition-all resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-gradient-to-r from-[#5157a1] to-[#393873] hover:shadow-xl hover:shadow-[#5157a1]/25 transform hover:-translate-y-0.5"
                                                }`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <span>📤</span>
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="reveal delay-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center">
                                    ❓
                                </span>
                                Frequently Asked Questions
                            </h2>

                            <div className="space-y-4">
                                {faqs.map((faq, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-200/50 border border-gray-100 transition-all duration-300 hover:shadow-xl"
                                    >
                                        <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                                        <p className="text-gray-600 text-sm">{faq.a}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Additional Help */}
                            <div className="mt-8 bg-gradient-to-br from-[#5157a1]/5 to-[#e7bdd3]/5 rounded-2xl p-6 border border-[#5157a1]/10">
                                <h3 className="font-bold text-gray-900 mb-2">Need More Help?</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Check out our comprehensive help center with guides, tutorials, and troubleshooting tips.
                                </p>
                                <Link
                                    to="#"
                                    className="inline-flex items-center gap-2 text-[#5157a1] font-medium hover:underline"
                                >
                                    Visit Help Center
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Social Links */}
                            <div className="mt-8">
                                <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                                <div className="flex gap-3">
                                    {[
                                        { icon: "🐦", label: "Twitter", color: "from-blue-400 to-blue-500" },
                                        { icon: "📷", label: "Instagram", color: "from-pink-400 to-purple-500" },
                                        { icon: "💼", label: "LinkedIn", color: "from-blue-600 to-blue-700" },
                                        { icon: "📺", label: "YouTube", color: "from-red-500 to-red-600" },
                                    ].map((social, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-xl hover:scale-110 transition-transform shadow-lg`}
                                            title={social.label}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
