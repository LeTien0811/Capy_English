import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Result = {
  numberOfQuestion: number,
  score: number;
}

const ShowResult = ({isResult}: {isResult:Result}) => {
  const style = StyleSheet.create({
    boxShadow: {
      ...Platform.select({
        ios:{
          shadowColor: "#000",
          shadowOffset: {width: 5, height: 5},
          shadowOpacity: 0.5,
          shadowRadius: 5,
        },
        android:{
          elevation: 7,
        },
      })
    }
  })
  return (
    <View className='w-screen h-full flex gap-20 relative items-center'>
      <View
      style={style.boxShadow}
       className='w-full p-2 py-10 bg-white items-start'>
        <Text className='font-bold text-2xl'>Lesson complete</Text>
        <Text className='font-bold text-gray-600 text-md'>Well done! Keep up the good work</Text>
      </View>
      <View className='border-2 p-40 border-gray-400'>
        <Text>{isResult.numberOfQuestion}</Text>
        <View className='border-t-4 border-l-4 border-r-4 border-b-4 rounded-full items-center justify-center w-[50] h-[50]'>
          <Text >{isResult.score}</Text>
        </View>
      </View>
    </View>
  )
}

export default ShowResult
