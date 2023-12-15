import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Login from "../pages/auth/Login/Login";
import ResetPassword from "../pages/auth/ResetPassword/ResetPassword";
import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";
import { useEffect, useState } from "react";
import { loadApiDefaults } from "../utils/common";
import Layout from "../modules/Layout";
import Signup from "../pages/auth/Signup/Signup";
import AmenityList from "../pages/amenities/AmenityList";
import CategoryList from "../pages/categories/CategoryList";
import ConditionList from "../pages/conditions/ConditionList";
import PostList from "../pages/posts/PostsList";
import UserList from "../pages/users/UsersList";
import { useAppSelector } from "../store";
import Dashboard from "../pages/dashboard/Dashboard";
import { getCookie } from "../utils/cookies";
import PublicRoute from "./PublicRoute";

function NavigateFunctionComponent() {
  let navigate = useNavigate();
  const [ran,setRan] = useState(false);

  {/* only run setup once */}
  if(!ran){
    loadApiDefaults(navigate);
     setRan(true);
  }
  return <></>;
}

const AllRoutes = () => {
  const { loginResponse } = useAppSelector((state) => state.auth);
  const isAuthenticated = getCookie("accessToken") || loginResponse.accessToken;
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

  return (
    <BrowserRouter>
      <Layout isLoggedIn={!!isAuthenticated}>
        <NavigateFunctionComponent />
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute isLoggedIn={!!isAuthenticated} />}
          >
            <Route path="" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="amenities" element={<AmenityList />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="conditions" element={<ConditionList />} />
            <Route path="posts" element={<PostList />} />
            <Route path="users" element={<UserList />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route
            path="auth"
            element={<PublicRoute isLoggedIn={!!isAuthenticated} />}
          >
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AllRoutes;
