import React, { Fragment } from "react";
import classes from "../../style/RatingForm.module.css";
import FuelForm from "./FuelForm";

const FuelRatingForm = (props) => {
  const { guid } = props;

  return (
    <Fragment>
      <h5>Ceny paliw</h5>
      <div className={classes.form__types}>
        <FuelForm guid={guid} />
      </div>
    </Fragment>
  );
};

export default FuelRatingForm;
