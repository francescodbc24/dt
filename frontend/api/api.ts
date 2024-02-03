import axios, { AxiosPromise } from "axios";

export const DEFAULT_HOST = "http://localhost:8000/api/";

const url = DEFAULT_HOST;

//Singleton instance of axios for the application.
export const instance = axios.create({
  baseURL: url,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName:"X-CSRFTOKEN",
  withXSRFToken: true, 
  timeout: 60000 * 5,
  withCredentials:true,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0"
  },
});
