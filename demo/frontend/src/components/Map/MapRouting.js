import { useEffect, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import useRoute from "../hooks/use-route";
import { useSelector } from "react-redux";

const startMarker = new mapboxgl.Marker();
const endMarker = new mapboxgl.Marker();

const MapRouting = (props) => {
  const showRoute = useSelector((state) => state.ui.showRoute);
  const start = useSelector((state) => state.map.startRoutePoint.location);
  const end = useSelector((state) => state.map.endRoutePoint.location);

  const { fetchRouteHandler } = useRoute(start, end);

  const routeDataHandler = useCallback(async () => {
    const buffer_value = 1.0;

    startMarker.remove();
    endMarker.remove();

    const route_data = await fetchRouteHandler(buffer_value);

    if (props.map.current.getSource("route")) {
      props.map.current.getSource("route").setData(route_data);
    } else {
      props.map.current.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: route_data,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 7,
          "line-opacity": 0.75,
        },
      });
    }

    startMarker.setLngLat(start).addTo(props.map.current);
    endMarker.setLngLat(end).addTo(props.map.current);

    props.map.current.fitBounds([start, end], {
      padding: { top: 120, bottom: 120, left: 120, right: 330 },
    });
  }, [fetchRouteHandler, props.map]);

  useEffect(() => {
    routeDataHandler();
  }, [start, end, showRoute]);
};

export default MapRouting;
