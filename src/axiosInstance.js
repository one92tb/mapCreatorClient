import axios from "axios";

export let baseUrl = "http://localhost:8080";
//"https://map-creator-server.herokuapp.com"
//"http://localhost:8080"

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
})
