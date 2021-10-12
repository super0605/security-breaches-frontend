import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const getAccessToken = () => false;

export default class API {
  constructor(baseURL = apiUrl, defaultToken = false) {
    this.baseURL = baseURL;

    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use((config) => {
      let token = defaultToken || getAccessToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    });
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (data) => {
        if (data && data.response && data.response.status) {
          if (data.response.status === 401) {
            localStorage.clear();

            window.location.href = "/";
          }
        }
        return Promise.reject(data.response);
      }
    );
  }

  callApi({ method = "get", ...rest }) {
    return this.instance({ method, ...rest });
  }
}
