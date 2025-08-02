import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../redux/slices/blogSlice";
import { FaBookOpen, FaArrowRight } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdClear } from "react-icons/md";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("");

  const dispatch = useDispatch();
  const {
    items: blogs,
    status,
    error,
    count,
  } = useSelector((state) => state.blogs);

  console.log("status", status);
  console.log("error", error);
  console.log("count", count);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = activeTag ? blog.tag.includes(activeTag) : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(blogs.flatMap((b) => b.tag))];

  return (
    <section className="min-h-screen px-6 sm:px-10 py-20 bg-[#fff0f5] font-quicksand">
      <motion.h2
        className="text-4xl sm:text-5xl font-bold font-josefin text-center text-[#ff69b4] mb-10 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaBookOpen className="text-[#ff69b4]" />
        Blog Posts
      </motion.h2>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10 relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
        <input
          type="text"
          placeholder="Search blog title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#ffd9e8] bg-[#fff4f8] text-[#444] placeholder-[#aaa] focus:outline-none focus:ring-2 focus:ring-[#ff69b4] transition"
        />
      </div>

      {/* Tag Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {allTags.map((tag, i) => (
          <button
            key={i}
            onClick={() => setActiveTag(tag === activeTag ? "" : tag)}
            className={`text-xs px-4 py-2 rounded-full border ${
              tag === activeTag
                ? "bg-[#ff69b4] text-white border-[#ff69b4]"
                : "bg-[#fff4f8] text-[#d63384] border-[#ffd9e8]"
            } transition hover:scale-105`}
          >
            #{tag}
          </button>
        ))}
        {activeTag && (
          <button
            onClick={() => setActiveTag("")}
            className="flex items-center gap-1 text-xs px-4 py-2 rounded-full border border-[#ffd9e8] text-[#777] bg-white hover:bg-[#ffeaf3] transition"
          >
            <MdClear size={16} />
            Clear Filter
          </button>
        )}
      </div>

      {/* Blog Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, idx) => (
            <motion.div
              key={idx}
              className="bg-[#fff4f8] border border-[#ffd9e8] p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#ff69b4] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-[#ff69b4] mb-2 leading-snug">
                {blog.title}
              </h3>
              <p className="text-sm text-[#444] leading-relaxed mb-3">
                {blog.description}
              </p>
              <p className="text-xs text-[#888] italic mb-3">
                {blog.date.split("T")[0]}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tag.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-[#ffdce8] text-[#d63384] text-xs px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/blog/${blog.slug}`}
                className="inline-flex items-center gap-1 text-sm text-[#f28585] hover:text-[#d63384] transition"
              >
                Read More <FaArrowRight className="mt-[1px]" />
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-2xl text-[#888] col-span-full">
            No blog found 😞
          </p>
        )}
      </div>
    </section>
  );
};

export default Blog;
