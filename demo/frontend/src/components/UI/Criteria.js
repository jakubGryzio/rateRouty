import React from "react";
import classes from "./Criteria.module.css";

const Criteria = (props) => {
  return (
    <div className={classes.criteria}>
      <button onClick={props.onClick}>{props.children}</button>
    </div>
  );
};

export default Criteria;
