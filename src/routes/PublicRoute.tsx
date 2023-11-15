import { Navigate, Outlet, Route, useLocation } from "react-router-dom";

interface PublicRouteProps {
  isLoggedIn?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ isLoggedIn = false }) => {
  let location = useLocation();

  console.log("PublicRoute", isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default PublicRoute;
