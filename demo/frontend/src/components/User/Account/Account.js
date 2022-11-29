import { useSelector } from "react-redux";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import Modal from "../../UI/Modal";
import CloseButton from "../../UI/CloseButton";
import Header from "./Header";
import uiSlice from "../../../store/ui-slice";
import classes from "./Account.module.css";
import { useDispatch } from "react-redux";

const Account = () => {
  const activeBar = useSelector((state) => state.ui.activeHeaderBar);
  const dispatch = useDispatch();

  const closeButtonHandler = () => {
    dispatch(uiSlice.actions.closeModal());
    dispatch(uiSlice.actions.activeLoginBar());
  };

  return (
    <Modal
      className={`${
        activeBar === "login" ? classes.loginModal : classes.registerModal
      }`}
    >
      <CloseButton onClick={closeButtonHandler} />
      <Header />
      {activeBar === "login" && <LoginForm />}
      {activeBar === "register" && <RegisterForm />}
    </Modal>
  );
};

export default Account;
