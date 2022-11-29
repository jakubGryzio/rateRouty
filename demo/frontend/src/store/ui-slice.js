import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userPanelShow: { showed: false, enable: false },
  showModal: false,
  activeHeaderBar: "login",
  showRoute: false,
  showRatingForm: false,
  ratedPlaces: { show: false, title: "", url: "", favorite: false },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleUserPanel(state) {
      state.userPanelShow.enable = true;
      state.userPanelShow.showed = !state.userPanelShow.showed;
    },
    showModal(state) {
      state.showModal = true;
    },
    closeModal(state) {
      state.showModal = false;
    },
    activeLoginBar(state) {
      state.activeHeaderBar = "login";
    },
    activeRegisterBar(state) {
      state.activeHeaderBar = "register";
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
