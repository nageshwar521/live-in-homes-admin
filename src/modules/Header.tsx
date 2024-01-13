import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DRAWER_WIDTH, MQ_LARGE_DEVICES } from "../constants";
import FlexGrow from "../components/FlexGrow";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { userLogoutRequest } from "../store/slices/authSlice";
import DashboardIcon from "@mui/icons-material/Menu";
import { toggleSidebar } from "../store/slices/commonSlice";

const Header = () => {
  const theme = useTheme();
  const isLargeDevice = useMediaQuery(MQ_LARGE_DEVICES);
  const { isSidebarOpen } = useAppSelector(state => state.common);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    dispatch(userLogoutRequest({}));
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleToggle = () => {
    dispatch(toggleSidebar(!isSidebarOpen));
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${isSidebarOpen ? DRAWER_WIDTH : 0}px)` },
        ml: { sm: `${isSidebarOpen ? DRAWER_WIDTH : 0}px` },
      }}
    >
      <Toolbar>
        {!isLargeDevice ? <IconButton onClick={handleToggle} style={{color: theme.palette.common.white}}><DashboardIcon /></IconButton> : null}
        <Typography variant="h6" noWrap component="div">
          Rental Homes
        </Typography>
        <FlexGrow />
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose} disableRipple>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout} disableRipple>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
