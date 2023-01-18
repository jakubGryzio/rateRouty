import React from "react";
import classes from "./style/UserPlaces.module.css";
import { useSelector } from "react-redux";

const UserPlacesButton = (props) => {
  const isLogged = useSelector((state) => state.auth.isLogged);

  return (
    <button
      className={classes.userPlacesButton}
      disabled={!isLogged}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default UserPlacesButton;
