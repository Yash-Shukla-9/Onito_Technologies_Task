import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { resetData, setFormdata, setStep } from "../Toolkit/RegistrationSlice";
import axios from "axios";
import { Typography, FormControl } from "@mui/material";

const shema = yup.object({
  Name: yup
    .string()
    .required("Name i required")
    .min(3, "Name must be at least 3 characters"),
  Age: yup
    .number()
    .positive("Age must be positive integer")
    .required("age is required"),
  Sex: yup
    .string()
    .required("Sex is required")
    .oneOf(["male", "female", "other"]),
  Mobile: yup.number().positive().required("Number is required"),
  Govtype: yup
    .string()
    .required("On of Gov Id is required")
    .oneOf(["AdharId", "PanCard"], "Invaild Id Type "),
  govId: yup.string().when("Govtype", {
    is: (value: string) => {
      console.log("Govtype value during validation:", value);
      return value === "AdharId";
    },
    then: yup.string().required("Adhar is required"),
    otherwise: yup.string().required(),
  }),
  address: yup.string(),
  state: yup.string(),
  city: yup.string(),
  country: yup.string(),
  pincode: yup.number().positive(),
});

const ResgistrationFrom: React.FC = () => {
  const dispatch = useDispatch();
  const { step, formData } = useSelector((state: any) => state.registration);
  const { handleSubmit, register, control, setError } = useForm({
    resolver: yupResolver(shema),
  });

  const onSubmit = (data: any) => {
    if (step === 1) {
      dispatch(setFormdata(data));
      dispatch(setStep(2));
    } else {
      console.log("final data to be sent", { ...formData, ...data });
      1;
      dispatch(resetData());
    }
  };

  const HandleCountryData = async (inputValue: string) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${inputValue}`
      );
      const country = response.data.map((country: any) => country.name.common);
      return country;
    } catch (error) {
      console.log("Error by api", error);
      setError("country", { message: "faled to handle the api" });
      return [];
    }
  };

  return (
    <div>
      <FormControl onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5">
          {step === 1
            ? "Step 1 : Personal Information"
            : "Step 2 Address Information"}
        </Typography>

        {step === 1 && (
          <>
            <Controller
              name="Name"
              control={control}
              render={({ field }) => console.log(field)}
            ></Controller>
          </>
        )}
      </FormControl>
    </div>
  );
};

export default ResgistrationFrom;
