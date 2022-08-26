import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapDetails: {
    location: { lng: 21.0218, lat: 52.2212 },
    // location: { lng: 15.0218, lat: 45.2212 },
    zoom: 9,
  },
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setUserLocation(state, action) {
      state.mapDetails.location = action.payload;
    },
  },
});

export default mapSlice;
