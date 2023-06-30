import Link from "next/link";

import Box from "@mui/material/Box";

import { formatDate } from "@/lib/formatDate";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Trip = ({ name, color, startDate, endDate, id }) => {
  return (
    <Stack boxShadow={2} height={150} display="flex" direction="row">
      <Box backgroundColor={color} height={150} width={100} />
      <Box padding={2} display="flex" flexDirection="column" gap={2}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="caption">
          {formatDate(startDate, "MMMM d yyyy")} -{" "}
          {formatDate(endDate, "MMMM d yyyy")}
        </Typography>
        <Link passHref href={`/${id}/itineraries`}>
          View Itinerary
        </Link>
      </Box>
    </Stack>
  );
};

export default Trip;
