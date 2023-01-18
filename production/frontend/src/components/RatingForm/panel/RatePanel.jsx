import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { faceLoveSvg, faceOkSvg, faceSadSvg } from "../../../assets/index";
import formSlice from "../../../context/store/form-slice";
import RateButton from "../button/RateButton";
import classes from "../style/RatePanel.module.css";

const RatePanel = forwardRef((_, ref) => {
  const selectedRateValue = ref;
  const dispatch = useDispatch();

  return (
    <div className={classes.panel}>
      <RateButton
        image={faceLoveSvg}
        alt={"love"}
        onClick={() => rateHandler(3)}
      />
      <RateButton image={faceOkSvg} alt={"ok"} onClick={() => rateHandler(2)} />
      <RateButton
        image={faceSadSvg}
        alt={"sad"}
        onClick={() => rateHandler(1)}
      />
    </div>
  );

  function rateHandler(value) {
    selectedRateValue.current = value;
    dispatch(formSlice.actions.setCurrentRateValue(value));
  }
});

export default RatePanel;
