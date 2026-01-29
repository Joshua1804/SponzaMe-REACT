import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Login() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbff] selection:bg-[#5157a1] selection:text-white">
      <Navbar />

      <main className="relative flex items-center justify-center py-20 px-4 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="relative w-full max-w-6xl reveal">
          <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden border border-white/40 flex flex-col md:flex-row">
            
            {/* LEFT SIDE: FORM */}
            <div className="w-full md:w-[45%] p-12 lg:p-20 flex flex-col justify-center">
              <div className="reveal delay-1">
                <div className="w-14 h-2 bg-[#5157a1] rounded-full mb-5"></div>

                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 text-[#393873]">
                  Welcome back
                </h1>

                <p className="text-slate-500 text-lg mb-10">
                  Enter your details to access your dashboard.
                </p>
              </div>

              <div className="relative flex items-center mb-8 reveal delay-2">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-sm uppercase tracking-widest">
                  sign in
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <form className="space-y-5 reveal delay-3">
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4
                    focus:ring-4 focus:ring-[#5157a1]/10 focus:border-[#5157a1]
                    outline-none transition-all"
                  />
                </div>

                <div className="group">
                  <div className="flex justify-between mb-2 ml-1">
                    <label className="text-sm font-semibold text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-sm font-medium text-[#5157a1] hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4
                    focus:ring-4 focus:ring-[#5157a1]/10 focus:border-[#5157a1]
                    outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#393873] hover:bg-[#2f2e63] text-white py-4
                  rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl
                  active:scale-[0.98] mt-4"
                >
                  Sign in
                </button>
              </form>

              <p className="mt-10 text-center text-slate-600 reveal delay-3">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#5157a1] font-bold hover:underline"
                >
                  Create one for free
                </Link>
              </p>
            </div>

            {/* RIGHT SIDE: VISUAL */}
            <div className="hidden md:block md:w-[55%] relative p-8">
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070"
                  alt="Workplace"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute bottom-10 left-10 right-10 p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl text-white">
                  <p className="text-lg font-medium italic mb-4">
                    "This platform has completely transformed how we handle our sponsorships. The interface is just intuitive."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5157a1] to-purple-400"></div>
                    <div>
                      <p className="font-bold">Sarah Jenkins</p>
                      <p className="text-sm opacity-80">
                        Product Manager at TechFlow
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
