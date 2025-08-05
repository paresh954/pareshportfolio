import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDatabase,
  FaGitAlt,
  FaFigma,
} from "react-icons/fa";
import { SiSocketdotio, SiRedux } from "react-icons/si";
import { RiTailwindCssLine } from "react-icons/ri";
const techIcons = {
  React: FaReact,
  "Node.js": FaNodeJs,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJs,
  MongoDB: FaDatabase,
  GitHub: FaGitAlt,
  Figma: FaFigma,
  "Socket.IO": SiSocketdotio,
  Tailwind: RiTailwindCssLine,
  Redux: SiRedux,
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: project.image.length > 1,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-6 sm:p-8 rounded-2xl max-w-lg w-full relative shadow-xl border border-pink-100 font-quicksand overflow-y-auto max-h-[90vh]   scrollbar-thumb-[#ff69b4]/40 scrollbar-track-pink-100 scrollbar-thin"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-[#f28585] hover:text-[#ff69b4] text-lg"
            onClick={onClose}
          >
            <FaTimes />
          </button>

          {/* Image Slider */}
          <div className="mb-4">
            <Slider {...sliderSettings}>
              {project.image.length !== 1 ? (
                project.image.map((imgUrl, i) => (
                  <div key={i}>
                    <img
                      src={imgUrl}
                      alt={`Screenshot ${i + 1}`}
                      className="w-full h-52 object-cover rounded-lg border border-pink-100"
                    />
                  </div>
                ))
              ) : (
                <img
                  src={project.image[0]}
                  alt="Project Image"
                  className="w-full h-52 object-cover rounded-lg border border-pink-100"
                />
              )}
            </Slider>
          </div>

          {/* Title & Description */}
          <h2 className="text-2xl font-bold font-josefin text-[#f28585]">
            {project.title}
          </h2>
          <p className="text-sm text-[#444] mt-3 leading-relaxed">
            {project.description}
          </p>

          {project.features && project.features.length > 0 && (
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-[#ff69b4] mb-2 tracking-wide">
                ✨ Features:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-[#fff4f8] border border-pink-100 rounded-lg p-2 text-sm text-[#444] hover:bg-[#ffe4ec] transition-all"
                  >
                    <span className="text-[#ff69b4] mt-[2px]">✔</span>
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}

          <div className="flex flex-wrap gap-3 mt-2">
            {project.technologies.map((tech) => {
              const Icon = techIcons[tech];
              return Icon ? (
                <div
                  key={tech}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ffe4ec] hover:bg-[#ffdce8] transition"
                  title={tech}
                >
                  <Icon className="text-[#d63384]" />
                </div>
              ) : (
                <span
                  key={tech}
                  className="text-xs bg-[#ffe4ec] text-[#d63384] px-2 py-1 rounded-full"
                >
                  {tech}
                </span>
              );
            })}
          </div>

          {/* Links */}
          <div className="mt-6 flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-[#f28585] text-white rounded-full hover:bg-[#d63384] transition-all shadow-sm"
              >
                <FaGithub className="text-base" />
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-[#ff69b4] text-white rounded-full hover:bg-[#e91e63] transition-all shadow-sm"
              >
                <FaExternalLinkAlt className="text-base" />
                Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
