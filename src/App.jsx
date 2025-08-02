import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import ScrollToTop from "./components/ScrollToTop";
import AppRoutes from "./components/AppRoutes";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    setToken(savedToken);
  }, []);

  return (
    <main className=" ">
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <ScrollToTop />
      <AppRoutes setToken={setToken} />
      {!isAdminRoute && <ChatBot />}
      {!isAdminRoute && <Footer />}
    </main>
  );
}

export default App;
