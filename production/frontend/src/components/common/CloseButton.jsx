import { closeButtonSvg } from "../../assets/index";
import classes from "./style/CloseButton.module.css";

const CloseButton = (props) => {
  return (
    <div className={`${classes.closeButton} ${props.className}`}>
      <button onClick={props.onClick}>
        <img src={closeButtonSvg} alt="close" className={classes.logo} />
      </button>
    </div>
  );
};

export default CloseButton;
