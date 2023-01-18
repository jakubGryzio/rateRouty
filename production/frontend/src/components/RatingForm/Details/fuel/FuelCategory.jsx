import React from "react";
import ValuePanel from "../../panel/ValuePanel";
import classes from "../style/Category.module.css";

const increaseHandler = (currentValue) => {
  const increasedValue = +currentValue + 0.01;
  return increasedValue.toFixed(2);
};

const decreaseHandler = (currentValue) => {
  const decreasedValue = +currentValue - 0.01;
  return decreasedValue.toFixed(2);
};

const FuelCategory = (props) => {
  const { type, bgColor, price, stateHandler } = props;
  return (
    <div className={classes.type}>
      <div
        className={`${classes.type_item}`}
        style={{ backgroundColor: `${bgColor}` }}
      >
        <h5>{type}</h5>
      </div>
      <div className={classes.type_value}>{price}</div>
      <ValuePanel
        stateHandler={stateHandler}
        increaseHandler={increaseHandler}
        decreaseHandler={decreaseHandler}
      />
    </div>
  );
};

export default FuelCategory;
