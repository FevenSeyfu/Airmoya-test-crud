import axios from "axios";
import { getItem } from "../utils/localStorage";

const baseUrl = import.meta.env.VITE_API_URL;

const apiRequest = async (method, endpoint, data = null, config = {}) => {
  const storedUserInfo = getItem("userInfo");
  const userToken = storedUserInfo ? storedUserInfo.token : null;

  const defaultConfig = {
    method: method,
    url: `${baseUrl}/${endpoint}`,
    headers: {
      Authorization: userToken ? `Bearer ${userToken}` : undefined,
    },
  };

  if (method === "POST" || method === "PUT") {
    defaultConfig.headers["Content-Type"] = "application/json";
    defaultConfig.data = data;
  }
  if (method === "DELETE" && data) {
    console.warn("DELETE requests do not require a body. Ignoring 'data' parameter.");
  }

  const finalConfig = { ...defaultConfig, ...config };

  try {
    const response = await axios(finalConfig);
    return response.data;
  } catch (error) {
    // console.error("API request error:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export default apiRequest;
