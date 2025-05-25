// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css"
import Navbar from "./components/Navbar"
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <div className="font-open-sans w-full h-fit bg-[#F5F5F5]">
      <Navbar />
      {/* Content */}
      <Dashboard />
    </div>
  )
}

export default App
