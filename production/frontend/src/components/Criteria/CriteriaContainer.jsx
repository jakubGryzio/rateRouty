import React from "react";
import Criteria from "./Criteria";
import petrolStation from "../../assets/svg/petrolStation.svg";
import restaurant from "../../assets/svg/restaurant.svg";
import randomize from "../../assets/svg/randomize.svg";
import classes from "./style/Criteria.module.css";
import MapController from "../MapView/MapController";

const CriteriaContainer = () => {
  const {
    restaurantFilterHandler,
    randomizeFilterHandler,
    petrolStationFilterHandler,
  } = MapController();

  return (
    <div className={classes.criteriaContainer}>
      <Criteria>
        <img
          src={petrolStation}
          alt="petrol_station"
          onClick={petrolStationFilterHandler}
          className={classes.criteriaLogo}
        />
      </Criteria>
      <Criteria>
        <img
          src={restaurant}
          alt="restaurant"
          onClick={restaurantFilterHandler}
          className={classes.criteriaLogo}
        />
      </Criteria>
      <Criteria>
        <img
          src={randomize}
          alt="randomize"
          onClick={randomizeFilterHandler}
          className={classes.criteriaLogo}
        />
      </Criteria>
    </div>
  );
};

export default CriteriaContainer;
