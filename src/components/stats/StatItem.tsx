import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

interface StatItemProps {
  count: string | number;
  icon?: React.ReactNode;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ count, icon, label }) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "row", height: 150 }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            pl: 3,
            pt: 2,
            alignItems: "flex-start",
          }}
        >
          <Typography component="div" variant="h5">
            {label}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            pr: 3,
            pb: 2,
            justifyContent: "flex-end",
          }}
        >
          <Typography component="div" variant="h2">
            {count}
          </Typography>
        </Box>
      </Box>
      {icon ? (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            {icon}
          </Box>
        </Box>
      ) : null}
    </Card>
  );
};

export default StatItem;
