import { useContext } from "react";
import MapContext from "../../context/MapContext";
import { useDispatch } from "react-redux";
import { food, allTypes, fuel } from "../../data/constants/poiType";
import randomizeHandler from "../../utils/randomize";
import mapSlice from "../../context/store/map-slice";

const MapController = () => {
  const map = useContext(MapContext);
  const dispatch = useDispatch();

  function restaurantFilterHandler() {
    map.current.setFilter("poi-label", [
      "any",
      ["in", ["get", "type"], ["literal", food]],
    ]);

    dispatchPoiType(food);
  }

  function petrolStationFilterHandler() {
    map.current.setFilter("poi-label", [
      "any",
      ["in", ["get", "type"], ["literal", fuel]],
    ]);

    dispatchPoiType(fuel);
  }

  function randomizeFilterHandler() {
    const randomIndex = randomizeHandler(allTypes.length) - 1;
    const randomType = allTypes[randomIndex];
    map.current.setFilter("poi-label", [
      "any",
      ["==", ["get", "type"], randomType],
    ]);

    dispatchPoiType([randomType]);
  }

  function dispatchPoiType(type) {
    const typeToSet = type.join(",");
    dispatch(mapSlice.actions.setPoiType(typeToSet));
  }

  const removeFilterHandler = () => {
    map.current.setFilter("poi-label", null);

    dispatch(mapSlice.actions.setPoiType(null));
  };

  return {
    restaurantFilterHandler,
    petrolStationFilterHandler,
    randomizeFilterHandler,
    removeFilterHandler,
  };
};

export default MapController;
