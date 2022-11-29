import React from "react";
import classes from "./RatedPlacesItem.module.css";
import restaurantSvg from "../../../assets/restaurant_small.svg";
import petrolStationSvg from "../../../assets/petrolStation.svg";
import randomizeSvg from "../../../assets/randomize_dot.svg";
import faceLoveSmallSvg from "../../../assets/faceLove_small.svg";
import faceOkSmallSvg from "../../../assets/faceOk_small.svg";
import faceSadSmallSvg from "../../../assets/faceSad_small.svg";
import locationSvg from "../../../assets/location_small.svg";
import { useDispatch } from "react-redux";
import uiSlice from "../../../store/ui-slice";
import poiType from "../../../translation/pl";
import FilterButton from "./Button";

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

const RatedPlacesItem = ({ poi, value, favorite, map }) => {
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

  return (
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
              <FilterButton title={"Szczegóły"} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default RatedPlacesItem;
