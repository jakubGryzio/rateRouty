import React, { useState, Fragment, useContext } from "react";
import classes from "./style/RatedPlacesItem.module.css";
import restaurantSvg from "../../../assets/svg/restaurant_small.svg";
import petrolStationSvg from "../../../assets/svg/petrolStation.svg";
import randomizeSvg from "../../../assets/svg/randomize_dot.svg";
import faceLoveSmallSvg from "../../../assets/svg/faceLove_small.svg";
import faceOkSmallSvg from "../../../assets/svg/faceOk_small.svg";
import faceSadSmallSvg from "../../../assets/svg/faceSad_small.svg";
import locationSvg from "../../../assets/svg/location_small.svg";
import { useDispatch } from "react-redux";
import uiSlice from "../../../context/store/ui-slice";
import poiType from "../../../data/intl/pl";
import Button from "../../common/Button";
import ItemDetails from "./ItemDetails";
import formSlice from "../../../context/store/form-slice";
import MapContext from "../../../context/MapContext";

const rateFaceSvg = {
  1: (
    <img
      src={faceSadSmallSvg}
      alt="rate_1"
      className={classes.item__rate__svg}
    />
  ),
  2: (
    <img
      src={faceOkSmallSvg}
      alt="rate_2"
      className={classes.item__rate__svg}
    />
  ),
  3: (
    <img
      src={faceLoveSmallSvg}
      alt="rate_3"
      className={classes.item__rate__svg}
    />
  ),
};

const rateOverallSvgHandler = (rate) => {
  if (rate < 1) {
    return rateFaceSvg[1];
  }

  if (rate >= 1 && rate <= 2) {
    return rateFaceSvg[2];
  }

  return rateFaceSvg[3];
};

const typeSvg = {
  Restaurant: (
    <img
      src={restaurantSvg}
      alt="restaurant"
      className={classes.item__icon__svg}
    />
  ),
  Fuel: (
    <img
      src={petrolStationSvg}
      alt="fuel"
      className={classes.item__icon__svg}
    />
  ),
};

const RatedPlacesItem = (props) => {
  const { poi, id, value, favorite } = props;
  const map = useContext(MapContext);
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const flyToHandler = () => {
    const poiLocation = poi.location.split(", ");
    const location = {
      lng: parseFloat(poiLocation[0]),
      lat: parseFloat(poiLocation[1]),
    };

    map.current.flyTo({
      center: [location.lng, location.lat],
      zoom: 19,
    });

    dispatch(uiSlice.actions.closeRatedPlaces());
  };

  const toggleDetailsHandler = () => {
    setShowDetails((prevState) => !prevState);
    dispatch(formSlice.actions.setCurrentRateValue(null));
  };

  return (
    <Fragment>
      <li className={classes.list__item}>
        <div className={classes.item__container}>
          <div className={classes.item__description__container}>
            <div className={classes.item__description}>
              <div className={classes.item__icon__container}>
                <div className={classes.item__icon}>
                  {typeSvg[poi.type] ?? (
                    <img
                      src={randomizeSvg}
                      alt="randomize"
                      className={classes.item__icon__svg}
                    />
                  )}
                </div>
              </div>
              <div className={classes.item__attributes}>
                <h4>{poi.name !== "null" && poi.name}</h4>
                <h5>{poiType[poi.type] ?? poi.type}</h5>
              </div>
            </div>
            <div className={classes.item__overall}>
              {favorite && (
                <div className={classes.item__location}>
                  <h5>Lokalizacja</h5>
                  <button onClick={flyToHandler}>
                    <img src={locationSvg} alt="location" />
                  </button>
                </div>
              )}
              {!favorite && (
                <div className={classes.item__user__rate}>
                  <h5>Ocena</h5>
                  <div className={classes.item__rate}>{rateFaceSvg[value]}</div>
                </div>
              )}
              <div className={classes.item__overall_rate}>
                <h5>Ocena ogólna</h5>
                <div className={classes.item__rate}>
                  {rateOverallSvgHandler(poi.rating)}
                </div>
              </div>
              <div className={classes.item__details}>
                <Button onClick={toggleDetailsHandler} title={"Szczegóły"} />
              </div>
            </div>
          </div>
        </div>
      </li>
      {showDetails && (
        <ItemDetails
          type={poi.type}
          guid={poi.guid}
          id={id}
          toggleDetailsHandler={toggleDetailsHandler}
        />
      )}
    </Fragment>
  );
};

export default RatedPlacesItem;
