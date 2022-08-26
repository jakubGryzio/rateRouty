import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { useDispatch } from "react-redux";
import uiSlice from "../../store/ui-slice";

const Backdrop = (props) => {
  const dispatch = useDispatch();

  return (
    <div
      className={classes.backdrop}
      onClick={() => {
        dispatch(uiSlice.actions.closeModal());
        dispatch(uiSlice.actions.activeLoginBar());
      }}
    ></div>
  );
};

const ModalOverlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
