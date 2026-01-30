import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import CreatorDashboard from "./pages/creator/CreatorDashboard"
import CreatorProfile from "./pages/creator/CreatorProfile"
import BrowseCampaigns from "./pages/creator/BrowseCampaigns"
import CampaignDetails from "./pages/creator/CampaignDetails"
import Applications from "./pages/creator/Applications"
import TokenUsage from "./pages/creator/TokenUsage"
import ShopPage from "./pages/tokens/ShopPage"
import TokenCheckout from "./pages/tokens/TokenCheckout"
import AdminDashboard from "./pages/admin/AdminDashboard"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/creator/dashboard" element={<CreatorDashboard />} />
        <Route path="/creator/profile" element={<CreatorProfile />} />
        <Route path="/creator/campaigns" element={<BrowseCampaigns />} />
        <Route path="/creator/campaign/:id" element={<CampaignDetails />} />
        <Route path="/creator/applications" element={<Applications />} />
        <Route path="/creator/tokens" element={<TokenUsage />} />
        <Route path="/user/shop" element={<ShopPage />} />
        <Route path="/user/checkout" element={<TokenCheckout />} />
        <Route path="/admin/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
