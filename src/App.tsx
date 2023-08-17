import "./App.css";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Header from "./modules/Header";
import Sidebar from "./modules/Sidebar";
import AppRoutes from "./AppRoutes";
import { drawerWidth } from "./constants";
import { BrowserRouter } from "react-router-dom";
import { Global, css } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { fetchLocationListRequest } from "./store/slices/locationSlice";
import { useDispatch } from "react-redux";
import { fetchCafeListRequest } from "./store/slices/cafeSlice";
import { fetchEmployeeListRequest } from "./store/slices/employeeSlice";

const GlobalStyles = css`
  .ag-root {
    width: 100% !important;
  }
`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployeeListRequest({}));
    dispatch(fetchLocationListRequest());
    dispatch(fetchCafeListRequest({}));
  }, []);

  return (
    <BrowserRouter>
      <Box sx={{ display: "flex", flex: 1, width: "100%", height: "100%" }}>
        <Toaster toastOptions={{ duration: 2000 }} />
        <Global styles={GlobalStyles} />
        <Header />
        <Sidebar />
        <Box
          component="main"
          sx={{
            p: 3,
            width: `calc(100% - ${drawerWidth}px)`,
          }}
        >
          <Toolbar />
          <AppRoutes />
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
