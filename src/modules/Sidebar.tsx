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
import { DRAWER_WIDTH } from "../constants";
import { Link, useLocation, useParams } from "react-router-dom";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const location = useLocation();
  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
        variant="permanent"
        open
      >
        <div>
          <Toolbar />
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
