/** @format */

import axios from "axios";

export const DOMAIN = "https://back-end-nodejs1.herokuapp.com";
//set up axios interceptor

export const http = axios.create({
  baseURL: DOMAIN,
});
