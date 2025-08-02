// components/ProjectCard.jsx
import React from "react";
import { FaRegEye } from "react-icons/fa";
import { motion } from "framer-motion";
const ProjectCard = ({ project, onViewDetails }) => {
  return (
    <div className="bg-white  rounded-xl shadow-lg p-5 border hover:shadow-pink-200 transition-all text-left">
      <img
        src={project.image[0]}
        alt={project.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-lg font-bold mt-4 text-[#f28585] font-josefin">
        {project.title}
      </h3>
      <p className="text-sm mt-2 text-[#666] line-clamp-2">
        {project.description}
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewDetails(project)}
        className="mt-4 px-4 py-2 flex items-center gap-2 bg-[#ff69b4] text-white text-sm rounded-full hover:bg-[#f06292] transition font-semibold shadow-sm"
      >
        <FaRegEye className="text-base" />
        View Details
      </motion.button>
    </div>
  );
};

export default ProjectCard;
