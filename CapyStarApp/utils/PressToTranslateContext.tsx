import { View, Text, Alert } from 'react-native'
import React, { Children, createContext, ReactNode, useContext, useState } from 'react'
import { PressToTranslateContextType } from '@/libs/type'
import { useFetchAPI } from '@/hooks/handleFetchAPI'

interface ApiResponse {
  error: string | null,
  translated: string | null,
}

const PressToTranslateContext = createContext<PressToTranslateContextType | undefined>(undefined);

export const PressToTranslateProvider = ({ children }: {children: ReactNode} ) => {
  const [isHandingTranslate, setHandingTranslate] = useState(true);
  const [resultTranslate, setresultTranslate] = useState<string|null>(null);
  const [data, isLoadingFetch, fetchAPI] = useFetchAPI<ApiResponse>(`HandleTranslate`);

  const isHandleTranslate = async(data: string) => {
    setHandingTranslate(true);

    if (data === null) {
      setresultTranslate(null);   
      setHandingTranslate(false);
      return;
    }

    const response = await fetchAPI({
      method: "GET",
      params: {text: data},
    });

    if(!response ) {
      Alert.alert("Thông Báo", "Lỗi khi gửi dữ liệu");
    } else if(response.error){
      Alert.alert("Thông Báo", response.error?.toString() || "Lỗi khi gửi dữ liệu");
    } else {
      Alert.alert("Dịch", response.translated?.toString())
      setresultTranslate(response.translated);
    }
    setHandingTranslate(false);
  }

  const TranslateValue: PressToTranslateContextType = {
    isHandingTranslate,
    resultTranslate,
    isHandleTranslate,
  }

  return (
    <PressToTranslateContext.Provider value={TranslateValue}>
      {children}
    </PressToTranslateContext.Provider> 
  );
}

export const useTranslateTextToAPI = () => {
  const context = useContext(PressToTranslateContext);
  if(context === undefined) {
    console.log("useTranslateTextToAPI must be used winthin a PressToTranslateContext.Provider");
    throw new Error("useTranslateTextToAPI must be used winthin a PressToTranslateContext.Provider");
  }
  return context;
}