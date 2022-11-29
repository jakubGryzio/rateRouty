import React from "react";
import avatar from "../../assets/avatar_notAuth.svg";
import classes from "./Avatar.module.css";
import { useDispatch } from "react-redux/es/exports";
import uiSlice from "../../store/ui-slice";

const Avatar = () => {
  const dispatch = useDispatch();

  const userPanelHandler = () => {
    dispatch(uiSlice.actions.toggleUserPanel());
  };

  return (
    <div className={classes.avatarContainer}>
      <button onClick={userPanelHandler}>
        <img src={avatar} alt="avatar" className={classes.avatar} />
      </button>
    </div>
  );
};

export default Avatar;
