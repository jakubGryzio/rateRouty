const useRating = () => {
  const accessToken = localStorage.getItem("access");

  const fetchRating = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRatingAttributes = async (guid, type) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/rating/attributes/${guid}?type=${type}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return { fetchRating, fetchRatingAttributes };
};

export default useRating;
