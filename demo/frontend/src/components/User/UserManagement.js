import React from "react";
import classes from "./UserManagement.module.css";
import UserPlaces from "./UserPlaces/UserPlaces";
import { useSelector, useDispatch } from "react-redux";
import avatar from "../../assets/avatar_notAuth.svg";
import { ReactComponent as CameraSvg } from "../../assets/camera.svg";
import EntryButton from "./EntryButton";
import uiSlice from "../../store/ui-slice";
import authSlice from "../../store/auth-slice";

const LOGIN_TITLE = "Zaloguj";
const LOGOUT_TITLE = "Wyloguj";

const UserManagement = ({ map }) => {
  const dispatch = useDispatch();
  const userPanelIsShown = useSelector((state) => state.ui.userPanelShow);
  const isLogged = useSelector((state) => state.auth.isLogged);

  const animationClasses = userPanelIsShown.showed
    ? classes.showPanel
    : classes.hidePanel;
  const userPanelClasses = `${classes.userPanelContainer} ${
    userPanelIsShown.enable ? animationClasses : ""
  }`;

  const loginHandler = () => {
    if (!isLogged) {
      dispatch(uiSlice.actions.showModal());
    } else {
      dispatch(authSlice.actions.logOut());
    }
  };

  return (
    <React.Fragment>
      <div className={userPanelClasses}>
        <div className={classes.userPanel}>
          <div className={classes.avatarContainer}>
            <img src={avatar} alt="avatar" className={classes.avatar} />
            <div className={classes.uploadImage}>
              <button>
                <CameraSvg className={classes.camera} />
              </button>
            </div>
          </div>
          {isLogged && <UserPlaces map={map} />}
          <div className={classes.loginButtonContainer}>
            <EntryButton
              title={!isLogged ? LOGIN_TITLE : LOGOUT_TITLE}
              onClick={loginHandler}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserManagement;
