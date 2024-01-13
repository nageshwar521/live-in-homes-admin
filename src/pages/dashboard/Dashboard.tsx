import { Box, Grid } from "@mui/material";
import StatItem from "../../components/stats/StatItem";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";
import { fetchPostListRequest } from "../../store/slices/postSlice";
import { fetchUserListRequest } from "../../store/slices/userSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { users, posts } = useAppSelector((state: RootState) => state);
  useEffect(() => {
    if (!users.userList.length) {
      dispatch(fetchUserListRequest({}));
    }
    if (!posts.postList.length) {
      dispatch(fetchPostListRequest({}));
    }
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <StatItem count={users.userList.length} label="Users" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatItem count={posts.postList.length} label="Posts" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
