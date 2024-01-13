import { AppBar, Box, Toolbar, Typography, css } from "@mui/material";
import { DRAWER_WIDTH } from "../constants";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Fragment } from "react";
import { useAppSelector } from "../store";

export interface ILayoutProps {
  children: any;
  isLoggedIn?: boolean;
}

const Layout: React.FC<ILayoutProps> = ({ children, isLoggedIn = false }) => {
  const { isSidebarOpen } = useAppSelector(state => state.common);
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoggedIn ? (
        <Fragment>
          <Header />
          <Sidebar />
          <Box
            component="main"
            sx={{
              p: 3,
              width: `calc(100% - ${isSidebarOpen ? DRAWER_WIDTH : 0}px)`,
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "100vh",
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </Fragment>
      ) : (
        children
      )}
    </Box>
  );
};

export default Layout;
