import { SERVER_HOST } from "../../utils/config";
import fetchData from "../../utils/fetch";

export async function postPOI(feature) {
  const poi = {
    guid: feature.id,
    type: feature.properties.type,
    location: feature.geometry.coordinates.join(", "),
    name: feature.properties.name_en ?? feature.properties.name,
  };

  try {
    const data = await fetchData({
      url: `${SERVER_HOST}/api/v1/poi/create/`,
      method: "POST",
      body: JSON.stringify(poi),
    });
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
