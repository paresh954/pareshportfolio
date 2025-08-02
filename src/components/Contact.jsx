import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "https://backend-l5js.onrender.com/api/contact",
        formData
      );
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-[#fff4f8] to-[#ffeef5] px-6 sm:px-12 py-16 font-quicksand text-[#2f2f2f]"
    >
      <div className="max-w-4xl mx-auto text-center mt-[29px]">
        {/* Heading */}
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-[#ff69b4] font-josefin flex justify-center items-center gap-3"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FaPaperPlane className="text-[#f28585]" /> Get in Touch
        </motion.h2>
        <div className="w-16 h-1 bg-[#f28585] mt-2 mx-auto rounded-full mb-10" />

        {/* Description */}
        <motion.p
          className="mb-6 text-base sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Whether you want to work together or just say hi, my inbox is always
          open!
        </motion.p>

        {/* Social Icons */}
        <motion.div
          className="flex justify-center gap-6 text-2xl text-[#f28585] mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <a
            href="https://github.com/paresh954"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff69b4] transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/paresh954"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff69b4] transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:dakiparesh84@gmail.com"
            className="hover:text-[#ff69b4] transition"
          >
            <FaEnvelope />
          </a>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-xl border border-pink-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            className="col-span-1 sm:col-span-2 p-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#ff69b4]"
          />
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
            className="col-span-1 sm:col-span-2 p-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#ff69b4]"
          />
          <textarea
            rows="5"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your Message"
            className="col-span-1 sm:col-span-2 p-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#ff69b4]"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="col-span-1 sm:col-span-2 bg-[#f28585] text-white font-semibold py-3 rounded-full hover:bg-[#f06292] transition flex items-center justify-center gap-2"
          >
            <FaPaperPlane />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
