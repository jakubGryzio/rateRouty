import { ReactComponent as CloseSvg } from "../../assets/close.svg";
import classes from "./CloseButton.module.css";

const CloseButton = (props) => {
  return (
    <div className={`${classes.closeButton} ${props.className}`}>
      <button onClick={props.onClick}>
        <CloseSvg />
      </button>
    </div>
  );
};

export default CloseButton;
