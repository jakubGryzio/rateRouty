import { useDispatch } from "react-redux";
import authSlice from "../context/store/auth-slice";
import uiSlice from "../context/store/ui-slice";
import calculateRemainingTime from "../utils/remainingTime";
import fetchData from "../utils/fetch";

const useAuthentication = (type) => {
  const dispatch = useDispatch();

  async function registerHandler(credentials) {
    try {
      await fetchData({
        url: "http://127.0.0.1:8000/api/v1/auth/register/",
        method: "POST",
        body: JSON.stringify(credentials),
      });

      // TO DO
      // dispatch(authSlice.actions.logIn(data));
      dispatch(uiSlice.actions.closeModal());
    } catch (err) {
      console.error(err.message);
    }
  }

  async function loginHandler(credentials) {
    try {
      const data = await fetchData({
        url: "http://127.0.0.1:8000/api/v1/auth/login/",
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (data.access) {
        const remainingDuration = calculateRemainingTime(data.expiredTime);
        setTimeout(() => {
          dispatch(authSlice.actions.logOut());
        }, remainingDuration);

        dispatch(authSlice.actions.logIn(data));
        dispatch(uiSlice.actions.closeModal());
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  const authenticationHandlers = {
    login: loginHandler,
    register: registerHandler,
  };

  return authenticationHandlers[type];
};

export default useAuthentication;
