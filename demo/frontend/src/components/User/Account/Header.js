import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import uiSlice from "../../../store/ui-slice";

import classes from "./Header.module.css";

const LOGIN_TITLE = "Zaloguj";
const REGISTER_TITLE = "Zarejestruj";

const Header = () => {
  const activeBar = useSelector((state) => state.ui.activeHeaderBar);
  const dispatch = useDispatch();

  return (
    <div className={classes.headerContainer}>
      <div
        className={`${classes.headerLogin} ${
          activeBar === "login" ? classes.active : ""
        }`}
      >
        <p
          onClick={() => {
            dispatch(uiSlice.actions.activeLoginBar());
          }}
        >
          {LOGIN_TITLE}
        </p>
      </div>
      <div
        className={`${classes.headerRegister} ${
          activeBar === "register" ? classes.active : ""
        }`}
      >
        <p
          onClick={() => {
            dispatch(uiSlice.actions.activeRegisterBar());
          }}
        >
          {REGISTER_TITLE}
        </p>
      </div>
    </div>
  );
};

export default Header;
