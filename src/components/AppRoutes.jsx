import { Routes, Route } from "react-router-dom";
import Hero from "./Hero";
import About from "./About";
import Contact from "./Contact";
import Skills from "./Skills";
import Projects from "./Projects";
import GitHubSection from "./GitHubSection";
import Blog from "./Blog";
import BlogPost from "./BlogPost";
import NotFound from "./NotFound";
import AdminLayout from "../admin/AdminLayout";
import DashboardHome from "../admin/DashboardHome";
import AdProjects from "../admin/AdProjects";
import ProjectForm from "../admin/ProjectForm";
import BlogForm from "../admin/BlogForm";
import AdminBlogs from "../admin/AdminBlogs";
import AdminLogin from "../admin/AdminLogin";
import ProtectedRoute from "../admin/ProtectedRoute";
import AddBlogPage from "./AddBlogPage";
import AddProjectPage from "./AddProjectPage";

const AppRoutes = ({ setToken }) => (
  <Routes>
    {/* Public Routes */}
    <Route
      path="/"
      element={
        <>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <GitHubSection />
          <Contact />
        </>
      }
    />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/skills" element={<Skills />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/github" element={<GitHubSection />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<BlogPost />} />
    <Route path="*" element={<NotFound />} />
    <Route path="/admin/login" element={<AdminLogin setToken={setToken} />} />

    {/* Admin Protected Routes */}
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<DashboardHome />} />
      <Route path="dashboard" element={<DashboardHome />} />
      <Route path="projects" element={<AdProjects />} />
      <Route path="projects/add" element={<AddProjectPage />} />
      <Route path="blogs" element={<AdminBlogs />} />
      <Route path="blogs/add" element={<AddBlogPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
