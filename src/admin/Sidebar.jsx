import React from "react";
import {
  FaChartBar,
  FaProjectDiagram,
  FaPlus,
  FaBook,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const links = [
    { to: "/admin/dashboard", icon: <FaChartBar />, label: "Dashboard" },
    { to: "/admin/projects", icon: <FaProjectDiagram />, label: "Projects" },
    { to: "/admin/projects/add", icon: <FaPlus />, label: "Add Project" },
    { to: "/admin/blogs", icon: <FaBook />, label: "Blogs" },
    { to: "/admin/blogs/add", icon: <FaPlus />, label: "Add Blog" },
  ];

  return (
    <aside className="w-16 md:w-64 bg-white border-r h-screen p-5 transition-all duration-300">
      <h1 className="text-xl font-bold text-[#ff69b4] mb-6 hidden md:block">
        Admin Panel
      </h1>
      <nav className="flex flex-col space-y-6 text-sm font-medium text-[#444]">
        {links.map(({ to, icon, label }, index) => (
          <Link
            to={to}
            key={index}
            className="flex items-center gap-3 hover:text-[#ff69b4] transition-colors"
          >
            <span className="text-xl">{icon}</span>
            <span className="hidden md:block">{label}</span>
          </Link>
        ))}

        <button
          onClick={() => logout()}
          className="flex items-center gap-3 text-left hover:text-[#ff69b4] transition-colors"
        >
          <FaSignOutAlt className="text-xl" />
          <span className="hidden md:block">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
