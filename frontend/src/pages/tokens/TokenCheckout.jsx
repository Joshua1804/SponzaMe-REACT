import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../api";

export default function TokenCheckout() {
    const [searchParams] = useSearchParams();
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvv: "",
        upiId: "",
    });

    const plans = [
        {
            id: "basic",
            name: "Basic",
            tokens: 200,
            price: 999,
            originalPrice: null,
            perToken: "₹4.99",
            color: "from-blue-500 to-indigo-500",
            icon: "🌱"
        },
        {
            id: "value",
            name: "Value",
            tokens: 350,
            price: 1200,
            originalPrice: 1500,
            perToken: "₹3.43",
            popular: true,
            color: "from-purple-500 to-pink-500",
            icon: "⭐"
        },
        {
            id: "premium",
            name: "Premium",
            tokens: 500,
            price: 1500,
            originalPrice: null,
            perToken: "₹3.00",
            color: "from-amber-500 to-orange-500",
            icon: "👑"
        },
    ];

    // Get plan from URL params or default to value - initialize immediately
    const planId = searchParams.get("plan") || "value";
    const initialPlan = plans.find(p => p.id === planId) || plans[1];
    const [selectedPlan, setSelectedPlan] = useState(initialPlan);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            await api.post("/tokens/purchase", { plan: selectedPlan.id });
            setShowSuccess(true);
        } catch (err) {
            alert(err.response?.data?.error || "Payment failed.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="bg-gray-50 min-h-screen">
                <Navbar />
                <div className="min-h-[80vh] flex items-center justify-center px-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center">
                        {/* Success Animation */}
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center animate-bounce">
                            <span className="text-4xl">✓</span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                        <p className="text-gray-600 mb-6">Your tokens have been added to your account.</p>

                        {/* Token Summary */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-8">
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <span className="text-4xl">🪙</span>
                                <span className="text-4xl font-bold text-amber-600">+{selectedPlan.tokens}</span>
                            </div>
                            <p className="text-amber-700">Tokens added to your balance</p>
                        </div>

                        {/* Transaction Details */}
                        <div className="text-left bg-gray-50 rounded-xl p-4 mb-8 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Transaction ID</span>
                                <span className="font-mono text-gray-700">TXN{Date.now()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Plan</span>
                                <span className="font-medium text-gray-700">{selectedPlan.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Amount Paid</span>
                                <span className="font-medium text-gray-700">₹{selectedPlan.price}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Link
                                to="/creator/dashboard"
                                className="block w-full py-3 rounded-xl bg-gradient-to-r from-[#5157a1] to-[#393873] text-white font-semibold hover:shadow-lg transition-all"
                            >
                                Go to Dashboard
                            </Link>
                            <Link
                                to="/creator/tokens"
                                className="block w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all"
                            >
                                View Token Balance
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            {/* Hero Header */}
            <div className="relative bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#c7eff9]/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    <div className="max-w-5xl mx-auto">
                        {/* Breadcrumb */}
                        <nav className="reveal flex items-center gap-2 text-sm text-white/60 mb-4">
                            <Link to="/user/shop" className="hover:text-white transition-colors">Shop</Link>
                            <span>/</span>
                            <span className="text-white">Checkout</span>
                        </nav>

                        <div className="reveal">
                            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                                Complete Your <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Purchase</span>
                            </h1>
                            <p className="text-white/70">
                                Secure checkout • Instant delivery
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8 -mt-4 relative z-20">
                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-5 gap-8">

                        {/* Left Column - Payment Form */}
                        <div className="lg:col-span-3 space-y-6">

                            {/* Plan Selection */}
                            <div className="reveal bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center">
                                        📦
                                    </span>
                                    Select Plan
                                </h2>

                                <div className="grid grid-cols-3 gap-3">
                                    {plans.map((plan) => (
                                        <button
                                            key={plan.id}
                                            onClick={() => setSelectedPlan(plan)}
                                            className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-center ${selectedPlan?.id === plan.id
                                                ? "border-[#5157a1] bg-[#5157a1]/5 shadow-lg"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            {plan.popular && (
                                                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#e7bdd3] text-[#393873] text-xs rounded-full font-semibold whitespace-nowrap">
                                                    Popular
                                                </span>
                                            )}
                                            <div className="text-2xl mb-1">{plan.icon}</div>
                                            <p className="font-semibold text-gray-900">{plan.name}</p>
                                            <p className="text-sm text-gray-500">{plan.tokens} 🪙</p>
                                            <p className="font-bold text-[#5157a1] mt-1">₹{plan.price}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="reveal delay-1 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center">
                                        💳
                                    </span>
                                    Payment Method
                                </h2>

                                {/* Payment Method Tabs */}
                                <div className="flex gap-3 mb-6">
                                    {[
                                        { id: "card", label: "Card", icon: "💳" },
                                        { id: "upi", label: "UPI", icon: "📱" },
                                        { id: "netbanking", label: "Net Banking", icon: "🏦" },
                                    ].map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setPaymentMethod(method.id)}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all duration-300 ${paymentMethod === method.id
                                                ? "border-[#5157a1] bg-[#5157a1]/5"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <span>{method.icon}</span>
                                            <span className="font-medium text-gray-700">{method.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Payment Form */}
                                <form onSubmit={handleSubmit}>
                                    {paymentMethod === "card" && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                    Card Number
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="cardNumber"
                                                        placeholder="1234 5678 9012 3456"
                                                        value={formData.cardNumber}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 focus:border-[#5157a1] transition-all"
                                                        maxLength={19}
                                                    />
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                                                        <span className="text-lg">💳</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                    Cardholder Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardName"
                                                    placeholder="John Doe"
                                                    value={formData.cardName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 focus:border-[#5157a1] transition-all"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                        Expiry Date
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="expiry"
                                                        placeholder="MM/YY"
                                                        value={formData.expiry}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 focus:border-[#5157a1] transition-all"
                                                        maxLength={5}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                        CVV
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="cvv"
                                                        placeholder="•••"
                                                        value={formData.cvv}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 focus:border-[#5157a1] transition-all"
                                                        maxLength={4}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethod === "upi" && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                UPI ID
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="upiId"
                                                    placeholder="yourname@upi"
                                                    value={formData.upiId}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5157a1]/20 focus:border-[#5157a1] transition-all"
                                                />
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                    <span className="text-lg">📱</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex items-center gap-4 justify-center">
                                                {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                                                    <button
                                                        key={app}
                                                        type="button"
                                                        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
                                                    >
                                                        {app}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethod === "netbanking" && (
                                        <div className="grid grid-cols-2 gap-3">
                                            {["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak", "Other Banks"].map((bank) => (
                                                <button
                                                    key={bank}
                                                    type="button"
                                                    className="p-4 rounded-xl border border-gray-200 text-gray-700 font-medium hover:border-[#5157a1] hover:bg-[#5157a1]/5 transition-all text-center"
                                                >
                                                    {bank}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Security Notice */}
                                    <div className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                                        <span className="text-lg">🔒</span>
                                        <p className="text-sm text-emerald-700">
                                            Your payment is secured with 256-bit SSL encryption
                                        </p>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className={`mt-6 w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${isProcessing
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-[#5157a1] to-[#393873] hover:shadow-xl hover:shadow-[#5157a1]/25 transform hover:-translate-y-0.5"
                                            }`}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <span>🔐</span>
                                                Pay ₹{selectedPlan.price} Securely
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Order Summary Card */}
                            <div className="reveal delay-2 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 lg:sticky lg:top-24">
                                <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

                                {/* Selected Plan */}
                                <div className={`bg-gradient-to-br ${selectedPlan.color} rounded-xl p-5 text-white mb-6`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">{selectedPlan.icon}</span>
                                            <div>
                                                <p className="font-bold text-lg">{selectedPlan.name} Plan</p>
                                                <p className="text-white/80 text-sm">{selectedPlan.perToken} per token</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 py-3 bg-white/20 rounded-lg">
                                        <span className="text-3xl">🪙</span>
                                        <span className="text-3xl font-bold">{selectedPlan.tokens}</span>
                                        <span className="text-white/80">tokens</span>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>₹{selectedPlan.originalPrice || selectedPlan.price}</span>
                                    </div>
                                    {selectedPlan.originalPrice && (
                                        <div className="flex justify-between text-emerald-600">
                                            <span>Discount</span>
                                            <span>-₹{selectedPlan.originalPrice - selectedPlan.price}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-gray-600">
                                        <span>GST (18%)</span>
                                        <span>Included</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                                        <span className="font-bold text-gray-900">Total</span>
                                        <span className="font-bold text-2xl text-gray-900">₹{selectedPlan.price}</span>
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm font-semibold text-gray-700 mb-3">What you get:</p>
                                    <ul className="space-y-2">
                                        {[
                                            `${selectedPlan.tokens} tokens instantly credited`,
                                            "Apply to unlimited campaigns",
                                            "Unlock sponsor contacts",
                                            "No expiry on tokens",
                                        ].map((benefit, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                <span className="text-emerald-500">✓</span>
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Support */}
                            <div className="reveal delay-3 bg-[#5157a1]/5 rounded-2xl p-5 border border-[#5157a1]/10">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm">
                                        💬
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Need Help?</p>
                                        <p className="text-sm text-gray-600 mb-2">We're here to assist you</p>
                                        <a href="#" className="text-sm font-medium text-[#5157a1] hover:underline">
                                            Contact Support →
                                        </a>
                                    </div>
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
