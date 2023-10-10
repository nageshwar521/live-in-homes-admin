import { Box, Grid } from "@mui/material";
import StatItem from "../../components/stats/StatItem";
import { RootState, useAppSelector } from "../../store";

const Dashboard = () => {
  const { users, posts } = useAppSelector((state: RootState) => state);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <StatItem count={users.userList.length} label="Users" />
        </Grid>
        <Grid item xs={4}>
          <StatItem count={posts.postList.length} label="Posts" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
