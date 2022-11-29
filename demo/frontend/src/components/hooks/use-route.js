const useRoute = (start, end) => {
  const fetchRouteHandler = async (value) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/route/?start=${start.join()}&end=${end.join()}&buffer=${value}`,
        { method: "GET" }
      );

      const data = await response.json();
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
    } catch (error) {
      console.error(error);
    }
  };

  return {
    fetchRouteHandler,
  };
};

export default useRoute;
