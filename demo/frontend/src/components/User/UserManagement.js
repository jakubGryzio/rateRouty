import React from "react";
import classes from "./UserManagement.module.css";
import UserPlaces from "./UserPlaces";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as AvatarSvg } from "../../assets/avatar_notAuth.svg";
import { ReactComponent as CameraSvg } from "../../assets/camera.svg";
import EntryButton from "./EntryButton";
import uiSlice from "../../store/ui-slice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const userPanelIsShown = useSelector((state) => state.ui.userPanelShow);

  const animationClasses = userPanelIsShown.showed
    ? classes.showPanel
    : classes.hidePanel;
  const userPanelClasses = `${classes.userPanelContainer} ${
    userPanelIsShown.enable ? animationClasses : ""
  }`;

  return (
    <React.Fragment>
      <div className={userPanelClasses}>
        <div className={classes.userPanel}>
          <div className={classes.avatarContainer}>
            <AvatarSvg className={classes.avatar} />
            <div className={classes.uploadImage}>
              <button>
                <CameraSvg className={classes.camera} />
              </button>
            </div>
          </div>
          <UserPlaces />
          <div className={classes.loginButtonContainer}>
            <EntryButton
              onClick={() => {
                dispatch(uiSlice.actions.showModal());
              }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserManagement;
