import React from "react";
import Criteria from "./Criteria";
import petrolStation from "../../assets/petrolStation.svg";
import restaurant from "../../assets/restaurant.svg";
import randomize from "../../assets/randomize.svg";
import classes from "./Criteria.module.css";

const CriteriaContainer = (props) => {
  const restaurantFilterHandler = () => {
    const food = ["Restaurant", "Fast Food", "Bar"];
    props.map.current.setFilter("poi-label", [
      "any",
      ["in", ["get", "type"], ["literal", food]],
    ]);
  };

  const petrolStationFilterHandler = () => {
    const petrolStation = ["Fuel"];
    props.map.current.setFilter("poi-label", [
      "any",
      ["in", ["get", "type"], ["literal", petrolStation]],
    ]);
  };
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
          alt="petrol_station"
          onClick={restaurantFilterHandler}
          className={classes.criteriaLogo}
        />
      </Criteria>
      <Criteria>
        <img
          src={randomize}
          alt="petrol_station"
          className={classes.criteriaLogo}
        />
      </Criteria>
    </div>
  );
};

export default CriteriaContainer;
