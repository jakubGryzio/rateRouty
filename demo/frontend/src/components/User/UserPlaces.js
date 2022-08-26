import React from "react";
import UserPlacesButton from "./UserPlacesButton";
import classes from "./UserPlaces.module.css";

const UserPlaces = () => {
  return (
    <div className={classes.userPlacesContainer}>
      <UserPlacesButton>Ulubione miejsca</UserPlacesButton>
      <UserPlacesButton>Ocenione miejsca</UserPlacesButton>
    </div>
  );
};

export default UserPlaces;
