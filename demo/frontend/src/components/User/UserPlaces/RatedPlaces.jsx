import React, { useState, Fragment } from "react";
import Modal from "../../UI/Modal";
import { useDispatch } from "react-redux";
import uiSlice from "../../../store/ui-slice";
import CloseButton from "../../UI/CloseButton";
import classes from "./RatedPlaces.module.css";
import RatedPlacesItem from "./RatedPlacesItem";
import useRating from "../../hooks/use-rating";
import { useEffect } from "react";
import { useCallback } from "react";
import Spinner from "../../UI/Spinner";
import Button from "./Button";

const RatedPlaces = ({ title, url, favorite, map }) => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState(null);
  const dispatch = useDispatch();
  const {fetchRating, _} = useRating();

  const closeButtonHandler = () => {
    dispatch(uiSlice.actions.closeRatedPlaces());
  };

  const filterPlacesHandler = (item) => {
    const filteredPlacesNames = ["Restaurant", "Fuel", "Fast Food"];

    if (filterValue === "Restaurant") {
      return item.poi.type === filterValue || item.poi.type === "Fast Food";
    }

    if (filterValue === "Fuel") {
      return item.poi.type === filterValue;
    }

    if (filterValue === "Others") {
      return !filteredPlacesNames.includes(item.poi.type);
    }

    return item;
  };

  const fetchRatingHandler = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchRating(url);
    setPlaces(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchRatingHandler();
  }, [fetchRatingHandler]);

  let content = <p>Oceń swoje pierwsze miejsce!</p>;

  if (places.length > 0) {
    content = (
      <Fragment>
        <div className={classes.list__filter}>
          <h5>Filtruj</h5>
          <Button
            onClick={() => setFilterValue("Fuel")}
            title={"Stacje paliw"}
          />
          <Button
            onClick={() => setFilterValue("Restaurant")}
            title={"Restauracje"}
          />
          <Button onClick={() => setFilterValue("Others")} title={"Inne"} />
          <CloseButton
            onClick={() => setFilterValue(null)}
            className={classes.clear__filer}
          />
        </div>
        <ul>
          {places.filter(filterPlacesHandler).map((item, idx) => {
            return (
              <RatedPlacesItem
                map={map}
                poi={item.poi}
                value={item.value}
                favorite={favorite}
                key={idx}
              />
            );
          })}
        </ul>
      </Fragment>
    );
  }

  if (isLoading) {
    content = (
      <div className={classes.spinner__container}>
        <Spinner />
      </div>
    );
  }

  return (
    <Modal className={classes.list__modal}>
      <CloseButton onClick={closeButtonHandler} />
      <div className={classes.header}>
        <h5>{title}</h5>
      </div>
      <div className={classes.list__container}>{content}</div>
    </Modal>
  );
};

export default RatedPlaces;
