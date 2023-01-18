import React from "react";
import classes from "./style/Button.module.css";

const Button = (props) => {
  const { title, onClick } = props;
  return (
    <button onClick={onClick} className={`${classes.button}`}>
      {title}
    </button>
  );
};

export default Button;
