import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";

import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { formatDate } from "@/lib/formatDate";
import { formatTime } from "@/lib/formatTime";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useRouter } from "next/router";
import useSWR from "swr";

import Loading from "@/components/parts/Loading";

const ItineraryDetails = () => {
  const router = useRouter();

  const { tripId, itineraryId } = router.query;

  const { data: itinerary, isLoading } = useSWR(`/itineraries/${itineraryId}`);

  if (isLoading) return <Loading />;
  return (
    <Stack boxShadow={2} margin={20} height={300} padding={2}>
      <Box
        display="flex"
        flexDirection="row"
        gap={3}
        alignItems="center"
        justifyItems="center"
        justifyContent="space-between"
      >
        <IconButton
          size="small"
          sx={{
            mt: 2,
            width: 60,
            borderRadius: "60%",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          onClick={() => router.push(`/${tripId}/itineraries`)}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" mt={2}>
          {itinerary.title}
        </Typography>
        <IconButton
          size="small"
          sx={{
            mt: 2,
            width: 60,
            borderRadius: "60%",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          <PictureAsPdfIcon
            onClick={() => router.push(`/${router.asPath}/itineraryPdf`)}
          />
        </IconButton>
      </Box>
      <Box mx={10} mt={5}>
        <Grid container spacing={4} or>
          <Grid item>
            <Stack
              display="flex"
              direction="row"
              alignItems="center"
              fontSize={20}
            >
              <LocationOnIcon />
              {itinerary.location}
            </Stack>
          </Grid>
          <Grid item>
            <Stack
              display="flex"
              direction="row"
              alignItems="center"
              fontSize={20}
            >
              <AccessTimeFilledIcon />
              {formatDate(itinerary.chosenDate, "dd MMMM yyyy")}{" "}
              {formatTime(itinerary.startTime)} -{" "}
              {formatTime(itinerary.endTime)}
            </Stack>
          </Grid>
        </Grid>
        <Stack
          display="flex"
          direction="column"
          ml={1}
          mt={5}
          fontSize={18}
          fontWeight={400}
          color="grey.600"
          textOverflow="hidden"
          whiteSpace="nowrap"
        >
          <Typography fontWeight={500} color="#000000">
            Description
          </Typography>
          {itinerary.description}
        </Stack>
      </Box>
    </Stack>
  );
};

export default ItineraryDetails;
