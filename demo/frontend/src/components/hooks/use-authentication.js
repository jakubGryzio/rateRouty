import { useDispatch } from "react-redux";
import authSlice from "../../store/auth-slice";
import uiSlice from "../../store/ui-slice";
import { calculateRemainingTime } from "../../store/auth-slice";

const useAuthentication = (type) => {
  const dispatch = useDispatch();

  async function registerHandler(credentials) {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/auth/register/",
        {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      dispatch(authSlice.actions.logIn(data));
      dispatch(uiSlice.actions.closeModal());
    } catch (err) {
      console.error(err.message);
    }
  }

  async function loginHandler(credentials) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/auth/login/", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

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
