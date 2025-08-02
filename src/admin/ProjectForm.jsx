import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCheck, FaTimes } from "react-icons/fa";
const techList = [
  "React",
  "Node.js",
  "HTML",
  "CSS",
  "JavaScript",
  "MongoDB",
  "GitHub",
  "Figma",
  "Socket.IO",
  "Tailwind",
  "Redux",
];

const ProjectForm = ({
  onSubmit,
  onCancel,
  initialData = null,
  mode = "add",
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([""]);
  const [technologies, setTechnologies] = useState([]);
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");
  const [images, setImages] = useState([]);
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill on edit
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setFeatures(initialData.features || [""]);
      setTechnologies(initialData.technologies || []);
      setGithub(initialData.github || "");
      setDemo(initialData.demo || "");
      setDate(initialData.date?.substring(0, 10) || ""); // ensure yyyy-mm-dd
    }
  }, [initialData]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => {
      const isImage = ["image/jpeg", "image/png"].includes(file.type);
      const isSmall = file.size <= 1024 * 1024;
      return isImage && isSmall;
    });

    if (validImages.length !== files.length) {
      toast.error("Only JPG/PNG under 1MB allowed.");
    }

    setImages(validImages);
  };

  const handleFeatureChange = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const handleAddFeature = () => setFeatures([...features, ""]);
  const handleRemoveFeature = (index) =>
    setFeatures(features.filter((_, i) => i !== index));

  const handleCheckboxChange = (tech) => {
    if (technologies.includes(tech)) {
      setTechnologies(technologies.filter((t) => t !== tech));
    } else {
      setTechnologies([...technologies, tech]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !date)
      return toast.error("All required fields!");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("github", github);
    formData.append("demo", demo);

    setIsSubmitting(true);

    features.forEach((f) => formData.append("features", f));
    technologies.forEach((tech) => formData.append("technologies", tech));
    images.forEach((img) => formData.append("image", img));

    const token = localStorage.getItem("adminToken");
    console.log(token);

    try {
      const res = await fetch(
        `https://backend-l5js.onrender.com/api/projects${
          mode === "edit" ? `/${initialData._id}` : ""
        }`,
        {
          method: mode === "edit" ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(
          mode === "edit" ? "✏️ Project updated!" : "✅ Project saved!"
        );
        onSubmit(data.newProject || data.updatedProject);

        if (mode === "add") {
          // Reset only on new submission
          setTitle("");
          setDescription("");
          setFeatures([""]);
          setTechnologies([]);
          setGithub("");
          setDemo("");
          setImages([]);
          setDate("");
        }
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error connecting to server");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Show custom toast confirmation
    toast.custom(
      (t) => (
        <motion.div
          className="bg-white p-4 rounded-lg shadow-lg border border-[#ffdce8] flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-[#333] font-semibold font-josefin">
            Are you sure you want to cancel?
          </p>
          <p className="text-[#555] text-sm">Unsaved changes will be lost.</p>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-[#ff69b4] text-white rounded-full hover:bg-[#f06292] transition flex items-center gap-1"
              onClick={() => {
                // Reset form based on mode

                if (onCancel) onCancel();
                toast.dismiss(t.id);
              }}
            >
              <FaCheck className="text-sm" /> Yes
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition flex items-center gap-1"
              onClick={() => toast.dismiss(t.id)}
            >
              <FaTimes className="text-sm" /> No
            </button>
          </div>
        </motion.div>
      ),
      { duration: Infinity, position: "top-center" }
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-4 mb-6 bg-[#fff4f8] rounded-lg border border-[#ffdce8] space-y-4"
      >
        <h2 className="text-xl font-bold text-[#ff69b4]">
          {mode === "edit" ? "🛠️ Edit Project" : "📌 Add New Project"}
        </h2>

        <input
          type="text"
          placeholder="Project Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-pink-200 rounded"
        />

        <textarea
          rows={4}
          placeholder="Project Description *"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-pink-200 rounded"
        />

        <div>
          <label className="font-semibold text-sm">Features:</label>
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="w-full px-3 py-1 border border-pink-200 rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="text-red-400"
              >
                ✖
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddFeature}
            className="text-sm text-[#ff69b4] mt-2"
          >
            ➕ Add Feature
          </button>
        </div>

        <div>
          <label className="font-semibold text-sm block mb-1">
            Technologies:
          </label>
          <div className="flex flex-wrap gap-3">
            {techList.map((tech) => (
              <label key={tech} className="text-sm flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={technologies.includes(tech)}
                  onChange={() => handleCheckboxChange(tech)}
                />
                {tech}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            {mode === "edit" ? "Update Images (optional)" : "Upload Images"}
          </label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            multiple
            onChange={handleImageUpload}
            className="w-full"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <input
          type="url"
          placeholder="GitHub URL"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className="w-full px-4 py-2 border border-pink-200 rounded"
        />
        <input
          type="url"
          placeholder="Live Demo URL"
          value={demo}
          onChange={(e) => setDemo(e.target.value)}
          className="w-full px-4 py-2 border border-pink-200 rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border border-pink-200 rounded"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-[#ff69b4] text-white rounded hover:bg-[#f06292] transition"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? mode === "edit"
                ? "🔄 Updating..."
                : "⏳ Submitting..."
              : mode === "edit"
              ? "🛠️ Update Project"
              : "📌 Add Project"}
          </button>
          {mode === "edit" && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition"
            >
              🚫 Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default ProjectForm;
