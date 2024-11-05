import axios from "axios";
import { getItem } from '../utils/localStorage';

const baseUrl = import.meta.env.VITE_API_URL;

const apiRequest = async (method, endpoint, data = null, config = {}) => {
  const storedUserInfo = getItem("userInfo");
  const userToken = storedUserInfo ? storedUserInfo.token : null;

  const defaultConfig = {
    method: method,
    url: `${baseUrl}/${endpoint}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: userToken ? `Bearer ${userToken}` : undefined,
    },
    data: data,
  };

  const finalConfig = { ...defaultConfig, ...config };

  try {
    const response = await axios(finalConfig);
    return response.data;
  } catch (error) {
    // console.error("API request error:", error);
    throw response.message;
  }
};

export default apiRequest;