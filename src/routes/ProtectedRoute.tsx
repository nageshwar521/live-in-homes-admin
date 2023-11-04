import { Navigate, useLocation } from "react-router-dom";
import { cookies } from "../utils/cookies";

const ProtectedRoute = ({ children }: any) => {
  const isAuthenticated = cookies.getCookie("accessToken");
  let location = useLocation();

  console.log(isAuthenticated, "isAuthenticated");

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
