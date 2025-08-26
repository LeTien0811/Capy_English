import React from 'react'
import { Pressable, Text, View } from 'react-native'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
type CartProps = {
    topicId: number,
    topicName: string;
}

const Cart_lesson = ({topicId, topicName}: CartProps) => {
  return <View className='w-full flex flex-col'>
    <Text>topicName</Text> 
    <Pressable 
      key={topicId}>
      <MaterialIcons name="play-arrow" size={24} color="black" />
    </Pressable>
  </View>
}

export default Cart_lesson