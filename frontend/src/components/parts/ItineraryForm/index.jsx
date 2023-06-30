import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MuiFormLabel from "@mui/material/FormLabel";
import { useRouter } from "next/router";

import Stack from "@mui/material/Stack";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";
import apiClient from "@/lib/apiClient";
import { useForm, Controller } from "react-hook-form";
import useSWR, { mutate } from "swr";
import Loading from "../Loading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({});

export const FormLabel = styled(MuiFormLabel)(({ theme }) => ({
  ...theme.typography,
  borderRadius: theme.shape.borderRadius,
  lineHeight: "22px",
  padding: theme.spacing(0, 0.5),
  fontSize: 12,
  "&.Mui-disabled": {
    color: theme.palette.common.white,
  },
  ".MuiFormLabel-asterisk": {
    display: "none",
  },
}));

const ItineraryForm = ({ startDate, endDate, name }) => {
  const schema = yup.object().shape({
    title: yup.string().required(),
    location: yup.string().required(),
    chosenDate: yup.date().required(),
    startTime: yup.date().required(),
    endTime: yup.date().required(),
    description: yup.string().nullable(),
  });
  const router = useRouter();

  const { tripId } = router.query;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, reset },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await apiClient
        .post("/itineraries", {
          ...data,
          tripId,
        })
        .then(() => {
          reset();
          mutate(`/${tripId}/itineraries`);
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack display="flex" direction="column" gap={0.5}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <>
              <FormLabel required>Title (required)</FormLabel>
              <TextField
                fullWidth
                id="filled-basic"
                onChange={onChange}
                value={value}
                error={errors.title && errors.title.message}
                helperText={errors.title ? errors.title.message : ""}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <>
              <FormLabel>Location (required)</FormLabel>

              <TextField
                fullWidth
                id="filled-basic"
                onChange={onChange}
                value={value}
                error={errors.location && errors.location.message}
                helperText={errors.location ? errors.location.message : ""}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="chosenDate"
          render={({ field: { onChange, value } }) => (
            <>
              <FormLabel>Date (required)</FormLabel>
              <DatePicker
                onChange={onChange}
                value={value}
                shouldDisableDate={(date) => {
                  const minDate = new Date(startDate);
                  const maxDate = new Date(endDate);
                  return date < minDate || date > maxDate;
                }}
                error={errors.chosenDate && errors.chosenDate.message}
                helperText={errors.chosenDate ? errors.chosenDate.message : ""}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="startTime"
          render={({ field: { onChange, value } }) => (
            <>
              <FormLabel>Start Time (required)</FormLabel>
              <TimePicker
                onChange={onChange}
                value={value}
                error={errors.startTime && errors.startTime.message}
                helperText={errors.startTime ? errors.startTime.message : ""}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="endTime"
          render={({ field: { onChange, value } }) => (
            <>
              <FormLabel>End Time (required)</FormLabel>
              <TimePicker
                onChange={onChange}
                value={value}
                error={errors.endTime && errors.endTime.message}
                helperText={errors.startTime ? errors.startTime.message : ""}
              />
            </>
          )}
        />{" "}
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <>
              <FormLabel>Description (optional)</FormLabel>
              <TextField
                onChange={onChange}
                value={value}
                multiline
                rows={5}
                variant="outlined"
              />
            </>
          )}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting || !isValid}
        >
          Add Itinerary
        </Button>
      </Stack>
    </form>
  );
};

export default ItineraryForm;
