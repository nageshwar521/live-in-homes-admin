import { Box, Grid } from "@mui/material";
import StatItem from "../../components/stats/StatItem";
import { RootState, useAppSelector } from "../../store";

const Dashboard = () => {
  const { cafes, employees, locations } = useAppSelector(
    (state: RootState) => state
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <StatItem count={cafes.cafeList.length} label="Cafes" />
        </Grid>
        <Grid item xs={4}>
          <StatItem count={employees.employeeList.length} label="Employees" />
        </Grid>
        <Grid item xs={4}>
          <StatItem count={locations.locationList.length} label="Locations" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
