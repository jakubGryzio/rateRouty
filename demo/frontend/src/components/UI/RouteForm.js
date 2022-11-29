import React from "react";
import { ReactComponent as SettingsSvg } from "../../assets/settings.svg";
import { ReactComponent as RouteSvg } from "../../assets/route.svg";
import { ReactComponent as StartLabelSvg } from "../../assets/startLabel.svg";
import { ReactComponent as EndLabelSvg } from "../../assets/endLabel.svg";

import classes from "./RouteForm.module.css";
import { useDispatch } from "react-redux";
import uiSlice from "../../store/ui-slice";

const RouteForm = () => {
  const dispatch = useDispatch();

  const routeHandler = () => {
    dispatch(uiSlice.actions.showRoute());
  };

  return (
    <div className={classes.routeFormCointainer}>
      <div className={classes.inputContainer}>
        <div id="geocoder-start" className={classes.inputDestination}>
          <label htmlFor="start">
            <StartLabelSvg className={classes.startLabel} />
          </label>
          {/* <input
            type="text"
            id="start"
            value={"Warszawa"}
            onChange={() => {}}
          /> */}
        </div>
        <div id="geocoder-end" className={classes.inputDestination}>
          <label htmlFor="end">
            <EndLabelSvg className={classes.endLabel} />
          </label>
          {/* <input type="text" id="end" value={"Lublin"} onChange={() => {}} /> */}
        </div>
      </div>
      <div className={classes.settingsContainer}>
        <button>
          <SettingsSvg className={classes.settings} />
        </button>
      </div>
      <div className={classes.routeContainer}>
        <button onClick={routeHandler}>
          <RouteSvg className={classes.route} />
        </button>
      </div>
    </div>
  );
};

export default RouteForm;
