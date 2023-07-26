import { AppBar, Toolbar, Typography } from "@mui/material";
import { drawerWidth } from "../constants";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Cafe Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
