import React, { Fragment } from "react";
import { KEY_USERNAME } from "../../data/constants/keys";
import UserPlaces from "./UserPlaces/UserPlaces";

const LoggedUserPanel = () => {
  const username = localStorage.getItem(KEY_USERNAME);
  return (
    <Fragment>
      <p>{username}</p>
      <UserPlaces />
    </Fragment>
  );
};

export default LoggedUserPanel;
