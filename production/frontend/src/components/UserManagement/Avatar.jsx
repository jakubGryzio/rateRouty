import React from "react";
import { avatarSvg, cameraSvg } from "../../assets/index";
import classes from "./style/Avatar.module.css";

const Avatar = () => {
  return (
    <div className={classes.avatarContainer}>
      <img src={avatarSvg} alt="avatar" className={classes.avatar} />
      <div className={classes.uploadImage}>
        <button>
          <img src={cameraSvg} alt="camera" className={classes.camera} />
        </button>
      </div>
    </div>
  );
};

export default Avatar;
