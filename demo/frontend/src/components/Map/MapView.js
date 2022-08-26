import React, { useCallback, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import classes from "./Map.module.css";
import { useSelector, useDispatch } from "react-redux";
import mapSlice from "../../store/map-slice";
import MapRouting from "./MapRouting";

const MapView = () => {
  const map = useRef(null);
  const mapContainer = useRef(null);
  const mapDetails = useSelector((state) => state.map.mapDetails);
  const marker = useSelector((state) => state.map.currentPositionMarker);
  const showRoute = useSelector((state) => state.ui.showRoute);
  const dispatch = useDispatch();

  const flyToHandler = (location) => {
    map.current.flyTo({
      center: [location.lng, location.lat],
      zoom: 8,
    });
  };

  const geolocationHandler = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          };
          dispatch(mapSlice.actions.setUserLocation(location));

          flyToHandler(location);
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [dispatch]);

  const initializeMap = useCallback(() => {
    const accessToken =
      "pk.eyJ1IjoiamFrdWJncnl6aW8iLCJhIjoiY2toeDlyOTVhMDVtdDJxbzducmV1aWZndyJ9.TClJXnJE1ALnmPi25y0m3Q";

    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/jakubgryzio/cl2k733ub000q14pehnr0tykx",
      center: [mapDetails.location.lng, mapDetails.location.lat],
      zoom: mapDetails.zoom,
      accessToken: accessToken,
    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      fitBoundsOptions: { maxZoom: 10 },
    });

    map.current.addControl(geolocate, "bottom-left");
    map.current.on("load", () => {
      geolocate.trigger();
    });
  }, [map]);

  useEffect(() => {
    geolocationHandler();
    initializeMap();
    console.log(marker);
  }, [geolocationHandler, initializeMap]);

  return (
    <React.Fragment>
      <div ref={mapContainer} className={classes.mapContainer} />
      {showRoute && <MapRouting map={map} />}
    </React.Fragment>
  );
};

export default MapView;
