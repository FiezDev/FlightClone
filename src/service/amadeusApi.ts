import axios from "axios";

const clientId = import.meta.env.VITE_AMADEUSAPI_KEY;
const clientSecret = import.meta.env.VITE_AMADEUSAPI_SECRET;
const authEndpoint = import.meta.env.VITE_AMADEUSAPI_AUTH_ENDPOINT;

const getAuthorizationHeader = async () => {
  const response = await axios.post(
    authEndpoint,
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  if (response.status === 200) {
    return `Bearer ${response.data.access_token}`;
  } else {
    throw new Error("Failed to fetch bearer token");
  }
};

const createAmadeusClient = async () => {
  const authorization = await getAuthorizationHeader();

  return axios.create({
    baseURL: import.meta.env.VITE_AMADEUSAPI_ENDPOINT,
    headers: {
      Accept: "application/vnd.amadeus+json",
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};

const amadeusClient = await createAmadeusClient();

amadeusClient.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
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

export { amadeusClient };
