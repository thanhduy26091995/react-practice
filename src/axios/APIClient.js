import axios from "axios";

const defaultHeader = {
  "Content-Type": "application/json",
  accept: "application/json",
};

export default class APIClient {
  constructor(baseURL) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: defaultHeader,
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // GET method
  async get(endpoint, params = {}, headers = defaultHeader) {
    return this.request("get", endpoint, null, params, headers);
  }

  // POST method
  async post(endpoint, data, headers = defaultHeader) {
    return this.request("post", endpoint, data, {}, headers);
  }

  // PUT method
  async put(endpoint, data, headers = defaultHeader) {
    return this.request("put", endpoint, data, {}, headers);
  }

  // DELETE method
  async delete(endpoint, data, headers = defaultHeader) {
    return this.request("delete", endpoint, null, {}, headers);
  }

  async request(method, endpoint, data, params = {}, headers = defaultHeader) {
    try {
      const response = await this.axiosInstance.request({
        method,
        url: endpoint,
        data,
        params,
        headers,
      });
      return {
        code: response.status,
        data: response.data,
      };
    } catch (error) {
      return {
        error: this.handleError(error),
      };
    }
  }

  // Handle and log error
  handleError(error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Error Response:", error.response.data);
      return {
        message:
          error.response.data?.message || "Error occurred during the request.",
        status: error.response.status,
      };
    } else if (error.request) {
      // No response received from the server
      console.error("No response received:", error.request);
      return {
        message: "No response received from the server.",
      };
    } else {
      // Error setting up the request
      console.error("Error setting up request:", error.message);
      return {
        message: error.message,
      };
    }
  }
}
