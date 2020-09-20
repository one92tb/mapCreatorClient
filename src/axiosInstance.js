import axios from 'axios';

export const baseUrl = 'https://map-creator-server.herokuapp.com';
// "https://map-creator-server.herokuapp.com";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
});
