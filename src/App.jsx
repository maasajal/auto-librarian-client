import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="font-Lato">
      <Navbar />
      <div className="max-w-7xl mx-auto px-3 md:px-8 lg:px-14">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
