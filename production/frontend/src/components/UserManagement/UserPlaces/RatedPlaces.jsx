import React, { useState, Fragment, useEffect, useCallback } from "react";
import Modal from "../../common/Modal";
import { useDispatch, useSelector } from "react-redux";
import uiSlice from "../../../context/store/ui-slice";
import { fetchRating } from "../../../data/api/fetch-rating";
import CloseButton from "../../common/CloseButton";
import RatedPlacesItem from "./RatedPlacesItem";
import Spinner from "../../common/Spinner";
import Button from "../../common/Button";
import classes from "./style/RatedPlaces.module.css";
import formSlice from "../../../context/store/form-slice";

const RatedPlaces = ({ title, url, favorite }) => {
  const places = useSelector((state) => state.form.places);
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState(null);
  const dispatch = useDispatch();

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
    dispatch(formSlice.actions.setPlaces(data));
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
                poi={item.poi}
                value={item.value}
                id={item.pk}
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
