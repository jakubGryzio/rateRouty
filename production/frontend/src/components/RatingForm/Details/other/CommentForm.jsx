import React, { Fragment, useState, useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRatingUserAttributes } from "../../../../data/api/fetch-rating";
import formSlice from "../../../../context/store/form-slice";
import classes from "../style/Category.module.css";

const CommentForm = (props) => {
  const { guid, rating_id, isPlaceholder, className } = props;
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const changeTextAreaHandler = (e) => {
    setComment(e.target.value);
  };

  const fetchRatingAttributesHandler = useCallback(async () => {
    const data = await fetchRatingUserAttributes(guid, rating_id);
    console.log(data);
    setComment(data.comment);
  }, [guid, rating_id]);

  useEffect(() => {
    const attributes = {
      comment,
    };
    dispatch(formSlice.actions.setAttributesToPost(attributes));
  }, [comment, dispatch]);

  useEffect(() => {
    fetchRatingAttributesHandler();
  }, [fetchRatingAttributesHandler]);

  return (
    <Fragment>
      <textarea
        className={className && classes.comment}
        onChange={changeTextAreaHandler}
        type="text"
        cols={50}
        rows={7}
        value={comment}
        placeholder={isPlaceholder && "Komentarz"}
      ></textarea>
    </Fragment>
  );
};

export default CommentForm;
