// components/Projects.jsx
import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { motion } from "framer-motion";
import { fetchProjects } from "../redux/slices/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaProjectDiagram } from "react-icons/fa";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  console.log("projects", projects);

  return (
    <section
      id="projects"
      className="  py-20 px-6 sm:px-12 bg-[#fff4f8] text-center font-quicksand"
    >
      {status === "loading" && (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#ff69b4]"></div>
        </div>
      )}

      <motion.h2
        className="mt-[29px] text-4xl sm:text-5xl font-bold text-[#ff69b4] font-josefin mb-10 flex justify-center gap-2 items-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaProjectDiagram className="text-[#ff69b4]" />
        Projects
      </motion.h2>
      {projects.length === 0 && (
        <div className="flex items-center justify-center">
          <p className="text-2xl font-bold text-[#ff69b4]">No projects found</p>
        </div>
      )}

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onViewDetails={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
