import React, { useEffect } from "react";
import { FaCode, FaBlog } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/slices/blogSlice";
import { fetchProjects } from "../redux/slices/projectSlice";

const DashboardHome = () => {
  const { count: blogCount, status } = useSelector((state) => state.blogs);
  const { count: projectCount, status: projectStatus } = useSelector(
    (state) => state.projects
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
    if (projectStatus === "idle") {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  const dashboardData = [
    {
      name: "Projects",
      count: projectCount,
      icon: <FaCode className="text-3xl text-[#ff69b4]" />,
      link: "/admin/projects",
    },
    {
      name: "Blogs",
      count: blogCount,
      icon: <FaBlog className="text-3xl text-[#ff69b4]" />,
      link: "/admin/blogs",
    },
  ];
  // Chart Data
  const chartData = dashboardData.map((item) => ({
    name: item.name,
    count: item.count,
  }));
  return (
    <div className="space-y-10">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {dashboardData.map((item, idx) => (
          <Link
            to={item.link}
            key={idx}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-300 group"
          >
            <div className="flex flex-col items-center gap-3">
              {item.icon}
              <h3 className="text-[#ff69b4] font-semibold text-lg group-hover:underline">
                {item.name}
              </h3>
              <p className="text-3xl font-bold text-[#d63384]">{item.count}</p>
              <span className="text-xs text-[#999] mt-1">
                Last updated: Today
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Summary Chart */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-pink-100">
        <h3 className="text-2xl font-josefin font-semibold text-[#ff69b4] mb-6 flex items-center gap-2">
          📊 <span>Summary Overview</span>
        </h3>

        <div className="rounded-lg overflow-hidden bg-[#fff0f5] p-4 sm:p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} barSize={36} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#ffdce8" />
              <XAxis dataKey="name" stroke="#ff69b4" />
              <YAxis stroke="#ff69b4" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff0f5",
                  borderColor: "#ff69b4",
                }}
                cursor={{ fill: "#ffe4ec" }}
              />
              <Bar dataKey="count" fill="#ff69b4" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
