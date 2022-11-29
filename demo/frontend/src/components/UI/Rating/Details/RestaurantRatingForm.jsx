import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import formSlice from "../../../../store/form-slice";
import ValueButton from "../ValueButton";
import useRating from "../../../hooks/use-rating";
import food from "../../../../assets/food.svg";
import decoration from "../../../../assets/decoration.svg";
import service from "../../../../assets/service.svg";
import classes from "./RestaurantRatingForm.module.css";

const increaseHandler = (currentValue) => {
  if (currentValue === 5) return currentValue;
  return ++currentValue;
};

const decreaseHandler = (currentValue) => {
  if (currentValue === 1) return currentValue;
  return --currentValue;
};

const RestaurantRatingForm = ({ feature }) => {
  const [foodRate, setFoodRate] = useState(null);
  const [decorationRate, setDecorationRate] = useState(null);
  const [serviceRate, setServiceRate] = useState(null);
  const { _, fetchRatingAttributes } = useRating();
  const dispatch = useDispatch();

  const fetchRatingAttributesHandler = useCallback(async () => {
    const type = "restaurant";
    const data = await fetchRatingAttributes(feature.id, type);
    setFoodRate(data.food);
    setDecorationRate(data.decoration);
    setServiceRate(data.service);
  }, [feature.id]);

  useEffect(() => {
    fetchRatingAttributesHandler();
  }, [fetchRatingAttributesHandler]);

  useEffect(() => {
    const attributes = {
      food: foodRate,
      decoration: decorationRate,
      service: serviceRate,
    };

    dispatch(formSlice.actions.setAttributesToPost(attributes));
  }, [foodRate, decorationRate, serviceRate, dispatch]);

  return (
    <Fragment>
      <div className={classes.form__types}>
        <div className={`${classes.form__types_item}`}>
          <h4>Jedzenie</h4>
          <img src={food} alt="food" className={classes.form__rate__icon} />
        </div>
        <div className={`${classes.form__types_item}`}>
          <h4>Wystrój</h4>
          <img
            src={decoration}
            alt="decoration"
            className={classes.form__rate__icon}
          />
        </div>
        <div className={`${classes.form__types_item}`}>
          <h4>Obsługa</h4>
          <img
            src={service}
            alt="service"
            className={classes.form__rate__icon}
          />
        </div>
      </div>
      <div className={classes.form__types}>
        <div className={classes.form__types_value}>{foodRate}</div>
        <div className={classes.form__types_value}>{decorationRate}</div>
        <div className={classes.form__types_value}>{serviceRate}</div>
      </div>
      <div className={classes.form__types}>
        <ValueButton
          className={classes.form__types__button}
          onClick={() => setFoodRate(increaseHandler)}
          value="+"
        />
        <ValueButton
          className={classes.form__types__button}
          onClick={() => setFoodRate(decreaseHandler)}
          value="-"
        />
        <ValueButton
          className={classes.form__types__button}
          onClick={() => setDecorationRate(increaseHandler)}
          value="+"
        />
        <ValueButton
          className={classes.form__types__button}
          onClick={() => setDecorationRate(decreaseHandler)}
          value="-"
        />
        <ValueButton
          className={classes.form__types__button}
          onClick={() => setServiceRate(increaseHandler)}
          value="+"
        />
        <ValueButton
          className={classes.form__types__button}
          onClick={() => setServiceRate(decreaseHandler)}
          value="-"
        />
      </div>
    </Fragment>
  );
};

export default RestaurantRatingForm;
