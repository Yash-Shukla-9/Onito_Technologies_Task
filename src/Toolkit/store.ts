import { configureStore } from "@reduxjs/toolkit";
import RegistrationSlice from "./RegistrationSlice";

const store = configureStore({
  reducer: {

    registration : RegistrationSlice

  },
});

export default store;
