import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { formatDate } from "@/lib/formatDate";
import { formatTime } from "@/lib/formatTime";
import Stack from "@mui/material/Stack";

import ItineraryForm from "@/components/parts/ItineraryForm";

import apiClient from "@/lib/apiClient";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import Loading from "@/components/parts/Loading";

const handleDeleteItinerary = async (itineraryId, tripId) => {
  await apiClient
    .delete(`/${tripId}/itineraries`, {
      data: {
        itineraryId,
      },
    })
    .then(() => {
      mutate(`/${tripId}/itineraries`);
    });
};

const ItineraryItem = ({
  startTime,
  endTime,
  title,
  chosenDate,
  tripId,
  itineraryId,
  onClick,
}) => {
  return (
    <Stack display="flex" direction="row" gap={2} mb={1.5} flexShrink={1}>
      <Box
        border={1}
        padding={2.5}
        backgroundColor="primary.main"
        color="#FFFFFF"
        borderRadius={2.5}
        width={200}
        margin="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontWeight={600}
      >
        {formatTime(startTime)} - {formatTime(endTime)}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        border="1px solid green"
        padding={2}
        width="100%"
      >
        <MuiLink
          component={NextLink}
          href={`/${tripId}/itineraries/${itineraryId}`}
          rel="noopener noreferrer"
          color="#000000"
          sx={{ textDecoration: "none" }}
        >
          <Typography>{title}</Typography>
        </MuiLink>
        <Typography>{formatDate(chosenDate, "dd MMMM yyyy")}</Typography>
        <IconButton onClick={onClick}>
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Box>
    </Stack>
  );
};

const Itineraries = () => {
  const router = useRouter();

  const { tripId } = router.query;

  const { data: itinerary, isLoading: itineraryLoading } = useSWR(
    `/trips/${tripId}`
  );
  const { data: itineraries, isLoading: itinerariesLoading } = useSWR(
    `/${tripId}/itineraries`
  );

  if (itineraryLoading && itinerariesLoading) return <Loading />;

  return (
    <Stack
      boxShadow={2}
      display="flex"
      direction="column"
      padding={5}
      margin={5}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Stack boxShadow={2} height="auto" padding={2}>
            <IconButton
              sx={{
                alignSelf: "flex-start",
                fontSize: 16,
                lineHeight: 1,
                ml: -1,

                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              onClick={() => router.push("/")}
            >
              <HomeIcon sx={{ mr: 1 }} /> {itinerary?.name}
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Stack boxShadow={2} height="auto" padding={2}>
            <ItineraryForm {...itinerary} />
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack
            boxShadow={2}
            height={645}
            maxHeight={645}
            padding={2}
            sx={{ overflowY: "auto" }}
          >
            {itineraries && itineraries.length ? (
              itineraries.map((itinerary) => (
                <ItineraryItem
                  key={itinerary.id}
                  tripId={tripId}
                  itineraryId={itinerary.id}
                  onClick={() => {
                    handleDeleteItinerary(itinerary.id, tripId);
                  }}
                  {...itinerary}
                />
              ))
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                margin="30%"
                fontSize={20}
              >
                No Available Itinerary For This Trip
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Itineraries;
