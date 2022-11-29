import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import formSlice from "../../../../store/form-slice";
import classes from "../RatingForm.module.css";

const OtherRatingForm = () => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <h5>Komentarz</h5>
      <div className={classes.form__types}>
        <textarea
          onChange={(e) => {
            const attributes = {
              comment: e.target.value,
            };
            dispatch(formSlice.actions.setAttributesToPost(attributes));
          }}
          type="text"
          rows={7}
          cols={50}
        ></textarea>
      </div>
    </Fragment>
  );
};

export default OtherRatingForm;
