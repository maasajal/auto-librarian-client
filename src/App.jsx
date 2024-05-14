import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import { useState } from "react";

function App() {
  const [dark, setDark] = useState(false);
  const toggleTheme = () => {
    setDark(!dark);
  };
  return (
    <div className={`font-Lato ${dark ? "bg-slate-800 text-white" : "bg-white"}`}>
      <Navbar dark={dark} toggleTheme={toggleTheme} />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
