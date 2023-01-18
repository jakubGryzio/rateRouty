import { SERVER_HOST } from "../../utils/config";
import fetchData from "../../utils/fetch";

export async function updateRating(id, value) {
  try {
    const data = await fetchData({
      url: `${SERVER_HOST}/api/v1/rating/update/${id}`,
      method: "PATCH",
      body: JSON.stringify({ value: +value }),
    });
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateRatingUserAttributes(id, guid, attributes) {
  const payload = {
    rating_id: id,
    ...attributes,
  };

  try {
    const data = await fetchData({
      url: `${SERVER_HOST}/api/v1/rating/user_attributes/update/${guid}`,
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return data;
  } catch (err) {
    console.error(err);
  }
}
