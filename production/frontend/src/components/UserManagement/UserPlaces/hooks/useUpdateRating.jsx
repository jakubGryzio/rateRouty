import { useDispatch, useSelector } from "react-redux";
import {
  updateRating,
  updateRatingUserAttributes,
} from "../../../../data/api/update-rating";
import formSlice from "../../../../context/store/form-slice";

const useUpdateRating = (props) => {
  const { guid, id: rating_id } = props;
  const attributes = useSelector((state) => state.form.attributesToPost);
  const rateValue = useSelector((state) => state.form.currentRateValue);
  const places = useSelector((state) => state.form.places);
  const dispatch = useDispatch();

  async function updateHandler() {
    await updateRatingUserAttributes(rating_id, guid, attributes);
    if (rateValue !== null) {
      const updatedItem = await updateRating(rating_id, rateValue);
      const idx = places.findIndex((place) => place.pk === rating_id);
      const updatedPlaces = [
        ...places.slice(0, idx),
        updatedItem,
        ...places.slice(idx + 1),
      ];
      dispatch(formSlice.actions.setPlaces(updatedPlaces));
    }
  }

  return updateHandler;
};

export default useUpdateRating;
