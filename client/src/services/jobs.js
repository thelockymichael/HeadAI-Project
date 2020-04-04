import axios from "axios";
const baseUrl = "/api/jobs-by-keywords/from-react";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newObject => {
  console.log("newObject", newObject);
  const request = await axios.post(baseUrl, newObject);
  return request.data;
};

export default { getAll, create };
