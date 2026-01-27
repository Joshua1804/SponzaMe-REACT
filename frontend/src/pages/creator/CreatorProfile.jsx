import Navbar from "../../components/Navbar"

export default function CreatorProfile() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
                JC
              </div>
              <div>
                <h1 className="text-2xl font-bold">John Creator</h1>
                <p className="text-gray-500">Tech & Gadgets</p>
              </div>
            </div>

            <button className="mt-4 md:mt-0 px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Edit Profile
            </button>
          </div>

          {/* BIO */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-gray-600 leading-relaxed">
              I am a tech content creator specializing in smartphone reviews,
              gadget unboxings, and in-depth technology explainers. I collaborate
              with brands to create authentic and engaging promotional content.
            </p>
          </div>

          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            <div>
              <h3 className="font-semibold mb-2">Niche</h3>
              <p className="text-gray-600">Technology, Gadgets</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Pricing</h3>
              <p className="text-gray-600">₹10,000 – ₹30,000 per collaboration</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Platforms</h3>
              <p className="text-gray-600">YouTube, Instagram</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-gray-600">India</p>
            </div>

          </div>

          {/* SOCIAL LINKS */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Social Media</h2>
            <div className="flex gap-4">
              <a
                href="#"
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                YouTube
              </a>
              <a
                href="#"
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Instagram
              </a>
              <a
                href="#"
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Twitter
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
