import { SERVER_HOST } from "../../utils/config";
import fetchData from "../../utils/fetch";

export async function deleteRating(id) {
  try {
    await fetchData({
      url: `${SERVER_HOST}/api/v1/rating/delete/${id}`,
      method: "DELETE",
    });
  } catch (err) {
    console.error(err);
  }
}

export async function deleteRatingUserAttributes(id, guid) {
  const payload = {
    rating_id: id,
  };

  try {
    await fetchData({
      url: `${SERVER_HOST}/api/v1/rating/user_attributes/delete/${guid}`,
      method: "DELETE",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error(err);
  }
}
