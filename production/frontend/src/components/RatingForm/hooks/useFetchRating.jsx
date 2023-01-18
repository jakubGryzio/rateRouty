import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import formSlice from "../../../context/store/form-slice";
import {
  fetchRatingAttributes,
  fetchRatingUserAttributes,
} from "../../../data/api/fetch-rating";

const useFetchRating = (guid, rating_id, type, userView, params) => {
  const initValue = null;
  const [firstAttribute, secondAttribute, thirdAttribute] = params;

  const [firstValue, setFirstValue] = useState(initValue);
  const [secondValue, setSecondValue] = useState(initValue);
  const [thirdValue, setThirdValue] = useState(initValue);
  const dispatch = useDispatch();

  const fetchRatingAttributesHandler = useCallback(async () => {
    const data = await fetchHandler();
    setFirstValue(data[firstAttribute]);
    setSecondValue(data[secondAttribute]);
    setThirdValue(data[thirdAttribute]);
  }, [guid, rating_id]);

  async function fetchHandler() {
    if (userView) {
      return await fetchRatingUserAttributes(guid, rating_id, type);
    }
    return await fetchRatingAttributes(guid, type);
  }

  useEffect(() => {
    fetchRatingAttributesHandler();
  }, [fetchRatingAttributesHandler]);

  useEffect(() => {
    let attributes = {};
    attributes[firstAttribute] = firstValue;
    attributes[secondAttribute] = secondValue;
    attributes[thirdAttribute] = thirdValue;

    dispatch(formSlice.actions.setAttributesToPost(attributes));
  }, [firstValue, secondValue, thirdValue, dispatch]);

  return {
    firstState: [firstValue, setFirstValue],
    secondState: [secondValue, setSecondValue],
    thirdState: [thirdValue, setThirdValue],
  };
};

export default useFetchRating;
