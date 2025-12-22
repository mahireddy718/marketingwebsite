// import axios from "axios";

// export const API = axios.create({
//   baseURL: "http://localhost:4001",
// });

import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:4001",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= AUTH TOKEN INJECTOR ================= */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= GLOBAL RESPONSE ERROR LOGGER ================= */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response?.status,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);
