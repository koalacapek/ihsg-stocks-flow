import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="flex flex-row font-input-mono w-full h-screen bg-[#F5F5F5]">
      {/* <Sidebar /> */}
      {/* Content */}
      <Dashboard />
    </div>
  );
}

export default App;
