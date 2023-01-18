import React from "react";
import UserPlacesButton from "./UserPlacesButton";
import { useDispatch, useSelector } from "react-redux";
import RatedPlaces from "./RatedPlaces";
import uiSlice from "../../../context/store/ui-slice";

const UserPlaces = () => {
  const dispatch = useDispatch();
  const ratedPlaces = useSelector((state) => state.ui.ratedPlaces);

  return (
    <React.Fragment>
      <UserPlacesButton
        onClick={(e) => {
          const url = "http://127.0.0.1:8000/api/v1/rating/favorite/";
          const title = e.target.innerHTML;
          const favorite = true;
          const payload = {
            url,
            title,
            favorite,
          };
          dispatch(uiSlice.actions.showRatedPlaces(payload));
        }}
      >
        Ulubione miejsca
      </UserPlacesButton>
      <UserPlacesButton
        onClick={(e) => {
          const url = "http://127.0.0.1:8000/api/v1/rating/";
          const title = e.target.innerHTML;
          const favorite = false;
          const payload = {
            url,
            title,
            favorite,
          };
          dispatch(uiSlice.actions.showRatedPlaces(payload));
        }}
      >
        Ocenione miejsca
      </UserPlacesButton>
      {ratedPlaces.show && (
        <RatedPlaces
          title={ratedPlaces.title}
          url={ratedPlaces.url}
          favorite={ratedPlaces.favorite}
        />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
