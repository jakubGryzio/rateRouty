import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userPanel: { showed: false, enable: false },
  showModal: false,
  activeLoginBar: true,
  activeRegisterBar: false,
  showRoute: false,
  showRatingForm: false,
  ratedPlaces: { show: false, title: "", url: "", favorite: false },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleUserPanel(state) {
      state.userPanel.enable = true;
      state.userPanel.showed = !state.userPanel.showed;
    },
    showModal(state) {
      state.showModal = true;
    },
    closeModal(state) {
      state.showModal = false;
    },
    toggleActiveBar(state) {
      state.activeLoginBar = !state.activeLoginBar;
      state.activeRegisterBar = !state.activeRegisterBar;
    },
    showRoute(state) {
      state.showRoute = true;
    },
    showRatingForm(state) {
      state.showRatingForm = true;
    },
    closeRatingForm(state) {
      state.showRatingForm = false;
    },
    showRatedPlaces(state, actions) {
      state.ratedPlaces.show = true;
      state.ratedPlaces.title = actions.payload.title;
      state.ratedPlaces.url = actions.payload.url;
      state.ratedPlaces.favorite = actions.payload.favorite;
    },
    closeRatedPlaces(state) {
      state.ratedPlaces.show = false;
      state.ratedPlaces.title = "";
      state.ratedPlaces.url = "";
      state.ratedPlaces.favorite = false;
    },
  },
});

export default uiSlice;
