import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Landing() {
  return (
    <div className="bg-white text-gray-900">
      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Where Creators <br />
            and Brands <br />
            Collaborate Smarter
          </h1>

          <p className="text-gray-600 max-w-md mb-8">
            SponzaMe is a structured sponsorship marketplace that connects
            content creators with brands seeking authentic partnerships.
            Build your profile, discover opportunities, and manage campaigns
            in one place.
          </p>

          <div className="flex gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-lg bg-[#5157a1] text-white font-medium hover:bg-[#393873]"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:border-gray-400"
            >
              Login
            </Link>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/hero.jpg"
            alt="Platform preview"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#ededf4] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">
            How It Works
          </h2>
          <p className="text-gray-600 mb-12">
            Simple steps to successful collaborations
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Creators Build Profiles",
                desc: "Creators showcase their profiles and apply to relevant sponsorship campaigns."
              },
              {
                title: "Sponsors Create Campaigns",
                desc: "Brands create campaigns and discover creators that align with their goals."
              },
              {
                title: "Collaborate on Platform",
                desc: "Work together through a structured and transparent collaboration workflow."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl shadow-sm text-left"
              >
                <div className="w-10 h-10 rounded bg-[#5157a1] mb-4"></div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR BOTH SIDES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-14">
          <h2 className="text-2xl font-semibold">
            Built for Both Sides
          </h2>
          <p className="text-gray-600">
            Powerful features for creators and sponsors alike
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          
          {/* CREATORS */}
          <div className="bg-white rounded-xl shadow p-8">
            <span className="inline-block mb-4 px-3 py-1 rounded bg-[#c7eff9] text-sm">
              For Creators
            </span>
            <ul className="space-y-4 text-gray-600">
              <li>Discover sponsorship opportunities</li>
              <li>Build professional creator profiles</li>
              <li>Track applications and responses</li>
            </ul>
          </div>

          {/* SPONSORS */}
          <div className="bg-white rounded-xl shadow p-8">
            <span className="inline-block mb-4 px-3 py-1 rounded bg-[#e7bdd3] text-sm">
              For Sponsors
            </span>
            <ul className="space-y-4 text-gray-600">
              <li>Find relevant creators</li>
              <li>Manage campaigns efficiently</li>
              <li>Review applications with ease</li>
            </ul>
          </div>

        </div>
      </section>

      {/* PLATFORM EXPERIENCE */}
      <section className="bg-[#ededf4] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="text-2xl font-semibold">
            Professional Platform Experience
          </h2>
          <p className="text-gray-600">
            Designed for efficiency and ease of use
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <img src="/dashboard.jpg" alt="" />
            <p className="p-4 font-medium">Creator Dashboard</p>
          </div>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <img src="/campaign.jpg" alt="" />
            <p className="p-4 font-medium">Campaign Management</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex items-center">
            <div>
              <h3 className="font-semibold mb-2">Work from Anywhere</h3>
              <p className="text-gray-600 text-sm">
                Manage collaborations whether you’re at your desk, in a café,
                or on the go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#5157a1] py-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Next Collaboration?
        </h2>
        <p className="mb-8 text-gray-200">
          Join thousands of creators and brands building meaningful partnerships
          through SponzaMe.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/signup"
            className="px-6 py-3 rounded bg-white text-[#5157a1] font-medium"
          >
            Join as Creator
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 rounded border border-white"
          >
            Join as Sponsor
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-gray-800">SponzaMe</p>
            <p className="mt-2">
              The structured sponsorship marketplace connecting creators and brands.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Platform</p>
            <ul className="mt-2 space-y-1">
              <li>Login</li>
              <li>Signup</li>
              <li>About</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Support</p>
            <ul className="mt-2 space-y-1">
              <li>Help Center</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
