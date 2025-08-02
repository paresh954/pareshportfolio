import React from "react";
import AdminBlogForm from "../admin/BlogForm";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../redux/slices/blogSlice";
import { useNavigate } from "react-router-dom";

const AddBlogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (blog) => {
    console.log("Blog added:", blog);
    dispatch(fetchBlogs());
    navigate("/admin/blogs");
  };

  const handleCancel = () => {
    navigate("/admin/blogs");
  };

  return (
    <AdminBlogForm
      mode="add"
      initialData={null}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default AddBlogPage;
