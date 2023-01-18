import { createSlice } from "@reduxjs/toolkit";
import {
  KEY_TIME,
  KEY_ACCESS,
  KEY_REFRESH,
  KEY_USERNAME,
} from "../../data/constants/keys";
import calculateRemainingTime from "../../utils/remainingTime";

const storedExpirationDate = localStorage.getItem(KEY_TIME);
const remainingTime = calculateRemainingTime(storedExpirationDate);

if (remainingTime <= 3600) {
  clearLocalStorage();
}

function clearLocalStorage() {
  localStorage.removeItem(KEY_ACCESS);
  localStorage.removeItem(KEY_REFRESH);
  localStorage.removeItem(KEY_TIME);
  localStorage.removeItem(KEY_USERNAME);
}

const initialState = {
  isLogged: localStorage.getItem(KEY_ACCESS) != null,
  isStayLogin: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, actions) {
      if (state.isStayLogin) {
        localStorage.setItem(KEY_ACCESS, actions.payload.access);
        localStorage.setItem(KEY_REFRESH, actions.payload.refresh);
        localStorage.setItem(KEY_TIME, actions.payload[KEY_TIME]);
        localStorage.setItem(KEY_USERNAME, actions.payload[KEY_USERNAME]);
      }
      state.isLogged = true;
    },
    logOut(state) {
      clearLocalStorage();

      state.isLogged = false;
    },
    stayLogin(state, actions) {
      state.isStayLogin = actions.payload;
    },
  },
});

export default authSlice;
