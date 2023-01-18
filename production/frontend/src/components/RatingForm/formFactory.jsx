import FuelRatingForm from "./Details/fuel/FuelRatingForm";
import OtherRatingForm from "./Details/other/OtherRatingForm";
import RestaurantRatingForm from "./Details/restaurant/RestaurantRatingForm";
import RestaurantForm from "./Details/restaurant/RestaurantForm";
import FuelForm from "./Details/fuel/FuelForm";
import CommentForm from "./Details/other/CommentForm";
import { food as foodTypes } from "../../data/constants/poiType";
import { fuel as fuelType } from "../../data/constants/poiType";

export const formRatingFactory = (type, id) => {
  if (foodTypes.includes(type)) {
    return <RestaurantRatingForm guid={id} />;
  }
  if (fuelType.includes(type)) {
    return <FuelRatingForm guid={id} />;
  }

  return <OtherRatingForm guid={id} />;
};

export const formFactory = (type, guid, rating_id) => {
  if (foodTypes.includes(type)) {
    return <RestaurantForm guid={guid} rating_id={rating_id} userView={true} />;
  }
  if (fuelType.includes(type)) {
    return <FuelForm guid={guid} rating_id={rating_id} userView={true} />;
  }

  return (
    <CommentForm
      guid={guid}
      rating_id={rating_id}
      isPlaceholder={true}
      className={true}
      userView={true}
    />
  );
};
