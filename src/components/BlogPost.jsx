import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { fetchBlogs } from "../redux/slices/blogSlice";
import { useDispatch, useSelector } from "react-redux";

const BlogPost = () => {
  const dispatch = useDispatch();
  const {
    items: blogData,
    status,
    error,
  } = useSelector((state) => state.blogs);

  console.log("status", status);
  console.log("error", error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  const { slug } = useParams();

  const post = blogData.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold text-xl">
        Blog not found!
      </div>
    );
  }

  return (
    <section className="bg-[#fff0f5] min-h-screen p-20 font-quicksand">
      {/* Featured Image */}
      {post.image && (
        <motion.div
          className="w-full h-64 sm:h-96 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      )}

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-5 sm:px-10 py-10 bg-white/70 shadow-lg rounded-xl mt-6">
        <motion.h1
          className="text-3xl sm:text-5xl font-bold text-[#ff69b4] font-josefin mb-3 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {post.title}
        </motion.h1>

        <p className="text-sm text-[#999] italic mb-2">
          {post.date.split("T")[0]}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tag.map((tag, i) => (
            <span
              key={i}
              className="bg-[#ffdce8] text-[#d63384] text-xs px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Markdown Content */}
        <motion.div
          className="prose prose-sm sm:prose-base prose-p:leading-relaxed prose-headings:text-[#ff69b4] prose-headings:font-josefin prose-li:marker:text-[#ff69b4] text-[#444] max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </motion.div>

        <Link
          to="/blog"
          className="inline-block mt-10 text-sm text-[#f28585] hover:text-[#d63384] transition"
        >
          ← Back to Blogs
        </Link>
      </div>
    </section>
  );
};

export default BlogPost;
