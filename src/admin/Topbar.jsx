import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";

const Topbar = () => {
  const { logout } = useAuth();
  return (
    <header className="bg-white p-4 shadow flex justify-between items-center font-quicksand">
      <h2 className="text-lg font-semibold text-[#f285b9]">
        Welcome, Paresh 💻
      </h2>
      <button
        className="bg-[#ff69b4] hover:bg-[#f06292] text-white text-sm px-4 py-1 rounded-full transition"
        onClick={() => logout()}
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;
