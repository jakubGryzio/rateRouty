import { SERVER_HOST } from "../../utils/config";
import fetchData from "../../utils/fetch";

export async function fetchRating(url) {
  try {
    const data = await fetchData({
      url,
      method: "GET",
    });
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchRatingAttributes(guid, type) {
  try {
    const data = await fetchData({
      url: `${SERVER_HOST}/api/v1/rating/attributes/${guid}?type=${type}`,
      method: "GET",
    });
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchRatingUserAttributes(guid, rating_id, type) {
  const fetchType = type ? `&type=${type}` : "";
  try {
    const data = await fetchData({
      url: `${SERVER_HOST}/api/v1/rating/user_attributes/${guid}?rating_id=${rating_id}${fetchType}`,
      method: "GET",
    });
    return data;
  } catch (err) {
    console.error(err);
  }
}
