import Trips from "@/components/parts/Trip";
import TripForm from "@/components/parts/TripForm";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import useSWR from "swr";

export default function Home() {
  const { data: trips } = useSWR("/trips");

  return (
    <>
      <Stack boxShadow={2} margin="20px 40px 0px 40px" height={100} padding={4}>
        <TripForm />
      </Stack>
      <Stack boxShadow={2} margin="20px 40px 20px 40px" padding={2}>
        <Typography>Upcoming Trips</Typography>

        <Grid container spacing={2} mt={4} padding={2}>
          {trips &&
            trips.map((trip) => (
              <Grid item xs={12} lg={4}>
                <Trips key={trip.id} {...trip} />{" "}
              </Grid>
            ))}
        </Grid>
      </Stack>
    </>
  );
}
