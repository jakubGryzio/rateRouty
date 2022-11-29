import React, { useCallback, useEffect, useRef, forwardRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import classes from "./Map.module.css";
import { useSelector, useDispatch } from "react-redux";
import mapSlice from "../../store/map-slice";
import MapRouting from "./MapRouting";
import RatingForm from "../UI/Rating/RatingForm";
import uiSlice from "../../store/ui-slice";
import formSlice from "../../store/form-slice";

const geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true,
  },
  trackUserLocation: true,
  fitBoundsOptions: { maxZoom: 10 },
});

const MapView = forwardRef((props, ref) => {
  const map = ref;
  const mapContainer = useRef(null);
  const selectedFeature = useRef(null);
  const hoverFeature = useRef(null);

  const mapDetails = useSelector((state) => state.map.mapDetails);
  const showRoute = useSelector((state) => state.ui.showRoute);
  const showRatingForm = useSelector((state) => state.ui.showRatingForm);

  const dispatch = useDispatch();

  const flyToHandler = useCallback(
    (location) => {
      map.current.flyTo({
        center: [location.lng, location.lat],
        zoom: 8,
      });
    },
    [map]
  );

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
  }, [dispatch, flyToHandler]);

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

    const geocoderStart = new MapboxGeocoder({
      accessToken: accessToken,
      mapboxgl: mapboxgl,
    });

    const geocoderEnd = new MapboxGeocoder({
      accessToken: accessToken,
      mapboxgl: mapboxgl,
    });

    map.current.addControl(geolocate, "bottom-left");

    geocoderStart.addTo("#geocoder-start");
    geocoderEnd.addTo("#geocoder-end");
    geocoderStart.setPlaceholder(" ");
    geocoderEnd.setPlaceholder(" ");
    geocoderStart.setLimit(3);
    geocoderEnd.setLimit(3);
    geocoderStart.setMinLength(3);
    geocoderEnd.setMinLength(3);

    geocoderStart.on("result", (event) => {
      dispatch(
        mapSlice.actions.setStartRoutePoint(event.result.geometry.coordinates)
      );
    });

    geocoderEnd.on("result", (event) => {
      dispatch(
        mapSlice.actions.setEndRoutePoint(event.result.geometry.coordinates)
      );
    });

    map.current.on("load", () => {
      geolocate.trigger();
    });

    map.current.on("click", (e) => {
      const feature = map.current.queryRenderedFeatures(e.point, {
        layers: ["poi-label"],
      });

      if (feature.length === 0) {
        return;
      }
      selectedFeature.current = feature[0];
      dispatch(uiSlice.actions.showRatingForm());
      dispatch(formSlice.actions.setFormType(feature[0].properties.type));
    });

    map.current.on("mousemove", "poi-label", (e) => {
      map.current.getCanvas().style.cursor = "pointer";
      if (e.features.length > 0) {
        hoverFeature.current = e.features[0].id;
        map.current.setLayoutProperty("poi-label", "icon-size", [
          "match",
          ["id"],
          hoverFeature.current,
          2,
          1,
        ]);
      }
    });

    map.current.on("mouseleave", "poi-label", () => {
      map.current.getCanvas().style.cursor = "";
      map.current.setLayoutProperty("poi-label", "icon-size", [
        "match",
        ["id"],
        hoverFeature.current,
        1,
        1,
      ]);
    });
  }, [map]);

  useEffect(() => {
    initializeMap();
    geolocationHandler();
  }, [geolocationHandler, initializeMap]);

  return (
    <React.Fragment>
      <div ref={mapContainer} className={classes.mapContainer} />
      {showRoute && <MapRouting map={map} />}
      {showRatingForm && <RatingForm ref={selectedFeature} />}
    </React.Fragment>
  );
});

export default MapView;
