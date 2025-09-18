import { View, Text, Image } from 'react-native'
import React from 'react'
import TitleTextStyle from '../Text/TitleTextStyle'

const OverviewWidgetCard = () => {
  return (
    <View className="w-full flex flex-row flex-wrap gap-3">
      <View className="w-[47%] p-2 items-center border-2 flex-row border-gray-300 rounded-xl"> 
          <View className="w-2/3 h-full">
            <Text className="font-bold text-2xl text-[#333]">
             1
            </Text>
            <TitleTextStyle
              content="Course in progress"
              color="gray"
            />
          </View>
          <View className="w-1/3 h-full flex flex-col">
              <View className="w-14 h-14 items-center bg-[#FFDDD7] flex justify-center rounded-xl"> 
                <Image 
                  source={{uri: "https://img.icons8.com/?size=100&id=59881&format=png&color=FA5252"}}
                  className="w-6 h-6"
                />
              </View>
              <View className="w-full">
                <Text className="text-xl"> </Text>
              </View>
          </View>
        </View>

        <View className="w-[47%] p-2 items-center border-2 flex-row border-gray-300 rounded-xl"> 
          <View className="w-2/3 h-full">
            <Text className="font-bold text-2xl text-[#333]">
             10
            </Text>
            <TitleTextStyle
              content="Lessons Completed"
              color="gray"
            />
          </View>
          <View className="w-1/3 h-full flex flex-col">
              <View className="w-14 h-14 items-center bg-[#E8FFE8] flex justify-center rounded-xl"> 
                <Image 
                  source={{uri: "https://img.icons8.com/?size=100&id=36872&format=png&color=40C057"}}
                  className="w-6 h-6"
                />
              </View>
              <View className="w-full">
                <Text className="text-xl"> </Text>
              </View>
          </View>
        </View>

        <View className="w-[47%] p-2 items-center border-2 flex-row border-gray-300 rounded-xl"> 
          <View className="w-2/3 h-full">
            <Text className="font-bold text-2xl text-[#333]">
             2
            </Text>
            <TitleTextStyle
              content="Target Topic Animate"
              color="gray"
            />
          </View>
          <View className="w-1/3 h-full flex flex-col">
              <View className="w-14 h-14 items-center bg-[#EAEDFF] flex justify-center rounded-xl"> 
                <Image 
                  source={{uri: "https://img.icons8.com/?size=100&id=115265&format=png&color=343b6e"}}
                  className="w-7 h-7"
                />
              </View>
              <View className="w-full">
                <Text className="text-xl"> </Text>
              </View>
          </View>
        </View>

        <View className="w-[47%] p-2 items-center border-2 flex-row border-gray-300 rounded-xl"> 
          <View className="w-2/3 h-full">
            <Text className="font-bold text-2xl text-[#333]">
             5
            </Text>
            <TitleTextStyle
              content="Acheivements"
              color="gray"
            />
          </View>
          <View className="w-1/3 h-full flex flex-col">
              <View className="w-14 h-14 items-center bg-[#FFFADD] flex justify-center rounded-xl"> 
                <Image 
                  source={{uri: "https://img.icons8.com/?size=100&id=UNLUvg9yET4Y&format=png&color=000000"}}
                  className="w-7 h-7"
                />
              </View>
              <View className="w-full">
                <Text className="text-xl"> </Text>
              </View>
          </View>
        </View>
    </View>
  )
}

export default OverviewWidgetCard