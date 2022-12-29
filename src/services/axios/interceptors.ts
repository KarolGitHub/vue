import { apiClient } from "./config";
import { AxiosError } from "axios";

apiClient.interceptors.request.use(
  (config) => {
    console.log("axios", config);
    // const { jwtToken } = user.getters.getProfile();
    // if (jwtToken) {
    //     config.headers['Authorization'] = `Bearer ${jwtToken}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("interceptors", response);
    return response;
  },
  async (error) => {
    console.log("error in response", error.response.status);
    if (error && error.response) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        // await alertApp.present('Sesion expired', '', 'Error')
        // await user.actions.logOut()
      }
    }
    return Promise.reject(error);
  }
);
