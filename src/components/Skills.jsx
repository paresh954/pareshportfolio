import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaFigma,
} from "react-icons/fa";
import { HiMiniLanguage } from "react-icons/hi2";
import { FaLaptopCode } from "react-icons/fa";

import {
  SiTypescript,
  SiRedux,
  SiMysql,
  SiWebpack,
  SiExpress,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

const skillsData = {
  Frontend: [
    { name: "HTML", percent: 90, icon: FaHtml5, color: "#e44d26" },
    { name: "CSS", percent: 85, icon: FaCss3Alt, color: "#264de4" },
    { name: "JavaScript", percent: 80, icon: FaJs, color: "#f0db4f" },
    { name: "TypeScript", percent: 70, icon: SiTypescript, color: "#3178c6" },
    { name: "React", percent: 75, icon: FaReact, color: "#61dafb" },
    { name: "Redux", percent: 65, icon: SiRedux, color: "#764abc" },
    { name: "Tailwind CSS", percent: 80, icon: FaCss3Alt, color: "#38bdf8" },
  ],
  Backend: [
    { name: "Node.js", percent: 70, icon: FaNodeJs, color: "#3c873a" },
    { name: "Express.js", percent: 65, icon: SiExpress, color: "#000000" },
    { name: "MongoDB", percent: 70, icon: FaDatabase, color: "#4db33d" },
    { name: "MySQL", percent: 60, icon: SiMysql, color: "#00758F" },
  ],
  Tools: [
    { name: "Git/GitHub", percent: 85, icon: FaGitAlt, color: "#ff7043" },
    { name: "Webpack", percent: 60, icon: SiWebpack, color: "#8ed6fb" },
    { name: "Figma", percent: 70, icon: FaFigma, color: "#a259ff" },
    {
      name: "Framer Motion",
      percent: 65,
      icon: TbBrandFramerMotion,
      color: "#999",
    },
  ],
  Languages: [
    { name: "Gujarati", percent: 100, icon: HiMiniLanguage, color: "#e75480" },
    { name: "Hindi", percent: 95, icon: HiMiniLanguage, color: "#fa8072" },
    { name: "English", percent: 85, icon: HiMiniLanguage, color: "#4682b4" },
  ],
};

const Circle = ({ percent, color }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="relative z-10">
      <circle
        stroke="#fce4ec"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <motion.circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

const SkillsTabs = () => {
  const [activeTab, setActiveTab] = useState("Frontend");

  return (
    <section
      id="skills"
      className="py-20 px-6 sm:px-12 bg-[#fff0f5] text-center font-quicksand"
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-[#ff69b4] font-josefin mb-8 flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaLaptopCode className="text-[#ff69b4]" />
        My Skills
      </motion.h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {Object.keys(skillsData).map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-5 py-2 rounded-full border font-poppins text-sm transition-all duration-300 ${
              activeTab === category
                ? "bg-[#f28585] text-white shadow-md"
                : "bg-white text-[#f28585] border-[#f28585] hover:bg-[#ffe4ec]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {skillsData[activeTab].map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                className="group relative flex flex-col items-center bg-white rounded-xl shadow-md p-5 border border-pink-100 hover:shadow-[0_0_20px_rgba(255,105,180,0.2)] transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Glow background */}
                <div className="absolute -top-2 -left-2 w-full h-full rounded-xl bg-gradient-to-br from-pink-100 via-white to-pink-50 blur-2xl opacity-20 z-0" />

                {/* Circle progress & icon */}
                <div className="relative z-10">
                  <div className="relative">
                    <Circle percent={skill.percent} color={skill.color} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-inner">
                      <Icon
                        className="text-xl sm:text-2xl"
                        style={{
                          color: skill.color,
                          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm font-josefin text-[#2f2f2f] group-hover:text-[#f28585] transition">
                  {skill.name}
                </p>
                <p className="text-xs text-[#999]">{skill.percent}%</p>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default SkillsTabs;
