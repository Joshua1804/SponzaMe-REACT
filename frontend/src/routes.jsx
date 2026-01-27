import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import CreatorDashboard from "./pages/creator/CreatorDashboard"
import CreatorProfile from "./pages/creator/CreatorProfile"
import BrowseCampaigns from "./pages/creator/BrowseCampaigns"
import CampaignDetails from "./pages/creator/CampaignDetails"
import Applications from "./pages/creator/Applications"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/creator/dashboard" element={<CreatorDashboard />} />
        <Route path="/creator/profile" element={<CreatorProfile />} />
        <Route path="/creator/campaigns" element={<BrowseCampaigns />} />
        <Route path="/creator/campaign/:id" element={<CampaignDetails />} />
        <Route path="/creator/applications" element={<Applications />} />
      </Routes>
    </BrowserRouter>
  )
}
