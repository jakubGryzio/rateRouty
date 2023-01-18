import React from "react";
import classes from "../style/ValuePanel.module.css";
import ValueButton from "../button/ValueButton";

const ValuePanel = (props) => {
  const { stateHandler, decreaseHandler, increaseHandler } = props;
  return (
    <div className={classes.panel}>
      <ValueButton
        className={classes.type_button}
        value="+"
        onClick={() => stateHandler(increaseHandler)}
      />
      <ValueButton
        className={classes.type_button}
        value="-"
        onClick={() => stateHandler(decreaseHandler)}
      />
    </div>
  );
};

export default ValuePanel;
