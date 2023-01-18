import React from "react";
import classes from "../style/LoginForm.module.css";
import EntryButton from "../../button/EntryButton";
import Input from "../Input";
import useInput from "../../../../hooks/use-input";
import useAuthentication from "../../../../hooks/use-authentication";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../../../../context/store/auth-slice";
import {
  LOGIN_TITLE,
  NOT_LOGOUT_TITLE,
  PASSWORD_PLACEHOLDER,
  PASS_REMAINDER_TITLE,
  USERNAME_PLACEHOLDER,
} from "../../../../data/constants/titles";

const isNotEmpty = (value) => value.trim() !== "";

const LoginForm = () => {
  const {
    value: enteredUsername,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    inputChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(isNotEmpty);

  const dispatch = useDispatch();
  const isStayLogin = useSelector((state) => state.auth.isStayLogin);

  const stayLogInCheckboxHandler = (event) => {
    dispatch(authSlice.actions.stayLogin(event.target.checked));
  };

  const userLoginHandler = useAuthentication("login");

  const formIsValid = usernameIsValid && passwordIsValid;

  const submitHandler = (event) => {
    event.preventDefault();

    const credentials = {
      username: enteredUsername,
      password: enteredPassword,
    };

    userLoginHandler(credentials);

    resetUsernameInput();
    resetPasswordInput();
  };

  return (
    <form onSubmit={submitHandler} className={classes.formContainer}>
      <div className={classes.inputContainer}>
        <Input
          type="text"
          id="email"
          placeholder={USERNAME_PLACEHOLDER}
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
          value={enteredUsername}
          invalidClass={usernameHasError ? classes.invalid : ""}
        />
        <Input
          type="password"
          id="password"
          placeholder={PASSWORD_PLACEHOLDER}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
          invalidClass={passwordHasError ? classes.invalid : ""}
        />
      </div>
      <div className={classes.logInCheckbox}>
        <input
          onChange={stayLogInCheckboxHandler}
          type="checkbox"
          id="notlogout"
          name="notlogout"
          checked={isStayLogin}
        />
        <label htmlFor="notlogout">{NOT_LOGOUT_TITLE}</label>
      </div>
      <div className={classes.loginButtonContainer}>
        <EntryButton disabled={!formIsValid} title={LOGIN_TITLE} />
      </div>
      <div className={classes.passwordRemainderContainer}>
        <p>{PASS_REMAINDER_TITLE}</p>
      </div>
    </form>
  );
};

export default LoginForm;
