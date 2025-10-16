// Create the ProtectedRoute component
import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//     const token = localStorage.getItem("token");
//     return token ? children : <Navigate to="/login" />;
// }

// // create the role based protected route
// function RoleBasedProtectedRoute({ children, role }) {
//     const token = localStorage.getItem("token");
//     const userRole = localStorage.getItem("role");
//     return token && userRole === role ? children : <Navigate to="/unauthorized" />;
// }

// export { ProtectedRoute, RoleBasedProtectedRoute };


export function PrivateRoute({ children, role }) {
  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/signup" replace />;
  }

  if (role && sessionStorage.getItem("role") !== role) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}

// public routes
export function PublicRoute({ children }) {
  return sessionStorage.getItem("token") ? children : children;
}