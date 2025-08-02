import React from "react";
import ProjectForm from "../admin/ProjectForm";
import { useDispatch } from "react-redux";
import { fetchProjects } from "../redux/slices/projectSlice";
import { useNavigate } from "react-router-dom";

const AddProjectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (blog) => {
    dispatch(fetchProjects());
    navigate("/admin/projects");
  };

  const handleCancel = () => {
    navigate("/admin/projects");
  };

  return (
    <ProjectForm
      mode="add"
      initialData={null}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default AddProjectPage;
