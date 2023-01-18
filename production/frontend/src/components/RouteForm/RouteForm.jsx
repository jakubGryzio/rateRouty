import React, { useState } from "react";
import { ReactComponent as SettingsSvg } from "../../assets/svg/settings.svg";
import { ReactComponent as RouteSvg } from "../../assets/svg/route.svg";
import { ReactComponent as StartLabelSvg } from "../../assets/svg/startLabel.svg";
import { ReactComponent as EndLabelSvg } from "../../assets/svg/endLabel.svg";

import classes from "./style/RouteForm.module.css";
import { useDispatch } from "react-redux";
import uiSlice from "../../context/store/ui-slice";
import Settings from "./Settings";

const RouteForm = () => {
  const dispatch = useDispatch();
  const [toggleSettings, setToggleSettings] = useState(false);

  const routeHandler = () => {
    dispatch(uiSlice.actions.showRoute());
  };

  return (
    <>
      {toggleSettings && <Settings />}
      <div className={classes.routeFormCointainer}>
        <div className={classes.inputContainer}>
          <div id="geocoder-start" className={classes.inputDestination}>
            <label htmlFor="start">
              <StartLabelSvg className={classes.startLabel} />
            </label>
          </div>
          <div id="geocoder-end" className={classes.inputDestination}>
            <label htmlFor="end">
              <EndLabelSvg className={classes.endLabel} />
            </label>
          </div>
        </div>
        <div className={classes.settingsContainer}>
          <button
            onClick={() => {
              setToggleSettings((prevState) => !prevState);
            }}
          >
            <SettingsSvg className={classes.settings} />
          </button>
        </div>
        <div className={classes.routeContainer}>
          <button onClick={routeHandler}>
            <RouteSvg className={classes.route} />
          </button>
        </div>
      </div>
    </>
  );
};

export default RouteForm;
