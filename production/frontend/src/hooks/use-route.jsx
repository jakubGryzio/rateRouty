import { useSelector } from "react-redux";
import fetchRoute from "../data/api/fetch-route";

const useRoute = () => {
  const type = useSelector((state) => state.map.poiType);
  const buffer = useSelector((state) => state.map.buffer);

  async function routeHandler(start, end) {
    const param = {
      start,
      end,
      value: buffer === "" ? 0.1 : buffer,
      type,
    };
    const data = await fetchRoute(param);
    const route = data.geometry.coordinates;

    const route_data = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };

    return route_data;
  }

  return routeHandler;
};

export default useRoute;
