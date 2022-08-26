import React from "react";
import Criteria from "./Criteria";
import { ReactComponent as PetrolStation } from "../../assets/petrolStation.svg";
import { ReactComponent as Restaurant } from "../../assets/restaurant.svg";
import { ReactComponent as Randomize } from "../../assets/randomize.svg";
import classes from "./Criteria.module.css";

const CriteriaContainer = () => {
  return (
    <div className={classes.criteriaContainer}>
      <Criteria>
        <PetrolStation className={classes.criteriaLogo} />
      </Criteria>
      <Criteria>
        <Restaurant className={classes.criteriaLogo} />
      </Criteria>
      <Criteria>
        <Randomize className={classes.criteriaLogo} />
      </Criteria>
    </div>
  );
};

export default CriteriaContainer;
