import React from "react";
import classes from "./Logo.module.css";
import logo from "../../assets/logo.svg";

const Logo = () => {
  return (
    <div className={classes.logoContainer}>
      <img src={logo} alt="logo" className={classes.logo} />
    </div>
  );
};

export default Logo;
