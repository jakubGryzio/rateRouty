import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userPanelShow: { showed: false, enable: false },
  loginFormShowed: false,
  showModal: false,
  activeHeaderBar: "login",
  showRoute: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleUserPanel(state) {
      state.userPanelShow.enable = true;
      state.userPanelShow.showed = !state.userPanelShow.showed;
    },
    openLoginForm(state) {
      state.loginFormShowed = true;
    },
    closeLoginForm(state) {
      state.loginFormShowed = false;
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
  },
});

export default uiSlice;
