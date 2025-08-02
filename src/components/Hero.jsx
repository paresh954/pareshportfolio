import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import flowerImg from "/pinkfl.png"; // use light pink flower PNG

import { useNavigate } from "react-router-dom";

import { FaFolderOpen, FaMagic, FaUserTie } from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const usenavigate = useNavigate();
  useEffect(() => {
    const updateMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      console.log(mousePos);
    };
    document.addEventListener("mousemove", updateMouse);
    return () => document.removeEventListener("mousemove", updateMouse);
  }, []);

  useEffect(() => {
    const flowerCount = 40;
    const container = document.getElementById("flower-container");
    container.innerHTML = "";
    for (let i = 0; i < flowerCount; i++) {
      const flower = document.createElement("p");
      flower.innerHTML = `✨`;
      flower.className = "flower z-0";

      // random styles
      flower.style.left = Math.random() * 100 + "vw";
      flower.style.animationDuration = 4 + Math.random() * 5 + "s";
      flower.style.animationDelay = Math.random() * 3 + "s";
      flower.style.width = 20 + Math.random() * 10 + "px";
      flower.style.opacity = 0.5 + Math.random() * 0.5;

      container.appendChild(flower);
    }
  }, []);

  return (
    <section
      id="home"
      className="relative  min-h-[600px] flex flex-col justify-center items-center bg-[#fdf6f0] text-center overflow-hidden px-4 font-quicksand"
    >
      {/* Falling Flowers */}
      <div
        id="flower-container"
        className="absolute inset-0 z-0 pointer-events-none"
      ></div>

      {/* Mouse Glow */}
      <motion.div
        className="hidden sm:block pointer-events-none fixed top-0 left-0 w-40 h-40 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-white opacity-70 blur-2xl z-10 mix-blend-multiply"
        animate={{
          x: mousePos.x - 80,
          y: mousePos.y - 80,
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 25,
        }}
      />

      {/* Main Content */}
      <motion.div
        className="z-20 flex justify-center flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl  max-[350px]:text-2xl sm:text-5xl font-bold text-[#ff69b4] mb-2 tracking-wide font-pacifico flex items-center justify-center gap-2">
          <FaUserTie className="text-[#ff69b4]" />
          Hi, I'm Paresh
        </h1>

        <h2 className="text-xl sm:text-2xl text-[#2f2f2f] font-semibold mb-6">
          A creative{" "}
          <span className="text-[#f28585] font-bold">MERN Stack Developer</span>{" "}
          from Gujarat
        </h2>

        <p className="text-[#444] text-base sm:text-lg max-w-2xl leading-relaxed mb-6">
          I design responsive, user-friendly web experiences using
          <span className="font-semibold text-[#ff69b4]"> React</span>,
          <span className="font-semibold text-[#f28585]"> Node.js</span>, and
          <span className="font-semibold text-[#c3aed6]"> MongoDB</span>. I love
          combining clean code with{" "}
          <GiSparkles className="inline text-yellow-400" /> a sprinkle of design
          magic <FaMagic className="inline text-pink-400" /> to build things
          that not only work great — but also feel joyful to use.
        </p>

        <button
          className="mt-2 px-6 py-2 bg-[#f28585] text-white rounded-full hover:bg-[#f06292] transition font-semibold tracking-wide flex items-center gap-2 justify-center"
          onClick={() => usenavigate("/projects")}
        >
          <FaFolderOpen />
          View My Projects
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
