import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { REGISTER_TITLE, LOGIN_TITLE } from "../../../data/constants/titles";
import uiSlice from "../../../context/store/ui-slice";
import classes from "./style/Header.module.css";

const Header = () => {
  const activeLoginBar = useSelector((state) => state.ui.activeLoginBar);
  const activeRegisterBar = useSelector((state) => state.ui.activeRegisterBar);
  const headerLoginClass = `${classes.headerLogin} ${
    activeLoginBar ? classes.active : ""
  }`;
  const headerRegisterClass = `${classes.headerRegister} ${
    activeRegisterBar ? classes.active : ""
  }`;
  const dispatch = useDispatch();

  return (
    <div className={classes.headerContainer}>
      <div className={headerLoginClass}>
        <p
          onClick={() => {
            dispatch(uiSlice.actions.toggleActiveBar());
          }}
        >
          {LOGIN_TITLE}
        </p>
      </div>
      <div className={headerRegisterClass}>
        <p
          onClick={() => {
            dispatch(uiSlice.actions.toggleActiveBar());
          }}
        >
          {REGISTER_TITLE}
        </p>
      </div>
    </div>
  );
};

export default Header;
