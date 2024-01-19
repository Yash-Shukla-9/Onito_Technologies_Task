import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { resetData, setFormdata, setStep } from "../Toolkit/RegistrationSlice";
import axios from "axios";
import {
  Typography,
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

const schema = yup.object({
  Name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  Age: yup
    .number()
    .positive("Age must be a positive integer")
    .required("Age is required"),
  Sex: yup
    .string()
    .required("Sex is required")
    .oneOf(["male", "female", "other"], "Invalid Sex"),
  Mobile: yup.number().positive().required("Number is required"),
  Govtype: yup
    .string()
    .required("One of Gov Id is required")
    .oneOf(["AdharId", "PanCard"], "Invalid Id Type"),
  GovtId: yup.string().when("Govtype", {
    is: (value: string) => value === "AdharId",
    then: yup.string().required("Adhar is required"),
    otherwise: yup.string().required(),
  }),
  Address: yup.string(),
  State: yup.string(),
  City: yup.string(),
  Country: yup.string(),
  Pincode: yup.number().positive(),
});

const RegistrationForm: React.FC = () => {
  const dispatch = useDispatch();
  const { step, formData } = useSelector((state: any) => state.registration);
  const { handleSubmit, control, setError, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const [countryOptions, setCountryOptions] = useState<string[]>([]);

  const onSubmit = (data: any) => {
    if (step === 1) {
      dispatch(setFormdata(data));
      dispatch(setStep(2));
    } else {
      console.log("final data to be sent", { ...formData, ...data });
      dispatch(resetData());
    }
  };

  const handleCountryChange = async (inputValue: string) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${inputValue}`
      );
      const countries = response.data.map(
        (country: any) => country.name.common
      );
      setCountryOptions(countries);
    } catch (error) {
      console.error("Error by API", error);
      setError("Country", { message: "Failed to handle the API" });
      setCountryOptions([]);
    }
  };

  return (
    <div>
      <FormControl onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5">
          {step === 1
            ? "Step 1: Personal Information"
            : "Step 2: Address Information"}
        </Typography>

        {step === 1 && (
          <div className="m-4 w-full">
            <Controller
              name="Name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  variant="outlined"
                  label="Name"
                  {...field}
                  error={!!fieldState?.error}
                  helperText={fieldState?.error?.message}
                />
              )}
            ></Controller>

            <Controller
              name="Age"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  variant="outlined"
                  label="Age"
                  {...field}
                  error={!!fieldState?.error}
                  helperText={fieldState?.error?.message}
                />
              )}
            ></Controller>

            <Controller
              name="Sex"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  variant="outlined"
                  label="Sex"
                  {...field}
                  error={!!fieldState?.error}
                  helperText={fieldState?.error?.message}
                />
              )}
            ></Controller>

            <Controller
              name="Mobile"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  variant="outlined"
                  label="Mobile"
                  {...field}
                  error={!!fieldState?.error}
                  helperText={fieldState?.error?.message}
                />
              )}
            ></Controller>

            <Controller
              name="govId"
              control={control}
              render={({ field, fieldState }) => (
                <Select label="GovtIssuedId" fullWidth {...field}>
                  <MenuItem value="Id Type"></MenuItem>
                  <MenuItem value="AdharId">Aadhar</MenuItem>
                  <MenuItem value="PanCard">PanCard</MenuItem>
                </Select>
              )}
            ></Controller>

            <Controller
              name="Govtype"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  variant="outlined"
                  label="Govt Issued Id"
                  {...field}
                  error={!!fieldState?.error}
                  helperText={fieldState?.error?.message}
                />
              )}
            ></Controller>

            {formData.govIdType === "AdharId" && (
              <Controller
                name="govId"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Aadhar Number"
                    variant="outlined"
                    {...field}
                    error={!!fieldState?.error}
                    helperText={fieldState?.error?.message}
                  />
                )}
              ></Controller>
            )}

            <Controller
              name="Country"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  variant="outlined"
                  label="Country"
                  {...field}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  error={!!fieldState?.error}
                  helperText={fieldState?.error?.message}
                />
              )}
            ></Controller>

            {countryOptions.length > 0 && (
              <div>
                <Typography variant="subtitle2">Country Options:</Typography>
                <ul>
                  {countryOptions.map((country, index) => (
                    <li key={index}>{country}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ... (other fields) */}
          </div>
        )}

        <Button type="submit" variant="contained" color="primary">
          {step === 1 ? "Next" : "Submit"}
        </Button>
      </FormControl>
    </div>
  );
};

export default RegistrationForm;
