import React, { useEffect, useState } from "react";
import { deleteBlog, fetchBlogs } from "../redux/slices/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import AdminBlogForm from "./BlogForm";

const AdminBlogs = () => {
  const [editMode, setEditMode] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.blogs);
  const location = useLocation();

  const handleDelete = (id) => {
    toast.custom(
      (t) => (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-[#ffdce8] flex flex-col gap-3">
          <p className="text-[#333] font-semibold">
            Delete "{items.find((b) => b._id === id)?.title}"?
          </p>
          <p className="text-[#555] text-sm">This action cannot be undone.</p>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-[#ff69b4] text-white rounded hover:bg-[#f06292] transition"
              onClick={async () => {
                try {
                  await dispatch(deleteBlog(id)).unwrap();
                  dispatch(fetchBlogs());
                  setEditMode(false);
                  setSelectedBlog(null);
                  toast.dismiss(t.id);
                  toast.success("Blog deleted successfully");
                } catch (err) {
                  console.error("Delete error:", err);
                  toast.dismiss(t.id);
                  toast.error("Failed to delete blog");
                }
              }}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedBlog(null);
  };

  const handleSubmit = (blog) => {
    console.log("Blog submitted:", blog);
    setEditMode(false);
    setSelectedBlog(null);
    dispatch(fetchBlogs()); // Refresh blog list after edit
  };

  useEffect(() => {
    dispatch(fetchBlogs()); // Fetch blogs on mount or route change
  }, [dispatch, location.pathname]);

  console.log("blogs", items);

  return (
    <div className="bg-white p-6 rounded-xl shadow font-quicksand">
      <h2 className="text-xl font-semibold text-[#f285b9] mb-4">
        📝 Blog List
      </h2>
      {status === "loading" && (
        <div className="flex justify-center items-center py-10">
          <div className="w-8 h-8 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {status !== "loading" && (
        <div className="w-full overflow-x-auto">
          <table className="min-w-[640px] w-full text-sm text-left border border-[#ffdce8] rounded-xl overflow-hidden">
            <thead className="text-[#d63384] bg-[#fff0f5]">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-3 px-4 text-center text-base">
                    No blogs found.
                  </td>
                </tr>
              )}
              {items.map((item, index) => (
                <tr
                  key={item._id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-white" : "bg-[#fff9fc]"
                  }`}
                >
                  <td className="py-3 px-4 font-medium text-[#333]">
                    {item.title}
                  </td>
                  <td className="py-3 px-4 text-[#555]">{item.slug}</td>
                  <td className="py-3 px-4 text-[#999]">
                    {item.date.split("T")[0]}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <button
                        className="inline-flex items-center bg-[#ff69b4] text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-[#f06292] transition shadow"
                        onClick={() => {
                          setEditMode(true);
                          setSelectedBlog(item);
                        }}
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                      <button
                        className="inline-flex items-center bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-600 transition shadow"
                        onClick={() => handleDelete(item._id)}
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editMode && (
        <AdminBlogForm
          mode={selectedBlog ? "edit" : "add"}
          initialData={selectedBlog}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default AdminBlogs;
