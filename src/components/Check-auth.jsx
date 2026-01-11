import { Navigate } from "react-router-dom";

function CheckAuth({ children, isProtectd }) {

  const token = localStorage.getItem("token");

  if (isProtectd && !token) {
    return <Navigate to="/login" replace />;
  }

  if (!isProtectd && token) {
   console.log("here")
    return <Navigate to="/" replace />;
  }

  return children;
}

export default CheckAuth;
