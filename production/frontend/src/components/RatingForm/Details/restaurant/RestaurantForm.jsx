import React, { Fragment } from "react";
import useFetchRating from "../../hooks/useFetchRating";
import RestaurantCategory from "./RestaurantCategory";
import { foodSvg, decorationSvg, serviceSvg } from "../../../../assets/index";

const RestaurantForm = (props) => {
  const { guid, rating_id, ifShowTitle, userView } = props;
  const type = "restaurant";
  const params = ["food", "decoration", "service"];
  const {
    firstState: foodRateState,
    secondState: decorationRateState,
    thirdState: serviceRateState,
  } = useFetchRating(guid, rating_id, type, userView, params);

  const [foodRate, setFoodRate] = foodRateState;
  const [decorationRate, setDecorationRate] = decorationRateState;
  const [serviceRate, setServiceRate] = serviceRateState;

  return (
    <Fragment>
      <RestaurantCategory
        image={foodSvg}
        alt="food"
        title={ifShowTitle && "Jedzenie"}
        value={foodRate}
        stateHandler={setFoodRate}
      />
      <RestaurantCategory
        image={decorationSvg}
        alt="decoration"
        title={ifShowTitle && "Wystrój"}
        value={decorationRate}
        stateHandler={setDecorationRate}
      />
      <RestaurantCategory
        image={decorationSvg}
        alt="service"
        title={ifShowTitle && "Obsługa"}
        value={serviceRate}
        stateHandler={setServiceRate}
      />
    </Fragment>
  );
};

export default RestaurantForm;
