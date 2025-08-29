import axios from "axios";

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
const useFetchAPI = <T,>(path: string, query: string):[T | null, boolean] => {
  const [Data, setData] = useState<T | null>(null);
  const [isLoadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
          const url = query ? `${path}?${query}` : path;
          const response = await api.get(url);
          console.log(response.data);
          setData(response.data as T);
          setLoadingData(false);
          return;
      } catch (err) {
        // Xử lý lỗi
        if (axios.isAxiosError(err)) {
          console.error("Axios Error:", err.message);
        } else {
          console.error("Unexpected Error:", err);
        }
      } finally {
        setLoadingData(false); 
      }
    };
    fetchAPI();
  }, []);
  return [Data, isLoadingData];
};

export default useFetchAPI;
