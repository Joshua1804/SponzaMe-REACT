import { useState, useEffect } from "react"
import AppRoutes from "./routes"
import SplashScreen from "./components/SplashScreen"

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    // Check if this is the initial page load (not a navigation)
    const hasSeenSplash = sessionStorage.getItem("splashShown")
    
    if (hasSeenSplash) {
      setShowSplash(false)
      setIsFirstLoad(false)
    }
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
    sessionStorage.setItem("splashShown", "true")
  }

  return (
    <>
      {showSplash && isFirstLoad && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      <div 
        className={`
          transition-opacity duration-500
          ${showSplash && isFirstLoad ? "opacity-0" : "opacity-100"}
        `}
      >
        <AppRoutes />
      </div>
    </>
  )
}

export default App
