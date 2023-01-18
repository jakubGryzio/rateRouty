import { SERVER_HOST } from "../../utils/config";
import fetchData from "../../utils/fetch";

export default async function fetchRoute(param) {
  const { start, end, value, type } = param;
  try {
    const data = await fetchData({
      url: `${SERVER_HOST}/api/route/?start=${start.join()}&end=${end.join()}&buffer=${value}&type=${type}`,
      method: "GET",
      unauthorized: true,
    });

    return data;
  } catch (err) {
    console.error(err);
  }
}
