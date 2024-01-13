import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { DRAWER_WIDTH, MQ_LARGE_DEVICES } from "../constants";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import FlexGrow from "../components/FlexGrow";
import { IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toggleSidebar } from "../store/slices/commonSlice";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const dispatch = useAppDispatch();
  const isLargeDevice = useMediaQuery(MQ_LARGE_DEVICES);
  const { isSidebarOpen } = useAppSelector((state) => state.common);
  const location = useLocation();
  const handleToggle = () => {
    dispatch(toggleSidebar(!isSidebarOpen));
  };
  return (
    <Box
      component="nav"
      sx={{
        width: { sm: isSidebarOpen ? DRAWER_WIDTH : 0 },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: isSidebarOpen ? DRAWER_WIDTH : 0,
          },
        }}
        variant="permanent"
        open
      >
        <div>
          <Toolbar>
            {!isLargeDevice ? (
              <React.Fragment>
                <FlexGrow />
                <IconButton onClick={handleToggle}>
                  <CloseIcon />
                </IconButton>
              </React.Fragment>
            ) : null}
          </Toolbar>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/dashboard"
                selected={["/dashboard", "/"].includes(location.pathname)}
              >
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            {/* <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/cafes"
                selected={location.pathname === "/cafes"}
              >
                <ListItemText primary="Cafes" />
              </ListItemButton>
            </ListItem> */}
            {/* <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/beverages"
                selected={location.pathname === "/beverages"}
              >
                <ListItemText primary="Beverages" />
              </ListItemButton>
            </ListItem> */}
            {/* <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/employees"
                selected={location.pathname === "/employees"}
              >
                <ListItemText primary="Employees" />
              </ListItemButton>
            </ListItem> */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/amenities"
                selected={location.pathname === "/amenities"}
              >
                <ListItemText primary="Amenities" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/categories"
                selected={location.pathname === "/categories"}
              >
                <ListItemText primary="Categories" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/conditions"
                selected={location.pathname === "/conditions"}
              >
                <ListItemText primary="Conditions" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/posts"
                selected={location.pathname === "/posts"}
              >
                <ListItemText primary="Posts" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/users"
                selected={location.pathname === "/users"}
              >
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/settings"
                selected={location.pathname === "/settings"}
              >
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
