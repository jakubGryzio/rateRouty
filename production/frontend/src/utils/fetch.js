import { KEY_ACCESS } from "../data/constants/keys";

const fetchData = async (param) => {
  const accessToken = localStorage.getItem(KEY_ACCESS);
  const { url, method, body, unauthorized } = param;

  function getHeader() {
    const contentType = {
      "Content-Type": "application/json",
    };
    const headers = {
      ...contentType,
      Authorization: `Bearer ${accessToken}`,
    };
    if (unauthorized) {
      return contentType;
    }
    return headers;
  }

  const response = await fetch(url, {
    method,
    headers: getHeader(),
    body,
  });

  if (!response.ok) {
    throw new Error(`${response.statusText}: ${response.url}`);
  }

  if (response.statusText === "No Content") return;

  const data = await response.json();
  return data;
};

export default fetchData;
