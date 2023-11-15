import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  isLoggedIn?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isLoggedIn = false,
}) => {
  let location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
