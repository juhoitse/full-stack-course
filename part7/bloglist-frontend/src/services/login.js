import axios from "axios";
const baseUrl = "http://localhost:3001/api/login";

const login = (username, password) => {
  const request = axios
    .post(baseUrl, { username: username, password: password })
    .then((response) => response.data);
  //console.log('request:', request.name)
  return request;
};

const funcs = {
  login,
};

export default funcs;
