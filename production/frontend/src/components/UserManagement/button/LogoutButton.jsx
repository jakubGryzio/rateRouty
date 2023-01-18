import React from "react";
import { useDispatch } from "react-redux";
import EntryButton from "./EntryButton";
import { LOGOUT_TITLE } from "../../../data/constants/titles";
import authSlice from "../../../context/store/auth-slice";

const LogoutButton = () => {
  const dispatch = useDispatch();

  return (
    <EntryButton
      title={LOGOUT_TITLE}
      onClick={() => dispatch(authSlice.actions.logOut())}
    />
  );
};

export default LogoutButton;
