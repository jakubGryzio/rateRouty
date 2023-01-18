import { useCallback, useEffect, useRef, Fragment, useContext } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import classes from "./style/Map.module.css";
import { useSelector, useDispatch } from "react-redux";
import mapSlice from "../../context/store/map-slice";
import MapRouting from "./MapRouting";
import RatingForm from "../RatingForm/RatingForm";
import uiSlice from "../../context/store/ui-slice";
import formSlice from "../../context/store/form-slice";
import { ACCESS_TOKEN } from "../../utils/config";
import MapContext from "../../context/MapContext";

const geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true,
  },
  trackUserLocation: true,
  fitBoundsOptions: { maxZoom: 10 },
});

const MapView = () => {
  const map = useContext(MapContext);
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
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/jakubgryzio/cl2k733ub000q14pehnr0tykx",
      center: [mapDetails.location.lng, mapDetails.location.lat],
      zoom: mapDetails.zoom,
      accessToken: ACCESS_TOKEN,
    });

    const geocoderStart = new MapboxGeocoder({
      accessToken: ACCESS_TOKEN,
      mapboxgl: mapboxgl,
    });

    const geocoderEnd = new MapboxGeocoder({
      accessToken: ACCESS_TOKEN,
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
    <Fragment>
      <div ref={mapContainer} className={classes.mapContainer} />
      {showRoute && <MapRouting map={map} />}
      {showRatingForm && <RatingForm ref={selectedFeature} />}
    </Fragment>
  );
};

export default MapView;
