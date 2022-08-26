import React, { useContext, useEffect } from "react";
import MapContext from "../store/map-context";

import classes from "./Map.module.css";

const MapMover = (props) => {
  const mapCtx = useContext(MapContext);

  const moveHandler = () => {
    if (!props.mapView.current) return;
    props.mapView.current.on("move", () => {
      mapCtx.changeZoomAndLocation(props.mapView);
    });
  };

  useEffect(() => {
    moveHandler();
  }, []);

  return (
    <div className={classes.sidebar}>
      Longitude: {mapCtx.location.lng} | Latitude:
      {mapCtx.location.lat} | Zoom: {mapCtx.zoom}
    </div>
  );
};

export default MapMover;
