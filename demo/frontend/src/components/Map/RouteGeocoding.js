import { useEffect } from "react";

const RouteGeocoding = () => {
  const accessToken =
    "pk.eyJ1IjoiamFrdWJncnl6aW8iLCJhIjoiY2toeDlyOTVhMDVtdDJxbzducmV1aWZndyJ9.TClJXnJE1ALnmPi25y0m3Q";

  const fetchCooridnates = async (text) => {
    try {
      const respone = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/Lublin.json?access_token=${accessToken}`
      );

      const data = await respone.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCooridnates("Warszawa");
  }, []);
};

export default RouteGeocoding;
