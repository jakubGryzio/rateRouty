import React, { Fragment, useState, useCallback, useEffect } from "react";
import useRating from "../../../hooks/use-rating";
import { useDispatch } from "react-redux";
import formSlice from "../../../../store/form-slice";
import classes from "../RatingForm.module.css";
import ValueButton from "../ValueButton";

const increaseHandler = (currentValue) => {
  const increasedValue = +currentValue + 0.01;
  return increasedValue.toFixed(2);
};

const decreaseHandler = (currentValue) => {
  const decreasedValue = +currentValue - 0.01;
  return decreasedValue.toFixed(2);
};

const FuelRatingForm = ({ feature }) => {
  const [pbPrice, setPBPrice] = useState(null);
  const [onPrice, setONPrice] = useState(null);
  const [lpgPrice, setLPGPrice] = useState(null);
  const { _, fetchRatingAttributes } = useRating();
  const dispatch = useDispatch();

  const fetchRatingAttributesHandler = useCallback(async () => {
    const type = "fuel";
    const data = await fetchRatingAttributes(feature.id, type);
    setPBPrice(data.PB);
    setLPGPrice(data.LPG);
    setONPrice(data.ON);
  }, [feature.id]);

  useEffect(() => {
    fetchRatingAttributesHandler();
  }, [fetchRatingAttributesHandler]);

  useEffect(() => {
    const attributes = {
      PB: pbPrice,
      ON: onPrice,
      LPG: lpgPrice,
    };

    dispatch(formSlice.actions.setAttributesToPost(attributes));
  }, [pbPrice, onPrice, lpgPrice, dispatch]);

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default FuelRatingForm;
