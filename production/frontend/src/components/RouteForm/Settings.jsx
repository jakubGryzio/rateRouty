import React from "react";
import Button from "../common/Button";
import classes from "./style/Settings.module.css";
import { useDispatch, useSelector } from "react-redux";
import mapSlice from "../../context/store/map-slice";
import MapController from "../MapView/MapController";

const Settings = () => {
  const { removeFilterHandler } = MapController();
  const buffer = useSelector((state) => state.map.buffer);
  const dispatch = useDispatch();

  const bufferHandler = (e) => {
    const value = e.target.value;
    if (value === "") {
      e.target.type = "text";
    } else {
      e.target.type = "number";
    }
    dispatch(mapSlice.actions.setBuffer(value));
  };

  return (
    <div className={classes.settings}>
      <div className={classes.buffer}>
        <label>{`Bufor [km]`}</label>
        <input
          onChange={bufferHandler}
          value={buffer}
          type="number"
          min="0.1"
          step="0.1"
        ></input>
      </div>
      <Button onClick={removeFilterHandler} title={"Wyczyść filtr"} />
    </div>
  );
};

export default Settings;
