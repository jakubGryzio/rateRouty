import React, { forwardRef, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePost from "../../hooks/use-post";
import uiSlice from "../../../store/ui-slice";
import { ReactComponent as FaceLoveSvg } from "../../../assets/faceLove.svg";
import { ReactComponent as FaceOkSvg } from "../../../assets/faceOk.svg";
import { ReactComponent as FaceSadSvg } from "../../../assets/faceSad.svg";
import { ReactComponent as SubmitSvg } from "../../../assets/submit.svg";
import { ReactComponent as CameraSvg } from "../../../assets/camera.svg";
import Modal from "../Modal";
import CloseButton from "../CloseButton";
import FuelRatingForm from "./Details/FuelRatingForm";
import OtherRatingForm from "./Details/OtherRatingForm";
import classes from "./RatingForm.module.css";
import RestaurantRatingForm from "./Details/RestaurantRatingForm";

const featureTypes = ["Restaurant", "Fast Food", "Fuel"];

const RatingForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { postPOIHandler, postRatingHandler, postRatingAttributesHandler } =
    usePost();

  const selectedFeature = ref;
  const selectedRateValue = useRef(null);
  const selectedFeatureType = useSelector((state) => state.form.formType);
  const attributes = useSelector((state) => state.form.attributesToPost);

  const closeButtonHandler = () => {
    dispatch(uiSlice.actions.closeRatingForm());
  };

  const submitHandler = async () => {
    await postPOIHandler(selectedFeature.current);
    await postRatingHandler(selectedFeature.current, selectedRateValue.current);
    await postRatingAttributesHandler(selectedFeature.current, attributes);
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
          <div className={classes.form__details}>
            {featureTypes.slice(0, 2).includes(selectedFeatureType) && (
              <RestaurantRatingForm feature={selectedFeature.current} />
            )}
            {!featureTypes.includes(selectedFeatureType) && <OtherRatingForm />}
            {featureTypes.slice(2).includes(selectedFeatureType) && (
              <FuelRatingForm feature={selectedFeature.current} />
            )}
          </div>
          <div className={classes.form__submit}>
            <div className={classes.form__rate}>
              <h5>Ocena</h5>
              <div className={classes.form__rate__attributes}>
                <button onClick={() => (selectedRateValue.current = 3)}>
                  <FaceLoveSvg className={classes.form__rate__attributes_svg} />
                </button>
                <button onClick={() => (selectedRateValue.current = 2)}>
                  <FaceOkSvg className={classes.form__rate__attributes_svg} />
                </button>
                <button onClick={() => (selectedRateValue.current = 1)}>
                  <FaceSadSvg className={classes.form__rate__attributes_svg} />
                </button>
              </div>
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
