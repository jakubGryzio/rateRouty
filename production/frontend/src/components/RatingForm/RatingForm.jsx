import React, { forwardRef, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postRating,
  postRatingAttributes,
  postRatingUserAttributes,
} from "../../data/api/post-rating";
import { postPOI } from "../../data/api/post-poi";
import uiSlice from "../../context/store/ui-slice";
import { ReactComponent as SubmitSvg } from "../../assets/svg/submit.svg";
import { ReactComponent as CameraSvg } from "../../assets/svg/camera.svg";
import Modal from "../common/Modal";
import CloseButton from "../common/CloseButton";
import { formRatingFactory } from "./formFactory";
import RatePanel from "./panel/RatePanel";
import classes from "./style/RatingForm.module.css";

const RatingForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const selectedFeature = ref;
  const selectedRateValue = useRef(null);
  const selectedFeatureType = useSelector((state) => state.form.formType);
  const attributes = useSelector((state) => state.form.attributesToPost);
  const form = formRatingFactory(
    selectedFeatureType,
    selectedFeature.current.id
  );

  const closeButtonHandler = () => {
    dispatch(uiSlice.actions.closeRatingForm());
  };

  const submitHandler = async () => {
    await postPOI(selectedFeature.current);
    const data = await postRating(
      selectedFeature.current,
      selectedRateValue.current
    );
    const rating_id = data.pk;
    await postRatingUserAttributes(
      selectedFeature.current,
      rating_id,
      attributes
    );
    await postRatingAttributes(selectedFeature.current, attributes);
    dispatch(uiSlice.actions.closeRatingForm());
  };

  return (
    <Modal className={classes.form__modal}>
      <CloseButton onClick={closeButtonHandler} />
      <div className={classes.form__container}>
        <div className={classes.form__description}>
          <h5>Nazwa</h5>
          <span className={classes.form__place__name}>
            <h5>
              {selectedFeature.current.properties.name_en ??
                selectedFeature.current.properties.name}
            </h5>
          </span>
        </div>
        <div className={classes.form__details__container}>
          <div className={classes.form__details}>{form}</div>
          <div className={classes.form__submit}>
            <div className={classes.form__rate}>
              <h5>Ocena</h5>
              <RatePanel ref={selectedRateValue} />
            </div>
            <div className={classes.form__submit__box}>
              <button>
                <CameraSvg className={classes.form__submit__box__svg} />
              </button>
              <button onClick={submitHandler}>
                <SubmitSvg className={classes.form__submit__box__svg} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default RatingForm;
