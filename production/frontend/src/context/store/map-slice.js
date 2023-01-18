import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapDetails: {
    location: { lng: 21.0218, lat: 52.2212 },
    zoom: 9,
  },
  startRoutePoint: {
    location: [],
  },
  endRoutePoint: {
    location: [],
  },
  poiType: null,
  buffer: 1.0,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setUserLocation(state, action) {
      state.mapDetails.location = action.payload;
    },
    setStartRoutePoint(state, action) {
      state.startRoutePoint.location = action.payload;
    },
    setEndRoutePoint(state, action) {
      state.endRoutePoint.location = action.payload;
    },
    setPoiType(state, action) {
      state.poiType = action.payload;
    },
    setBuffer(state, action) {
      state.buffer = action.payload;
    },
  },
});

export default mapSlice;
