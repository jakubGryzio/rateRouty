import Input from "../Input";
import classes from "../style/RegisterForm.module.css";
import EntryButton from "../../button/EntryButton";
import uiSlice from "../../../../context/store/ui-slice";
import useInput from "../../../../hooks/use-input";
import { useDispatch } from "react-redux";
import useAuthentication from "../../../../hooks/use-authentication";
import {
  REGISTER_TITLE,
  HAVE_ACCOUNT_TITLE,
  USERNAME_PLACEHOLDER,
  EMAIL_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
  CONFIRM_PASSWORD_PLACEHOLDER,
} from "../../../../data/constants/titles";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const RegisterForm = () => {
  const dispatch = useDispatch();

  const loginFormHandler = () => {
    dispatch(uiSlice.actions.activeLoginBar());
  };

  const {
    value: enteredUsername,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    inputChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredConfirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => value === enteredPassword);

  const userRegisterHandler = useAuthentication("register");

  const formIsValid =
    usernameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid;

  const submitHandler = (event) => {
    event.preventDefault();

    const credentials = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
      confirm_password: enteredConfirmPassword,
    };
    console.log(credentials);

    userRegisterHandler(credentials);

    resetUsernameInput();
    resetEmailInput();
    resetPasswordInput();
    resetConfirmPasswordInput();
  };

  return (
    <form onSubmit={submitHandler} className={classes.formContainer}>
      <div className={classes.inputContainer}>
        <Input
          type="text"
          id="username"
          placeholder={USERNAME_PLACEHOLDER}
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
          value={enteredUsername}
          invalidClass={usernameHasError ? classes.invalid : ""}
        />
        <Input
          type="text"
          id="email"
          placeholder={EMAIL_PLACEHOLDER}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          invalidClass={emailHasError ? classes.invalid : ""}
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
        <Input
          type="password"
          id="confirm-password"
          placeholder={CONFIRM_PASSWORD_PLACEHOLDER}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          value={enteredConfirmPassword}
          invalidClass={confirmPasswordHasError ? classes.invalid : ""}
        />
      </div>
      <div className={classes.registerButtonContainer}>
        <EntryButton disabled={!formIsValid} title={REGISTER_TITLE} />
      </div>
      <div className={classes.routeToLoginPageContainer}>
        <p onClick={loginFormHandler}>{HAVE_ACCOUNT_TITLE}</p>
      </div>
    </form>
  );
};

export default RegisterForm;
