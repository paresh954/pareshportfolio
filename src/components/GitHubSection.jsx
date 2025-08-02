import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const GitHubSection = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.github.com/users/paresh954/repos?sort=updated&per_page=6"
    )
      .then((res) => res.json())
      .then((data) => setRepos(data));
  }, []);

  return (
    <section className="py-20 px-6 sm:px-12 bg-[#fff0f5] text-center font-quicksand">
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-[#ff69b4] font-josefin mb-12 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaGithub className="text-[#f285b9]" /> GitHub Integration
      </motion.h2>

      <motion.div
        className="flex flex-col lg:flex-row justify-center items-center gap-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src={`https://github-readme-stats.vercel.app/api?username=paresh954&show_icons=true&theme=vue&border_radius=10&hide_border=true`}
          alt="GitHub Stats"
          className="rounded-2xl border border-[#ffd9e8] bg-[#fff4f8] p-4 shadow-md hover:scale-[1.02] transition-all duration-300"
        />

        <motion.img
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=paresh954&layout=compact&theme=vue&hide_border=true`}
          alt="Top Languages"
          className="rounded-2xl border border-[#ffd9e8] bg-[#fff4f8] p-4 shadow-md hover:scale-[1.02] transition-all duration-300"
        />
      </motion.div>

      <motion.div
        className="mt-12 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-[#f285b9] mb-4">
          My Contributions
        </h3>
        <div className="bg-[#fff4f8] p-4 rounded-2xl border border-[#ffd9e8]">
          <img
            src="https://ghchart.rshah.org/ff69b4/paresh954"
            alt="GitHub Contribution Chart"
            className="mx-auto"
          />
        </div>
      </motion.div>

      {/* GitHub Repos */}
      <motion.div
        className="mt-16 max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {repos.map((repo) => (
          <motion.a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            key={repo.id}
            className="bg-[#fff4f8] border border-[#ffd9e8] rounded-2xl p-4 text-left shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="text-[#ff69b4] font-semibold text-lg mb-1">
              {repo.name}
            </h4>
            <p className="text-sm text-[#444] mb-2 line-clamp-2">
              {repo.description}
            </p>
            <div className="text-xs text-[#888]">
              ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default GitHubSection;
