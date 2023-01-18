import React from "react";
import EntryButton from "./EntryButton";
import { LOGIN_TITLE } from "../../../data/constants/titles";
import { useDispatch } from "react-redux";
import uiSlice from "../../../context/store/ui-slice";

const LoginButton = () => {
  const dispatch = useDispatch();

  return (
    <EntryButton
      title={LOGIN_TITLE}
      onClick={() => dispatch(uiSlice.actions.showModal())}
    />
  );
};

export default LoginButton;
