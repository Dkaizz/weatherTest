import axios from 'axios';

console.log('url:', process.env.REACT_APP_WEATHER_BASE_URL);
const request = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_BASE_URL,
});

export const get = async (path, option) => {
  const response = await request.get(path, option);
  return response;
};

export default request;
