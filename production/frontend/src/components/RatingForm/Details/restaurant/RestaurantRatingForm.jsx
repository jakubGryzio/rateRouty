import React, { Fragment } from "react";
import classes from "../../style/RatingForm.module.css";
import RestaurantForm from "./RestaurantForm";

const RestaurantRatingForm = (props) => {
  const { guid } = props;

  return (
    <Fragment>
      <div className={classes.form__types}>
        <RestaurantForm guid={guid} ifShowTitle={true} />
      </div>
    </Fragment>
  );
};

export default RestaurantRatingForm;
