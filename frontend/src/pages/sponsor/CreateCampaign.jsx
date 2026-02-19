import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../api";

export default function CreateCampaign() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    niche: "Technology",
    deadline: "",
    tokenCost: 2,
    platforms: [],
    requirements: "",
    deliverables: "",
  });

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
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const togglePlatform = (platform) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      budget: form.budget,
      niche: form.niche,
      deadline: form.deadline,
      token_cost: form.tokenCost,
      platforms: form.platforms.join(","),
      requirements: form.requirements,
      deliverables: form.deliverables,
    };

    api.post("/sponsor/campaigns", payload)
      .then(() => {
        alert("Campaign created successfully!");
        navigate("/sponsor/campaigns");
      })
      .catch(err => {
        alert(err.response?.data?.error || "Failed to create campaign.");
      });
  };

  const inputStyle = `
    w-full p-3 rounded-xl
    bg-white shadow-md
    focus:outline-none focus:ring-2 focus:ring-[#5157a1]
    focus:shadow-lg
    transition-all duration-200
  `;

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#393873] via-[#5157a1] to-[#393873] py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="reveal text-white">
            <nav className="text-sm text-white/60 mb-4">
              <Link to="/sponsor/dashboard" className="hover:text-white">
                Dashboard
              </Link>{" "}
              → <span className="text-white">Create Campaign</span>
            </nav>
            <h1 className="text-3xl font-bold mb-2">Create New Campaign</h1>
            <p className="text-white/70">
              Post a campaign and start receiving creator applications
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="reveal bg-white rounded-3xl shadow-xl p-8 space-y-8"
        >
          {/* Campaign Info */}
          <section>
            <h2 className="text-xl font-bold mb-4">📋 Campaign Info</h2>
            <div className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Campaign Title"
                className={inputStyle}
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                placeholder="Campaign Description"
                rows={4}
                className={inputStyle}
              />
            </div>
          </section>

          {/* Meta */}
          <section className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-500">Budget</label>
              <input
                name="budget"
                value={form.budget}
                onChange={handleChange}
                required
                placeholder="₹20,000"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Niche</label>
              <select
                name="niche"
                value={form.niche}
                onChange={handleChange}
                required
                className={inputStyle}
              >
                <option value="" disabled>
                  Select Niche
                </option>
                <option>Technology</option>
                <option>Gaming</option>
                <option>Fashion</option>
                <option>Fitness</option>
                <option>Food</option>
                <option>Travel</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                required
                className={inputStyle}
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Token Cost (per post)
              </label>
              <input
                type="number"
                value={2}
                disabled
                className="w-full p-3 rounded-xl bg-gray-100 shadow-inner cursor-not-allowed"
              />
            </div>
          </section>

          {/* Platforms */}
          <section>
            <h2 className="text-xl font-bold mb-3">📱 Platforms</h2>
            <div className="flex flex-wrap gap-3">
              {["YouTube", "Instagram", "Twitter"].map((platform) => (
                <button
                  type="button"
                  key={platform}
                  onClick={() => togglePlatform(platform)}
                  className={`px-4 py-2 rounded-xl cursor-pointer transition-all duration-200
                    ${form.platforms.includes(platform)
                      ? "bg-[#5157a1] text-white shadow-md scale-95"
                      : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </section>

          {/* Requirements & Deliverables */}
          <section className="grid md:grid-cols-2 gap-6">
            <textarea
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              placeholder="Requirements (one per line)"
              rows={5}
              className={inputStyle}
            />
            <textarea
              name="deliverables"
              value={form.deliverables}
              onChange={handleChange}
              placeholder="Deliverables (one per line)"
              rows={5}
              className={inputStyle}
            />
          </section>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <Link
              to="/sponsor/campaigns"
              className="px-6 py-3 rounded-xl font-medium cursor-pointer transition hover:bg-gray-200"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="
                px-8 py-3 rounded-xl
                bg-gradient-to-r from-[#5157a1] to-[#393873]
                text-white font-semibold
                cursor-pointer
                transition-all duration-200
                hover:shadow-lg hover:-translate-y-0.5
                active:scale-95 active:translate-y-0
              "
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
