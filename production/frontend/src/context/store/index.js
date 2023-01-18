import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import formSlice from "./form-slice";
import mapSlice from "./map-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    map: mapSlice.reducer,
    auth: authSlice.reducer,
    form: formSlice.reducer,
  },
});

export default store;
