import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login/Login";
import ResetPassword from "../pages/auth/ResetPassword/ResetPassword";
import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword";
import PrivateRoutes from "./PrivateRoutes";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";
import { useEffect } from "react";
import { loadApiDefaults } from "../utils/common";
import Layout from "../modules/Layout";
import Signup from "../pages/auth/Signup/Signup";

const AllRoutes = () => {
  // const location = useLocation();

  // useEffect(() => {
  //   const sessionStartTime = +(getData('sessionStartTime') || '0');
  //   const sessionExpireTime = +(getData('sessionExpireTime') || '0');
  //   const currentTime = Date.now();
  //   if (currentTime - sessionStartTime >= sessionExpireTime) {
  //     removeData('authToken');
  //     removeData('refreshToken');
  //     dispatch(resetAuthState());
  //     history.push('/login');
  //   }
  // }, [location]);

  useEffect(() => {
    loadApiDefaults();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <PrivateRoutes />
              </ProtectedRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AllRoutes;
