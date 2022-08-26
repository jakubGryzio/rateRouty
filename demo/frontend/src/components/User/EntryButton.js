import React from "react";
import classes from "./EntryButton.module.css";

const EntryButton = (props) => {
  return (
    <div className={classes.entryButtonContainer}>
      <button onClick={props.onClick}>Zaloguj</button>
    </div>
  );
};

export default EntryButton;
