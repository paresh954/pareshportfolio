import React, { useEffect, useState } from "react";
import { deleteProject, fetchProjects } from "../redux/slices/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import ProjectForm from "./ProjectForm";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const AdProjects = () => {
  const [editMode, setEditMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const location = useLocation();

  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);
  const handleDelete = (id) => {
    // Show custom toast confirmation
    toast.custom(
      (t) => (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-[#ffdce8] flex flex-col gap-3">
          <p className="text-[#333] font-semibold">
            Are you sure you want to delete this project?
          </p>
          <p className="text-[#555] text-sm">This action cannot be undone.</p>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={async () => {
                try {
                  await dispatch(deleteProject(id)).unwrap();
                  dispatch(fetchProjects());
                  setEditMode(false);
                  setSelectedProject(null);
                  toast.dismiss(t.id);
                  toast.success("Project deleted successfully");
                } catch (err) {
                  console.error("Delete error:", err);
                  toast.dismiss(t.id);
                  toast.error("Failed to delete project");
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
      { duration: Infinity } // Keep toast open until user responds
    );
  };

  const cancelEdit = () => {
    setEditMode(false);
    setSelectedProject(null);
  };
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  console.log("projects", projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch, location.pathname]);

  return (
    <div className="bg-white p-6 rounded-xl shadow font-quicksand">
      <h2 className="text-xl font-semibold text-[#f285b9] mb-4">
        🗂️ Project List
      </h2>

      {status === "loading" && (
        <div className="flex justify-center items-center py-10">
          <div className="w-8 h-8 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {status !== "loading" && (
        <table className="min-w-[640px] w-full text-sm text-left border border-[#ffdce8] rounded-xl overflow-hidden">
          <thead className="text-[#d63384] bg-[#fff0f5]">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Technologies</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr>
                <td colSpan="4" className="py-3 px-4 text-center text-base">
                  No projects found.
                </td>
              </tr>
            )}
            {projects.map((project, index) => (
              <tr
                key={project._id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-white" : "bg-[#fff9fc]"
                }`}
              >
                <td className="py-3 px-4 font-medium text-[#333]">
                  {project.title}
                </td>
                <td className="py-3 px-4 text-[#555]">
                  {project.technologies.join(", ")}
                </td>
                <td className="py-3 px-4 text-[#999]">
                  {project.date.split("T")[0]}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    className="inline-flex items-center bg-[#ff69b4] text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-[#f06292] transition mr-2 shadow"
                    onClick={() => {
                      setEditMode(true);
                      setSelectedProject(project);
                    }}
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    className="inline-flex items-center bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-600 transition shadow"
                    onClick={() => handleDelete(project._id)}
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editMode && (
        <ProjectForm
          mode="edit"
          initialData={selectedProject}
          onSubmit={(updatedProject) => {
            console.log("Updated!", updatedProject);
            setEditMode(false);
            setSelectedProject(null);
            dispatch(fetchProjects());
          }}
          onCancel={cancelEdit}
        />
      )}
    </div>
  );
};

export default AdProjects;
