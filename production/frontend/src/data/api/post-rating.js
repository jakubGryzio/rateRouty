import { SERVER_HOST } from "../../utils/config";
import fetchData from "../../utils/fetch";

export async function postRating(feature, rate) {
  const rating = {
    guid: feature.id,
  };

  if (rate) {
    rating["value"] = rate;
  }

  try {
    const data = await fetchData({
      url: `${SERVER_HOST}/api/v1/rating/create/`,
      method: "POST",
      body: JSON.stringify(rating),
    });
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function postRatingAttributes(feature, attributes) {
  const rating = {
    guid: feature.id,
    ...attributes,
  };

  try {
    const data = await fetchData({
      url: `${SERVER_HOST}/api/v1/rating/attributes/create/`,
      method: "POST",
      body: JSON.stringify(rating),
    });
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function postRatingUserAttributes(feature, rating_id, attributes) {
  const rating = {
    guid: feature.id,
    rating_id,
    ...attributes,
  };

  try {
    const data = await fetchData({
      url: `${SERVER_HOST}/api/v1/rating/user_attributes/create/`,
      method: "POST",
      body: JSON.stringify(rating),
    });
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
