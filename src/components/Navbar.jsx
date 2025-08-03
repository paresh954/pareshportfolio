import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUserAlt,
  FaCode,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { TbBrandVscode } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaBlogger } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Scroll detection for hide/show
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNav(false); // scrolling down
      } else {
        setShowNav(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 right-0 w-full z-50 shadow-sm backdrop-blur-md bg-white/30 border-b border-white/20 transition-transform duration-300 drop-shadow-lg
 ${showNav ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="max-w-4xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-[#ff69b4] tracking-wider font-pacifico">
          <Link to="/">
            Paresh<span className="text-[#f28585]"></span>
          </Link>
        </h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 font-medium font-quicksand text-[#2f2f2f] text-sm sm:text-base">
          {[
            { label: "Home", href: "/", icon: <FaHome /> },
            { label: "About", href: "/about", icon: <FaUserAlt /> },
            { label: "Projects", href: "/projects", icon: <FaCode /> },
            { label: "Contact", href: "/contact", icon: <FaEnvelope /> },
            { label: "Skills", href: "/skills", icon: <TbBrandVscode /> },
            { label: "Blog", href: "/blog", icon: <FaBlogger /> },
            { label: "Admin", href: "/admin", icon: <FaBlogger /> },
          ].map(({ label, href, icon }) => (
            <li className="group" key={label}>
              <Link
                to={href}
                className="flex items-center gap-1 hover:text-[#ff69b4] transition-all"
              >
                <span className="text-xs group-hover:-translate-y-1 duration-300">
                  {icon}
                </span>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamb  urger */}
        <button
          className="md:hidden text-[#f28585] text-xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="md:hidden bg-white/60 backdrop-blur-md px-4 pt-3 pb-6 space-y-4 font-quicksand text-[#2f2f2f] text-sm sm:text-base transition-all">
          {[
            { label: "Home", href: "/", icon: <FaHome /> },
            { label: "About", href: "/about", icon: <FaUserAlt /> },
            { label: "Projects", href: "/projects", icon: <FaCode /> },
            { label: "Contact", href: "/contact", icon: <FaEnvelope /> },
            { label: "Skills", href: "/skills", icon: <TbBrandVscode /> },
            { label: "Blog", href: "/blog", icon: <FaBlogger /> },
            { label: "Admin", href: "/admin", icon: <FaBlogger /> },
          ].map(({ label, href, icon }) => (
            <li key={label}>
              <Link
                to={href}
                onClick={closeMenu}
                className="flex items-center gap-2 hover:text-[#ff69b4]"
              >
                {icon}
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
