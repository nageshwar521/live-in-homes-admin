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
import { drawerWidth } from "../constants";
import { Link, useLocation, useParams } from "react-router-dom";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const location = useLocation();
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
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
                to="/cafes"
                selected={location.pathname === "/cafes"}
              >
                <ListItemText primary="Cafes" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/employees"
                selected={location.pathname === "/employees"}
              >
                <ListItemText primary="Employees" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
