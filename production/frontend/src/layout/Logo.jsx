import React from "react";
import classes from "./style/Logo.module.css";
import { logoSvg } from "../assets/index";

const Logo = () => {
  return (
    <div className={classes.logoContainer}>
      <img src={logoSvg} alt="logo" className={classes.logo} />
    </div>
  );
};

export default React.memo(Logo);
