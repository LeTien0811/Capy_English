import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function Learning() {
  const {lesson} = useLocalSearchParams();
  let parsedLesson = [];

  if (typeof lesson === 'string') {
    try {
      parsedLesson = JSON.parse(lesson);
    } catch (e) {
      console.error("Invalid JSON in lesson param", e);
    }
  } else {
    console.warn("lesson param is not a string", lesson);
  }
  alert(parsedLesson)
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}
