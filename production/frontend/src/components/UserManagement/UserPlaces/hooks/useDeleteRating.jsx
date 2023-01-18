import { useDispatch, useSelector } from "react-redux";
import {
  deleteRating,
  deleteRatingUserAttributes,
} from "../../../../data/api/delete-rating";
import formSlice from "../../../../context/store/form-slice";

const useDeleteRating = (props) => {
  const { guid, id } = props;
  const places = useSelector((state) => state.form.places);
  const dispatch = useDispatch();

  async function deleteHandler() {
    await deleteRating(id);
    await deleteRatingUserAttributes(id, guid);
    const filtredPlaces = places.filter((place) => place.pk !== id);
    dispatch(formSlice.actions.setPlaces(filtredPlaces));
  }

  return deleteHandler;
};

export default useDeleteRating;
