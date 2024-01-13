import "./App.css";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Header from "./modules/Header";
import Sidebar from "./modules/Sidebar";
import AppRoutes from "./routes";
import { DRAWER_WIDTH, MQ_LARGE_DEVICES } from "./constants";
import { Global, css } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserListRequest } from "./store/slices/userSlice";
import { fetchPostListRequest } from "./store/slices/postSlice";
import Layout from "./modules/Layout";
import { Helmet } from "react-helmet";
import { toggleSidebar } from "./store/slices/commonSlice";
import { useAppSelector } from "./store";
import { CssBaseline, useMediaQuery } from "@mui/material";
import AllRoutes from "./routes";

const GlobalStyles = css`
  .ag-root {
    width: 100% !important;
  }
`;

const App = () => {
  const dispatch = useDispatch();
  const isLargeDevice = useMediaQuery(MQ_LARGE_DEVICES);

  useEffect(() => {
    dispatch(fetchUserListRequest({}));
    dispatch(fetchPostListRequest({}));
    dispatch(toggleSidebar(isLargeDevice ? true : false));
  }, []);

  return (
    <Fragment>
        <Helmet>
            <title>Admin :: Live In Homes</title>
        </Helmet>
        <CssBaseline />
        <AllRoutes />
        <Toaster toastOptions={{ duration: 5000, position: "top-right" }} />
    </Fragment>
  );
};

export default App;
