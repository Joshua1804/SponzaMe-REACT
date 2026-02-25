import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Sprout, Star, Crown, Coins, Flame, Lock, Zap, Phone, BadgeCheck, Check } from "lucide-react";

export default function ShopPage() {
  const plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Perfect to get started",
      tokens: 200,
      price: 999,
      originalPrice: null,
      features: ["Try out core features", "Light usage", "Quick setup"],
      color: "bg-white",
      textColor: "text-[#393873]",
      buttonStyle: "bg-[#5157a1] text-white hover:bg-[#393873]",
      icon: <Sprout size={28} />,
    },
    {
      id: "value",
      name: "Value",
      description: "Best balance of price & tokens",
      tokens: 350,
      price: 1200,
      originalPrice: 1500,
      savings: 300,
      features: ["Most popular choice", "Balanced usage", "Better token value"],
      popular: true,
      color: "bg-white",
      textColor: "text-[#393873]",
      buttonStyle: "bg-[#5157a1] text-white hover:bg-[#393873]",
      icon: <Star size={28} />,
    },
    {
      id: "premium",
      name: "Premium",
      description: "For power users",
      tokens: 500,
      price: 1500,
      originalPrice: null,
      features: ["Heavy usage", "Longer sessions", "Maximum value"],
      color: "bg-gradient-to-br from-[#393873] to-[#5157a1]",
      textColor: "text-white",
      buttonStyle: "bg-[#e7bdd3] text-[#393873] hover:bg-[#c7eff9]",
      icon: <Crown size={28} />,
    },
  ];

  // Scroll reveal animation
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <Coins size={22} className="text-white" />
              <span className="text-sm font-medium text-white/90">Token Store</span>
            </div>

            <h1 className="reveal text-4xl lg:text-5xl font-bold text-white mb-4">
              Buy <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Tokens</span>
            </h1>
            <p className="reveal delay-1 text-lg text-white/70 max-w-2xl mx-auto">
              Choose a plan that fits your needs. Use tokens to apply for campaigns and unlock sponsor contacts.
            </p>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, i) => (
              <div
                key={plan.id}
                className={`reveal delay-${i + 1} relative ${plan.color} rounded-3xl shadow-xl p-8 flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-2xl ${plan.popular ? "border-2 border-[#5157a1] md:-mt-4 md:mb-4" : ""
                  } ${plan.id === "premium" ? "" : "border border-gray-100"}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#e7bdd3] to-[#c7eff9] text-[#393873] text-sm px-4 py-1.5 rounded-full font-semibold shadow-lg flex items-center gap-1">
                    <Flame size={14} /> MOST POPULAR
                  </span>
                )}

                {/* Savings Badge */}
                {plan.savings && (
                  <span className="absolute -top-3 right-4 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    SAVE ₹{plan.savings}
                  </span>
                )}

                <div>
                  {/* Icon & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plan.id === "premium" ? "bg-white/20 text-white" : "bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 text-[#5157a1]"}
                      `}>
                      {plan.icon}
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold ${plan.textColor}`}>{plan.name}</h2>
                      <p className={`text-sm ${plan.id === "premium" ? "text-[#c7eff9]" : "text-gray-500"}`}>
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl font-bold ${plan.textColor}`}>₹{plan.price}</span>
                      {plan.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">₹{plan.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Tokens */}
                  <div className={`rounded-2xl p-4 mb-6 ${plan.id === "premium" ? "bg-white/10" : "bg-gradient-to-r from-amber-50 to-orange-50"
                    }`}>
                    <div className="flex items-center justify-center gap-2">
                      <Coins size={28} className={plan.id === "premium" ? "text-white" : "text-amber-500"} />
                      <span className={`text-3xl font-bold ${plan.id === "premium" ? "text-white" : "text-amber-600"}`}>
                        {plan.tokens}
                      </span>
                      <span className={plan.id === "premium" ? "text-white/70" : "text-amber-600/70"}>tokens</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className={`flex items-center gap-2 ${plan.id === "premium" ? "text-white/90" : "text-gray-600"}`}>
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.id === "premium" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-600"
                          }`}>
                          <Check size={12} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link
                  to={`/user/checkout?plan=${plan.id}`}
                  className={`w-full py-4 rounded-xl font-semibold text-center transition-all duration-300 ${plan.buttonStyle} hover:shadow-lg transform hover:-translate-y-0.5 block`}
                >
                  Buy Now →
                </Link>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="reveal delay-4 mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Lock size={22} className="text-[#5157a1]" />, text: "Secure Payment" },
              { icon: <Zap size={22} className="text-amber-500" />, text: "Instant Delivery" },
              { icon: <Phone size={22} className="text-emerald-500" />, text: "24/7 Support" },
              { icon: <BadgeCheck size={22} className="text-indigo-500" />, text: "No Hidden Fees" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100">
                <span className="mb-2 block flex justify-center">{item.icon}</span>
                <p className="text-sm font-medium text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="reveal delay-4 mt-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { q: "What can I use tokens for?", a: "Tokens are used to apply for campaigns and unlock sponsor contact details after your application is accepted." },
                { q: "Do tokens expire?", a: "No! Your tokens never expire. Use them whenever you're ready." },
                { q: "Can I get a refund?", a: "Unused tokens can be refunded within 7 days of purchase. Contact support for assistance." },
                { q: "How do I earn free tokens?", a: "Complete campaigns successfully, refer friends, and claim daily login bonuses to earn free tokens!" },
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
