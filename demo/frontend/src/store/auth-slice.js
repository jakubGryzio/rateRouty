import { createSlice } from "@reduxjs/toolkit";

export const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const remainingDuration = expirationTime - currentTime;

  return remainingDuration;
};

const KEY_ACCESS = "access";
const KEY_REFRESH = "refresh";
const KEY_TIME = "expiredTime";

const storedExpirationDate = localStorage.getItem(KEY_TIME);
const remainingTime = calculateRemainingTime(storedExpirationDate);

if (remainingTime <= 3600) {
  localStorage.removeItem(KEY_ACCESS);
  localStorage.removeItem(KEY_TIME);
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
      }
      state.isLogged = true;
    },
    logOut(state) {
      localStorage.removeItem(KEY_ACCESS);
      localStorage.removeItem(KEY_REFRESH);

      state.isLogged = false;
    },
    stayLogin(state, actions) {
      state.isStayLogin = actions.payload;
    },
  },
});

export default authSlice;
