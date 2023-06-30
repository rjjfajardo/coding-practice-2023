import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import apiClient from "@/lib/apiClient";
import { yupResolver } from "@hookform/resolvers/yup";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { mutate } from "swr";
import * as yup from "yup";
import { FormLabel } from "../ItineraryForm";

const TripForm = () => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    color: yup.string().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await apiClient.post("/trips", data).then(() => {
        reset({
          name: "",
          color: "",
          startDate: null,
          endDate: null,
        });
        mutate("/trips");
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack display="flex" direction="row" gap={3} padding={2}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <>
              <FormLabel required sx={{ lineHeight: 5 }}>
                Trip Name
              </FormLabel>
              <TextField
                id="filled-basic"
                onChange={onChange}
                value={value}
                sx={{ width: "15%" }}
                error={errors.name && errors.name.message}
                helperText={errors.name ? errors.name.message : ""}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="color"
          render={({ field: { onChange, value } }) => (
            <>
              <FormLabel required sx={{ lineHeight: 5 }}>
                Color
              </FormLabel>

              <TextField
                id="filled-basic"
                onChange={onChange}
                value={value}
                sx={{ width: "15%" }}
                error={errors.color && errors.color.message}
                helperText={errors.color ? errors.color.message : ""}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="startDate"
          render={({ field: { onChange, value } }) => (
            <>
              <FormLabel required sx={{ lineHeight: 5 }}>
                Start Date
              </FormLabel>
              <DatePicker
                onChange={onChange}
                value={value}
                error={errors.startDate && errors.startDate.message}
                helperText={errors.startDate ? errors.startDate.message : ""}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="endDate"
          render={({ field: { onChange, value } }) => (
            <>
              <FormLabel required sx={{ lineHeight: 5 }}>
                End Date
              </FormLabel>
              <DatePicker
                onChange={onChange}
                value={value}
                error={errors.endDate && errors.endDate.message}
                helperText={errors.endDate ? errors.endDate.message : ""}
              />
            </>
          )}
        />

        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting || !isValid}
        >
          <CardTravelIcon sx={{ mr: 1.5 }} />
          Add Trip
        </Button>
      </Stack>
    </form>
  );
};

export default TripForm;
