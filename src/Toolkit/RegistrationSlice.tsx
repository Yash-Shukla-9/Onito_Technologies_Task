import { createSlice } from "@reduxjs/toolkit";

interface RegistrationState {
  step: number;
  formData: object;
}

const initialState: RegistrationState = {
  step: 1,
  formData: {},
};

const registractionSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
});

export default registractionSlice;
