import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import App from "../App";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="" element={<NotFound />} />
    </Routes>
  );
};

export default PrivateRoutes;
