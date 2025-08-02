// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true; // if token is invalid
  }
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token || isTokenExpired(token)) {
    // Optionally: remove expired token from localStorage
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
