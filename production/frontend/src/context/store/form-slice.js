import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formType: "",
  attributesToPost: null,
  currentRateValue: null,
  places: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormType(state, actions) {
      state.formType = actions.payload;
    },
    setAttributesToPost(state, actions) {
      state.attributesToPost = actions.payload;
    },
    setCurrentRateValue(state, actions) {
      state.currentRateValue = actions.payload;
    },
    setPlaces(state, actions) {
      state.places = actions.payload;
    },
  },
});

export default formSlice;
