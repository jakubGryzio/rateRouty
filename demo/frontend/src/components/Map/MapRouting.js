import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapRouting = (props) => {
  const accessToken =
    "pk.eyJ1IjoiamFrdWJncnl6aW8iLCJhIjoiY2toeDlyOTVhMDVtdDJxbzducmV1aWZndyJ9.TClJXnJE1ALnmPi25y0m3Q";

  const fetchRouteData = async () => {
    const start = [21.00879, 52.231475];
    const end = [22.570102, 51.250559];

    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${accessToken}&alternatives=true&overview=full`,
      { method: "GET" }
    );

    const json = await response.json();

    const startMarker = new mapboxgl.Marker()
      .setLngLat(start)
      .addTo(props.map.current);
    const endMarker = new mapboxgl.Marker()
      .setLngLat(end)
      .addTo(props.map.current);

    props.map.current.fitBounds([start, end], {
      padding: { top: 50, bottom: 50, left: 50, right: 330 },
    });

    const data = json.routes[0];
    const route = data.geometry.coordinates;

    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };

    if (props.map.current.getSource("route")) {
      props.map.current.getSource("route").setData(geojson);
    } else {
      props.map.current.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
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
  };

  useEffect(() => {
    fetchRouteData();
  });
};

export default MapRouting;
