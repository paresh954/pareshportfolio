import { motion } from "framer-motion";
import profilePic from "../assets/me.png"; // Optional - your own image path
import { Link } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";

import {
  FaUserAstronaut,
  FaBookOpen,
  FaFileDownload,
  FaEnvelopeOpenText,
} from "react-icons/fa";

const About = () => {
  return (
    <section
      id="about"
      className="bg-gradient-to-b from-[#fff4f8] via-[#fff0f5] to-[#ffe9f0] px-6 sm:px-12 py-16 font-quicksand text-[#2f2f2f]"
    >
      <div className="mt-[29px]  max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-[#ff69b4] font-josefin relative  flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaUserAstronaut className="text-[#ff69b4]" />
          About Me
        </motion.h2>

        {/* Profile + Bio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-12 items-start">
          {/* Left Content */}
          <motion.div
            className="sm:col-span-2 text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base sm:text-lg leading-relaxed mb-4">
              Hey there! I’m{" "}
              <span className="text-[#ff69b4] font-semibold">Paresh</span>, a
              passionate MERN Stack Developer from Gujarat 🇮🇳. I love crafting
              websites that are both aesthetic and functional. Whether it’s
              frontend magic ✨ or backend logic 🧠 — I try to blend both
              beautifully.
            </p>
            <p className="text-base sm:text-lg leading-relaxed mb-6">
              I enjoy solving real-world problems, experimenting with
              animations, and adding personal flavor to everything I build.
              Let’s make something amazing together!
            </p>

            {/* Skills */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-[#ff69b4] font-semibold mb-2 text-lg flex gap-2  items-center">
                <FaLaptopCode className="text-[#ff69b4]" /> My Skills:
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "React.js",
                  "Tailwind CSS",
                  "Node.js",
                  "MongoDB",
                  "Express.js",
                  "Framer Motion",
                  "Git/GitHub",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[#ffe4ec] text-[#d63384] text-sm rounded-full shadow-sm hover:scale-105 transition-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="mt-12">
              <h3 className="text-[#f28585] font-semibold mb-4 text-xl flex items-center gap-2">
                <FaBookOpen className="text-[#f28585]" />
                My Journey
              </h3>

              <div className="border-l-4 border-[#ff69b4] pl-4 space-y-6">
                {[
                  {
                    title: "Bachelor of Computer Applications (BCA)",
                    subtitle:
                      "Bhakt Kavi Narshi Mehta University | 2021 - 2024",
                    desc: "Learned fundamentals of programming, data structures, and built early web projects.",
                  },
                  {
                    title: "React.js  Internship",
                    subtitle: "WaytoWeb | Jun - Nov 2024",
                    desc: "Worked on real client projects using React and Tailwind. Built dynamic forms and landing pages.",
                  },
                  {
                    title: "Personal Projects (MERN Stack)",
                    subtitle: "2024 - Present",
                    desc: "Built portfolio, admin dashboard & a full chat app using MongoDB, Express, React & Node.",
                  },
                ].map((item, idx) => (
                  <div key={idx}>
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <p className="text-sm text-[#666]">{item.subtitle}</p>
                    <p className="text-sm mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-start">
              <a
                href="/MERN_paresh.pdf"
                download
                className="px-6 py-2 bg-[#f28585] text-white font-semibold rounded-full hover:bg-[#f06292] transition flex items-center gap-2"
              >
                <FaFileDownload />
                Download Resume
              </a>

              <Link
                to="/contact"
                className="px-6 py-2 bg-white border border-[#f28585] text-[#f28585] font-semibold rounded-full hover:bg-[#ffe4ec] transition flex items-center gap-2"
              >
                <FaEnvelopeOpenText />
                Contact Me
              </Link>
            </div>
          </motion.div>

          {/* Right Profile Card */}
          <motion.div
            className="sm:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-pink-100 blur-2xl rounded-xl opacity-30 z-0"></div>
              <div className="relative z-10 bg-white rounded-xl shadow-lg p-4 border-2 border-pink-100 hover:shadow-pink-200 transition-all">
                <img
                  src={profilePic}
                  alt="Paresh Daki"
                  className="w-full rounded-lg object-cover"
                />
                <p className="text-center mt-4 font-josefin text-[#f28585] text-sm">
                  MERN Dev | Gujarat 🇮🇳
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
