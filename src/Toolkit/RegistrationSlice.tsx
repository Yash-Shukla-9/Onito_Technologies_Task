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
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },

    setFormdata: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    resetData: (state) => {
      (state.step = 1), (state.formData = {});
    },
  },
});

export const { setStep, setFormdata, resetData } = registractionSlice.actions;

export default registractionSlice.reducer;
