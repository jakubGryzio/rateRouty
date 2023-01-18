import React, { Fragment } from "react";
import CommentForm from "./CommentForm";
import classes from "../../style/RatingForm.module.css";

const OtherRatingForm = (props) => {
  const { id } = props;
  return (
    <Fragment>
      <h5>Komentarz</h5>
      <div className={classes.form__types}>
        <CommentForm id={id} />
      </div>
    </Fragment>
  );
};

export default OtherRatingForm;
