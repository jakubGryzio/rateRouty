import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formType: "",
  attributesToPost: null,
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
  },
});

export default formSlice;
