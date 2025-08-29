import { View, Text } from 'react-native'
import React from 'react'
import ButtonStyle from '@/components/ButtonStyle'
import { useRouter } from 'expo-router'

export default function index() {
    const hanldeClickGo = () =>{
        const router = useRouter();
        router.push("/(protected)/(lesson)");
    }
  return (
    <View>
      <Text>Hi Làm Bài Tess nha</Text>
      <ButtonStyle
      content='Go'
      textColor='white'
      align_items='center'
      key={null}
      color=''
      onPress={() => hanldeClickGo()}
      />
    </View>
  )
}