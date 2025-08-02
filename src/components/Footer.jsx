import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHome,
  FaUserAlt,
  FaCode,
  FaBlogger,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TbBrandVscode } from "react-icons/tb";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-pink-50 via-pink-100 to-pink-50 py-10 px-6 border-t border-pink-200 font-quicksand text-[#2f2f2f] h-[auto]  "
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        {/* Column 1 – Signature + Quote */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-josefin font-bold text-[#f28585] mb-2">
            Paresh Daki
          </h3>
          <p className="text-sm">
            MERN Stack Developer <br />
            Based in Ahmedabad 🇮🇳
          </p>
          <p className="text-xs mt-3 italic text-[#666] font-quicksand">
            "Code with heart, build with soul." 🧠
          </p>
        </motion.div>

        {/* Column 2 – Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-josefin font-bold text-[#f28585] mb-2">
            Quick Links
          </h3>
          <ul className="flex flex-col items-center sm:items-start space-y-2 font-quicksand text-[#666] text-sm sm:text-base">
            {[
              { label: "Home", href: "/", icon: <FaHome /> },
              { label: "About", href: "/about", icon: <FaUserAlt /> },
              { label: "Projects", href: "/projects", icon: <FaCode /> },
              { label: "Contact", href: "/contact", icon: <FaEnvelope /> },
              { label: "Skills", href: "/skills", icon: <TbBrandVscode /> },
              { label: "Blog", href: "/blog", icon: <FaBlogger /> },
            ].map(({ href, label, icon }) => (
              <li key={label} className="group transition-all">
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
        </motion.div>

        {/* Column 3 – Socials & Back to Top */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-josefin font-bold text-[#f28585] mb-2">
            Let's Connect
          </h3>
          <motion.div
            className="flex justify-center sm:justify-start gap-4 text-xl text-[#666] mb-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <a
              href="https://github.com/paresh954"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#d63384] transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/paresh954"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#d63384] transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:dakiparesh84@gmail.com"
              className="hover:text-[#d63384] transition"
            >
              <FaEnvelope />
            </a>
          </motion.div>
          <p
            onClick={() => scrollToTop()}
            className="text-sm text-[#666] hover:underline font-quicksand hover:text-[#d63384] transition"
          >
            ⬆ Back to Top
          </p>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="mt-10 text-center text-xs text-[#999] font-quicksand"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        © {new Date().getFullYear()} Paresh Daki. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
