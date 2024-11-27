import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_RAPIDAPI_ENDPOINT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
  },
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.data.status) {
      return response;
    }
    response.data = {
      status: response.data?.status,
      message: response.data?.message,
    };
    return Promise.reject(response);
  },
  (error) => {
    if (error.response.status === 401) {
      console.error("User Expired");
      return Promise.reject(error);
    }
    const res = error.response;
    console.error("Looks like there was a problem. Status", res.status);
    return Promise.reject(res);
  }
);

export { apiClient };
