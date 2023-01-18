import React from "react";
import { avatarSvg } from "../assets/index";
import classes from "./style/Avatar.module.css";
import { useDispatch } from "react-redux";
import uiSlice from "../context/store/ui-slice";

const Avatar = () => {
  const dispatch = useDispatch();

  const userPanelHandler = () => {
    dispatch(uiSlice.actions.toggleUserPanel());
  };

  return (
    <div className={classes.avatarContainer}>
      <button onClick={userPanelHandler}>
        <img src={avatarSvg} alt="avatar" className={classes.avatar} />
      </button>
    </div>
  );
};

export default React.memo(Avatar);
