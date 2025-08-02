import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCheck, FaTimes } from "react-icons/fa";
const AdminBlogForm = ({
  onSubmit,
  onCancel,
  initialData = null,
  mode = "add",
}) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill on edit or reset on add
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setSlug(initialData.slug || "");
      setContent(initialData.content || "");
      setTags(initialData.tags || "");
      setPreview(initialData.imageUrl || ""); // Assuming imageUrl from backend
      setImage(null); // Reset image for edit mode
    } else {
      setTitle("");
      setSlug("");
      setContent("");
      setTags("");
      setImage(null);
      setPreview("");
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, and PNG files are allowed.");
      return;
    }

    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image must be smaller than 1MB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !slug || !content || (!image && mode === "add")) {
      toast.error("Please fill all fields and select an image.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", content);
    formData.append("tag", tags);
    if (image) formData.append("image", image);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(
        `https://backend-l5js.onrender.com/api/blogs${
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
        toast.success(mode === "edit" ? "✏️ Blog updated!" : "✅ Blog saved!");

        onSubmit(data.newBlog || data.updatedBlog);
        if (mode === "add") {
          // Clear form only on add
          setTitle("");
          setSlug("");
          setContent("");
          setTags("");
          setImage(null);
          setPreview("");
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
                const resetValues =
                  mode === "edit" && initialData
                    ? {
                        title: initialData.title || "",
                        slug: initialData.slug || "",
                        content: initialData.content || "",
                        tags: initialData.tags || "",
                        image: null,
                        preview: initialData.imageUrl || "",
                      }
                    : {
                        title: "",
                        slug: "",
                        content: "",
                        tags: "",
                        image: null,
                        preview: "",
                      };

                setTitle(resetValues.title);
                setSlug(resetValues.slug);
                setContent(resetValues.content);
                setTags(resetValues.tags);
                setImage(resetValues.image);
                setPreview(resetValues.preview);

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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow mb-10 font-quicksand"
    >
      <h3 className="text-xl font-bold text-[#ff69b4] mb-4">
        {mode === "edit" ? "🛠️ Edit Blog" : "📝 Add New Blog"}
      </h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 p-2 border border-[#ffdce8] rounded"
        required
      />

      <input
        type="text"
        placeholder="Slug (e.g. my-first-blog)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full mb-3 p-2 border border-[#ffdce8] rounded"
        required
      />

      <textarea
        placeholder="Markdown Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        className="w-full mb-3 p-2 border border-[#ffdce8] rounded"
        required
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full mb-3 p-2 border border-[#ffdce8] rounded"
      />

      <div className="mb-3">
        <label className="block mb-1 font-semibold text-sm text-[#d63384]">
          {mode === "edit" ? "Update Image (optional)" : "Upload Image"}
        </label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          className="text-sm"
        />
      </div>

      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Preview"
            className="h-40 w-auto rounded border border-pink-100"
          />
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#ff69b4] hover:bg-[#f06292]"
          } text-white px-6 py-2 rounded-full transition`}
        >
          {isSubmitting
            ? mode === "edit"
              ? "🔄 Updating..."
              : "⏳ Submitting..."
            : mode === "edit"
            ? "🛠️ Update Blog"
            : "➕ Submit Blog"}
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
  );
};

export default AdminBlogForm;
