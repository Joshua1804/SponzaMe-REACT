import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../api";

export default function TokenUsage() {
    const [tokenBalance, setTokenBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [stats, setStats] = useState({ totalEarned: 0, totalSpent: 0, totalPurchased: 0 });

    useEffect(() => {
        api.get("/creator/tokens")
            .then(res => {
                setTokenBalance(res.data.balance || 0);
                const txs = (res.data.transactions || []).map((t, i) => ({
                    id: t.transaction_id || i,
                    type: t.type,
                    description: t.description,
                    amount: t.amount,
                    date: new Date(t.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
                    icon: t.type === "purchased" ? "🛒" : t.type === "earned" ? "🎉" : "📋",
                }));
                setTransactions(txs);
                setStats({
                    totalEarned: txs.filter(t => t.type === "earned").reduce((s, t) => s + t.amount, 0),
                    totalSpent: Math.abs(txs.filter(t => t.type === "spent").reduce((s, t) => s + t.amount, 0)),
                    totalPurchased: txs.filter(t => t.type === "purchased").reduce((s, t) => s + t.amount, 0),
                });
            })
            .catch(() => { });
    }, []);

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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className="max-w-5xl mx-auto">
                        {/* Breadcrumb */}
                        <nav className="reveal flex items-center gap-2 text-sm text-white/60 mb-6">
                            <Link to="/creator/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                            <span>/</span>
                            <span className="text-white">Token Usage</span>
                        </nav>

                        <div className="reveal flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                            {/* Title Section */}
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                                    Token <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Usage</span>
                                </h1>
                                <p className="text-white/70 text-lg">
                                    Track your token transactions and balance
                                </p>
                            </div>

                            {/* Token Balance Card */}
                            <div className="reveal delay-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl px-8 py-6 min-w-[220px] shadow-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                                        🪙
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/80">Current Balance</p>
                                        <p className="text-4xl font-bold text-white">{tokenBalance}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="w-full px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: "Total Earned", value: stats.totalEarned, icon: "🎉", color: "from-emerald-400 to-green-500" },
                            { label: "Total Spent", value: stats.totalSpent, icon: "💸", color: "from-red-400 to-pink-500" },
                            { label: "Total Purchased", value: stats.totalPurchased, icon: "🛒", color: "from-blue-400 to-indigo-500" },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className={`reveal delay-${i + 1} bg-white rounded-2xl p-5 shadow-lg shadow-gray-200/50 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-md`}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">{stat.label}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value} 🪙</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Transaction History */}
                        <div className="lg:col-span-2">
                            <div className="reveal delay-2 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5157a1]/10 to-[#e7bdd3]/10 flex items-center justify-center">
                                            📜
                                        </span>
                                        Transaction History
                                    </h2>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {transactions.map((tx, i) => (
                                        <div
                                            key={tx.id}
                                            className={`p-4 hover:bg-gray-50/50 transition-colors ${i === 0 ? "" : ""}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${tx.type === "earned" ? "bg-emerald-100" :
                                                        tx.type === "purchased" ? "bg-blue-100" :
                                                            "bg-red-100"
                                                        }`}>
                                                        {tx.icon}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{tx.description}</p>
                                                        <p className="text-sm text-gray-500">{tx.date}</p>
                                                    </div>
                                                </div>
                                                <div className={`text-lg font-bold ${tx.amount > 0 ? "text-emerald-600" : "text-red-500"
                                                    }`}>
                                                    {tx.amount > 0 ? "+" : ""}{tx.amount} 🪙
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-6">
                            {/* Buy Tokens Card */}
                            <div className="reveal delay-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl shadow-lg">
                                        🪙
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Need More Tokens?</h3>
                                    <p className="text-sm text-gray-600">
                                        Purchase tokens to apply for campaigns and unlock sponsor contacts.
                                    </p>
                                </div>
                                <Link
                                    to="/user/shop"
                                    className="block w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-center hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Buy Tokens →
                                </Link>
                            </div>

                            {/* Token Info */}
                            <div className="reveal delay-4 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
                                <h3 className="font-bold text-gray-900 mb-4">How to Earn Tokens</h3>
                                <div className="space-y-3">
                                    {[
                                        { text: "Complete campaigns successfully", icon: "✅", tokens: "+10-20" },
                                        { text: "Refer other creators", icon: "🎁", tokens: "+10" },
                                        { text: "Daily login bonus", icon: "📅", tokens: "+1" },
                                        { text: "Profile verification", icon: "✓", tokens: "+5" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">{item.icon}</span>
                                                <span className="text-sm text-gray-700">{item.text}</span>
                                            </div>
                                            <span className="text-sm font-semibold text-emerald-600">{item.tokens}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Back to Dashboard */}
                            <Link
                                to="/creator/dashboard"
                                className="reveal delay-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                            >
                                ← Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
