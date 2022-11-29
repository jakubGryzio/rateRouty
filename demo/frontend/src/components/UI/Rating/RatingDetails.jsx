import React, { useState } from "react";
import ValueButton from "./ValueButton";
import classes from "./RatingDetails.module.css";

const RatingDetails = () => {
  return (
    <div className={classes.form__details}>
      <h5>Ceny paliw</h5>
      <div className={classes.form__types}>
        <div
          className={`${classes.form__types_item} ${classes.form__types_item_on}`}
        >
          <h5>ON</h5>
        </div>
        <div
          className={`${classes.form__types_item} ${classes.form__types_item_pb}`}
        >
          <h5>PB</h5>
        </div>
        <div
          className={`${classes.form__types_item} ${classes.form__types_item_lpg}`}
        >
          <h5>LPG</h5>
        </div>
      </div>
      <div className={classes.form__types}>
        <div className={classes.form__types_value}>{onPrice}</div>
        <div className={classes.form__types_value}>{pbPrice}</div>
        <div className={classes.form__types_value}>{lpgPrice}</div>
      </div>
      <div className={classes.form__types}>
        <ValueButton
          className={classes.form__types__button}
          value="+"
          onClick={() => setONPrice(increaseHandler)}
        />
        <ValueButton
          className={classes.form__types__button}
          value="-"
          onClick={() => setONPrice(decreaseHandler)}
        />
        <ValueButton
          className={classes.form__types__button}
          value="+"
          onClick={() => setPBPrice(increaseHandler)}
        />
        <ValueButton
          className={classes.form__types__button}
          value="-"
          onClick={() => setPBPrice(decreaseHandler)}
        />
        <ValueButton
          className={classes.form__types__button}
          value="+"
          onClick={() => setLPGPrice(increaseHandler)}
        />
        <ValueButton
          className={classes.form__types__button}
          value="-"
          onClick={() => setLPGPrice(decreaseHandler)}
        />
      </div>
    </div>
  );
};

export default RatingDetails;
