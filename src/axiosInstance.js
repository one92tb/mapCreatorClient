import axios from "axios";

export let baseUrl = "https://map-creator-server.herokuapp.com"
//export let baseUrl = "https://map-creator-server.herokuapp.com";
export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
})
