import "./App.css";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Header from "./modules/Header";
import Sidebar from "./modules/Sidebar";
import AppRoutes from "./routes";
import { DRAWER_WIDTH } from "./constants";
import { Global, css } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserListRequest } from "./store/slices/userSlice";
import { fetchPostListRequest } from "./store/slices/postSlice";
import Layout from "./modules/Layout";

const GlobalStyles = css`
  .ag-root {
    width: 100% !important;
  }
`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserListRequest({}));
    dispatch(fetchPostListRequest({}));
  }, []);

  return (
    <Fragment>
      <Layout isLoggedIn>
        <AppRoutes />
      </Layout>
    </Fragment>
  );
};

export default App;
