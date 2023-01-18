import { useSelector } from "react-redux";
import LoginForm from "./form/LoginForm";
import RegisterForm from "./form/RegisterForm";
import Modal from "../../common/Modal";
import CloseButton from "../../common/CloseButton";
import Header from "./Header";
import uiSlice from "../../../context/store/ui-slice";
import classes from "./style/Account.module.css";
import { useDispatch } from "react-redux";

const Account = () => {
  const activeLoginBar = useSelector((state) => state.ui.activeLoginBar);
  const activeRegisterBar = useSelector((state) => state.ui.activeRegisterBar);
  const dispatch = useDispatch();

  const closeButtonHandler = () => {
    dispatch(uiSlice.actions.closeModal());
    if (!activeLoginBar) {
      dispatch(uiSlice.actions.toggleActiveBar());
    }
  };

  const modalClasses = `${
    activeLoginBar ? classes.loginModal : classes.registerModal
  }`;

  return (
    <Modal className={modalClasses}>
      <CloseButton onClick={closeButtonHandler} />
      <Header />
      {activeLoginBar && <LoginForm />}
      {activeRegisterBar && <RegisterForm />}
    </Modal>
  );
};

export default Account;
