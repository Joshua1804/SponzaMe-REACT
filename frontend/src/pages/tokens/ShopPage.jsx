import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ShopPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20">
        <h1 className="text-4xl font-bold mb-4 text-[#393873]">Buy Tokens</h1>
        <p className="text-[#5157a1] mb-12">
          Choose a plan that fits your needs
        </p>

        <div className="grid md:grid-cols-3 gap-10 items-stretch">

          {/* Basic Plan */}
          <div className="bg-white rounded-3xl shadow-lg p-8 w-80 
            hover:scale-105 transition-transform duration-300 hover:shadow-2xl
            flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl font-semibold mb-1 text-[#393873]">Basic</h2>
              <p className="text-[#5157a1] mb-4">Perfect to get started</p>
              <h3 className="text-4xl font-bold mb-2 text-[#393873]">₹999</h3>

              <ul className="text-[#393873] space-y-1 mb-3">
                <li>✔ 200 Tokens</li>
              </ul>

              <ul className="text-sm text-[#5157a1] space-y-1 mb-6">
                <li>• Try out core features</li>
                <li>• Light usage</li>
                <li>• Quick setup</li>
              </ul>
            </div>

            <button className="w-full bg-[#5157a1] text-white py-3 rounded-full 
              hover:bg-[#393873] transition cursor-pointer">
              Buy Now
            </button>
          </div>

          {/* Value Plan */}
          <div className="relative bg-white rounded-3xl shadow-xl p-8 w-80 
            hover:scale-105 transition-transform duration-300 hover:shadow-2xl border-2 border-[#5157a1]
            flex flex-col justify-between h-full">

            <span className="absolute -top-4 right-4 bg-[#e7bdd3] text-[#393873] text-sm px-4 py-1 rounded-full font-semibold">
              SAVE ₹300
            </span>

            <div>
              <h2 className="text-2xl font-semibold mb-1 text-[#393873]">Value</h2>
              <p className="text-[#5157a1] mb-4">Best balance of price & tokens</p>
              <h3 className="text-4xl font-bold mb-1 text-[#393873]">₹1200</h3>
              <p className="text-[#5157a1] line-through mb-2">₹1500</p>

              <ul className="text-[#393873] space-y-1 mb-3">
                <li>✔ 350 Tokens</li>
              </ul>

              <ul className="text-sm text-[#5157a1] space-y-1 mb-6">
                <li>• Most popular choice</li>
                <li>• Balanced usage</li>
                <li>• Better token value</li>
              </ul>
            </div>

            <button className="w-full bg-[#5157a1] text-white py-3 rounded-full 
              hover:bg-[#393873] transition cursor-pointer">
              Buy Now
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-[#393873] to-[#5157a1] text-white 
            rounded-3xl shadow-lg p-8 w-80 
            hover:scale-105 transition-transform duration-300 hover:shadow-2xl
            flex flex-col justify-between h-full">

            <div>
              <h2 className="text-2xl font-semibold mb-1">Premium</h2>
              <p className="text-[#c7eff9] mb-4">For power users</p>
              <h3 className="text-4xl font-bold mb-2">₹1500</h3>

              <ul className="space-y-1 mb-3">
                <li>✔ 500 Tokens</li>
              </ul>

              <ul className="text-sm text-[#c7eff9] space-y-1 mb-6">
                <li>• Heavy usage</li>
                <li>• Longer sessions</li>
                <li>• Maximum value</li>
              </ul>
            </div>

            <button className="w-full bg-[#e7bdd3] text-[#393873] py-3 rounded-full 
              hover:bg-[#c7eff9] transition cursor-pointer font-semibold">
              Buy Now
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
