import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import CategoryList from "./pages/categories/CategoryList";
import ConditionList from "./pages/conditions/ConditionList";
import PostList from "./pages/posts/PostsList";
import UserList from "./pages/users/UsersList";
import AmenityList from "./pages/amenities/AmenityList";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/amenities/*" element={<AmenityList />} />
      <Route path="/categories/*" element={<CategoryList />} />
      <Route path="/conditions/*" element={<ConditionList />} />
      <Route path="/posts/*" element={<PostList />} />
      <Route path="/users/*" element={<UserList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
