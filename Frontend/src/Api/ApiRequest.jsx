import axios from "axios";
import { getItem } from '../utils/localStorage';

const baseUrl = import.meta.env.VITE_API_URL;

const apiRequest = async (method, endpoint, data = null) => {
  const storedUserInfo = getItem("userInfo");
  const userToken = storedUserInfo ? storedUserInfo.token : null;

  const config = {
    method: method,
    url: `${baseUrl}/${endpoint}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: userToken ? `Bearer ${userToken}` : undefined,
    },
    data: data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

export default apiRequest;