import React, { Fragment } from "react";
import classes from "./LoginForm.module.css";
import { ReactComponent as CloseSvg } from "../../../assets/close.svg";
import { useDispatch, useSelector } from "react-redux";
import uiSlice from "../../../store/ui-slice";
import EntryButton from "../EntryButton";

const LoginForm = () => {
  const activeBar = useSelector((state) => state.ui.activeHeaderBar);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className={classes.closeButton}>
        <button
          onClick={() => {
            dispatch(uiSlice.actions.closeModal());
            dispatch(uiSlice.actions.activeLoginBar());
          }}
        >
          <CloseSvg />
        </button>
      </div>
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
            Zaloguj
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
            Zarejestruj
          </p>
        </div>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.inputContainer}>
          <div className={classes.inputForm}>
            <input type="text" id="email" placeholder="E-mail" />
          </div>
          <div className={classes.inputForm}>
            <input type="password" id="password" placeholder="Hasło" />
          </div>
        </div>
        <div className={classes.logInCheckbox}>
          <input type="checkbox" id="nologout" name="nologout" />
          <label htmlFor="nologout">Pozostaw zalogowanym</label>
        </div>
        <div className={classes.loginButtonContainer}>
          <EntryButton />
        </div>
        <div className={classes.passwordRemainderContainer}>
          <p>Zapomniałeś hasła?</p>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginForm;
