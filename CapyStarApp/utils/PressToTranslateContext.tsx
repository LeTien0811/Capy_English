import { View, Text } from 'react-native'
import React, { createContext, ReactNode, useState } from 'react'
import { PressToTranslateContext } from '@/libs/type'
import { useFetchAPI } from '@/hooks/handleFetchAPI'

const PressToTranslateContext = createContext<PressToTranslateContext | undefined>(undefined)
export const PressToTranslateProvider = () => {
  const [text, setText] = useState("")
  const [data, isLoadingFetch, fetchAPI] = useFetchAPI(`HandleTranslate/?text=${text}`)
  const HandleTranslate = async(text: string) => {
    
  }
  return (
    <View>
      <Text>PressToTranslateContext</Text>
    </View>
  )
}
