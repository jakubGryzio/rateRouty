import React from "react";
import classes from "./Logo.module.css";
import { ReactComponent as LogoSvg } from "../../assets/logo.svg";

const Logo = () => {
  return (
    <div className={classes.logoContainer}>
      <LogoSvg className={classes.logo} />
    </div>
  );
};

export default Logo;
