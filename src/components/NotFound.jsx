import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#fff0f5] px-4 font-quicksand text-center">
      <motion.h1
        className="text-8xl sm:text-9xl font-bold text-[#ff69b4] font-josefin"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      <motion.h2
        className="text-2xl sm:text-3xl font-semibold text-[#f28585] mt-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Oops! Page Not Found
      </motion.h2>

      <motion.p
        className="text-[#555] mt-3 max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        The page you're looking for doesn't exist or has been moved. Let's take
        you back to safety!
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff69b4] text-white rounded-full shadow-md hover:bg-[#f06292] transition"
        >
          <FaArrowLeft className="text-sm" />
          Go Home
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFound;
