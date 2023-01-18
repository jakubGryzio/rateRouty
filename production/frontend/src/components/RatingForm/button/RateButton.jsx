import React from "react";
import classes from "../style/RatePanel.module.css";

const RateButton = (props) => {
  const { image, alt, onClick } = props;
  return (
    <button onClick={onClick}>
      <img src={image} alt={alt} className={classes.icon} />
    </button>
  );
};

export default RateButton;
