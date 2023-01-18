import React from "react";
import classes from "../style/EntryButton.module.css";

const EntryButton = (props) => {
  return (
    <div className={classes.entryButtonContainer}>
      <button disabled={props.disabled} onClick={props.onClick}>
        {props.title}
      </button>
    </div>
  );
};

export default EntryButton;
