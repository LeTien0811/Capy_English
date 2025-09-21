import axios, {Method} from "axios";
import AxiosError from "axios";
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
const api = axios.create({
  baseURL: "http://192.168.1.172:8000/api/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

interface  FetchOptions {
  query: string | null,
  method?: "GET" | "POST" | "PUT" | "DELETE";
  payload?: any;          // dữ liệu body (nếu có)
};

export const useFetchAPI = <T,>(path: string): [T | null, boolean, (options?: FetchOptions) => Promise<T | null>] => {
  const [Data, setData] = useState<T | null>(null);
  const [isLoadingFetch, setIsLoadingFetch] = useState(true);

  const fetchAPI = async (options?: FetchOptions): Promise<T | null> => {
    setIsLoadingFetch(true);
      try {
        const url = `${path}/${options?.query}`;
        let response;
        if (options?.method === "POST") {
          response = await api.post(url, options.payload);
        } else if (options?.method === "PUT") {
          response = await api.put(url, options.payload);
        } else if (options?.method === "DELETE") {
          response = await api.delete(url);
        } else {
          response = await api.get(url);
        }
        const result = response.data as T;
        setData(result);
        return result;
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response) {
        const errorData = err.response.data as T;
        console.error("API Error:", errorData);
        setData(errorData);
        return errorData;
      } else {
        console.error("Unexpected Error:", err);
        return { message: "Lỗi không xác định" } as unknown as T;
      }
      } finally {
        setIsLoadingFetch(false);
      }
    };
  return [Data, isLoadingFetch, fetchAPI];
};

export const useLogin = async (
  email: string | null,
  password_hash: string | null,
  full_name: string | null,
  loginWithName: boolean
) => {
  try {
    let response = null;
    if (loginWithName) {
      response = await api.post("Learners/", {
        full_name,
      });
    } else {
      response = await api.get(`SigninLearner/${email}/${password_hash}`);
    }
    if (response != null) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: {
          message: "không nhận được gì hết trơn",
        },
      };
    }
  } catch (error: unknown) {
    console.log("có lỗi xảy ra: ", error);
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: {
          message: "Lỗi API",
          details:
            typeof error.response?.data === "string"
              ? error.response.data
              : JSON.stringify(error.response?.data) || error.message,
        },
      };
    } else {
      return {
        success: false,
        error: {
          message: "Lỗi không xác định",
          details: (error as Error).message,
        },
      };
    }
  }
};
