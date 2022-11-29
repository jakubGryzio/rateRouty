const usePost = () => {
  const accessToken = localStorage.getItem("access");

  const postPOIHandler = async (feature) => {
    const data = {
      guid: feature.id,
      type: feature.properties.type,
      location: feature.geometry.coordinates.join(", "),
      name: feature.properties.name_en ?? feature.properties.name,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/poi/create/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const response_data = await response.json();
      console.log(response_data);
    } catch (error) {
      console.error(error);
    }
  };

  const postRatingHandler = async (feature, rate) => {
    const data = {
      guid: feature.id,
    };

    if (rate) {
      data["value"] = rate;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/rating/create/",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const response_data = await response.json();
      console.log(response_data);
    } catch (error) {
      console.error(error);
    }
  };

  const postRatingAttributesHandler = async (feature, attributes) => {
    const data = {
      guid: feature.id,
      ...attributes,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/rating/attributes/create/",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const response_data = await response.json();
      console.log(response_data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    postPOIHandler,
    postRatingHandler,
    postRatingAttributesHandler,
  };
};

export default usePost;
