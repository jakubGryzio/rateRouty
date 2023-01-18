import React from "react";
import classes from "./style/UserManagement.module.css";
import { useSelector } from "react-redux";
import buttonFactory from "./button/ButtonFactory";
import LoggedUserPanel from "./LoggedUserPanel";
import Avatar from "./Avatar";
import Account from "./Account/Account";

const UserManagement = () => {
  const userPanel = useSelector((state) => state.ui.userPanel);
  const isLogged = useSelector((state) => state.auth.isLogged);
  const showModal = useSelector((state) => state.ui.showModal);
  const Button = buttonFactory(isLogged);

  const animationClasses = userPanel.showed
    ? classes.showPanel
    : classes.hidePanel;

  const userPanelClasses = `${classes.userPanelContainer} ${
    userPanel.enable ? animationClasses : ""
  }`;

  return (
    <React.Fragment>
      <div className={userPanelClasses}>
        <div className={classes.userPanel}>
          <Avatar />
          {isLogged && <LoggedUserPanel />}
          <div className={classes.loginButtonContainer}>{Button}</div>
        </div>
      </div>
      {showModal && <Account />}
    </React.Fragment>
  );
};

export default React.memo(UserManagement);
