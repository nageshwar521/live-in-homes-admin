import { AppBar, Toolbar, Typography } from "@mui/material";
import { DRAWER_WIDTH } from "../constants";

const Header = () => {
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
          Cafe Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
