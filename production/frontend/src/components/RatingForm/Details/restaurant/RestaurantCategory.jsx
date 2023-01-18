import React from "react";
import ValuePanel from "../../panel/ValuePanel";
import classes from "../style/Category.module.css";

const increaseHandler = (currentValue) => {
  if (+currentValue === 5) return currentValue;
  return ++currentValue;
};

const decreaseHandler = (currentValue) => {
  if (+currentValue === 1) return currentValue;
  return --currentValue;
};

const RestaurantCategory = (props) => {
  const { image, alt, title, value, stateHandler } = props;
  return (
    <div className={classes.type}>
      <div className={`${classes.item}`}>
        {title && <h4>{title}</h4>}
        <img src={image} alt={alt} className={classes.icon} />
      </div>
      <div className={classes.type_value}>{value}</div>
      <ValuePanel
        stateHandler={stateHandler}
        increaseHandler={increaseHandler}
        decreaseHandler={decreaseHandler}
      />
    </div>
  );
};

export default RestaurantCategory;
