import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Landing from "./pages/Landing"
import About from "./pages/About"
import Contact from "./pages/Contact"
import AuthPage from "./pages/auth/AuthPage"
import CreatorDashboard from "./pages/creator/CreatorDashboard"
import CreatorProfile from "./pages/creator/CreatorProfile"
import BrowseCampaigns from "./pages/creator/BrowseCampaigns"
import CampaignDetails from "./pages/creator/CampaignDetails"
import Applications from "./pages/creator/Applications"
import TokenUsage from "./pages/tokens/TokenUsage"
import ShopPage from "./pages/tokens/ShopPage"
import TokenCheckout from "./pages/tokens/TokenCheckout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import BrowseCreators from "./pages/sponsor/BrowseCreators"
import SponsorDashboard from "./pages/sponsor/SponsorDashboard"
import SponsorProfile from "./pages/sponsor/SponsorProfile"
import CreatorDetails from "./pages/sponsor/CreatorDetails"
import CreateCampaign from "./pages/sponsor/CreateCampaign"
import ManageCampaigns from "./pages/sponsor/ManageCampaigns"
import CampaignApplicants from "./pages/sponsor/CampaignApplicants"
import CampaignDetail from "./pages/sponsor/CampaignDetail"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />

        {/* Creator routes */}
        <Route path="/creator/dashboard" element={<ProtectedRoute role="creator"><CreatorDashboard /></ProtectedRoute>} />
        <Route path="/creator/profile" element={<ProtectedRoute role="creator"><CreatorProfile /></ProtectedRoute>} />
        <Route path="/creator/campaigns" element={<ProtectedRoute role="creator"><BrowseCampaigns /></ProtectedRoute>} />
        <Route path="/creator/campaign/:id" element={<ProtectedRoute role="creator"><CampaignDetails /></ProtectedRoute>} />
        <Route path="/creator/applications" element={<ProtectedRoute role="creator"><Applications /></ProtectedRoute>} />
        <Route path="/user/tokens" element={<TokenUsage />} />

        {/* Token shop (creator + sponsor) */}
        <Route path="/user/shop" element={<ShopPage />} />
        <Route path="/user/checkout" element={<TokenCheckout />} />

        {/* Admin */}
        <Route path="/admin/admindashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />

        {/* Sponsor routes */}
        <Route path="/sponsor/creators" element={<ProtectedRoute role="sponsor"><BrowseCreators /></ProtectedRoute>} />
        <Route path="/sponsor/dashboard" element={<ProtectedRoute role="sponsor"><SponsorDashboard /></ProtectedRoute>} />
        <Route path="/sponsor/profile" element={<ProtectedRoute role="sponsor"><SponsorProfile /></ProtectedRoute>} />
        <Route path="/sponsor/creator/:id" element={<ProtectedRoute role="sponsor"><CreatorDetails /></ProtectedRoute>} />
        <Route path="/sponsor/create-campaign" element={<ProtectedRoute role="sponsor"><CreateCampaign /></ProtectedRoute>} />
        <Route path="/sponsor/my-campaigns" element={<ProtectedRoute role="sponsor"><ManageCampaigns /></ProtectedRoute>} />
        <Route path="/sponsor/campaign/:id" element={<ProtectedRoute role="sponsor"><CampaignDetail /></ProtectedRoute>} />
        <Route path="/sponsor/applicants" element={<ProtectedRoute role="sponsor"><CampaignApplicants /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
