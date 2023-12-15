import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { DRAWER_WIDTH } from "../constants";
import FlexGrow from "../components/FlexGrow";
import React from "react";
import { useAppDispatch } from "../store";
import { userLogoutRequest } from "../store/slices/authSlice";

const Header = () => {
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
    handleLogout();
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { sm: `${DRAWER_WIDTH}px` },
      }}
    >
      <Toolbar>
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
          <MenuItem onClick={handleClose} disableRipple>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
