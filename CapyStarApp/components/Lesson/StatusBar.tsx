import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { transform } from '@babel/core';
import { Rotate } from '@cloudinary/url-gen/actions';
type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const StatusBarView = () => {
    const [isIcon, SetIcon] = useState<IoniconName>("close-outline");
    const LearnerHover = (check: boolean) => {
        if(check) {
            SetIcon("close-sharp");
        } else{
            SetIcon("close-outline");
        }
    }
    useEffect(() => {
        console.log("on hover");
    }, [isIcon])
  return (
    <View className='w-full'>
    <Pressable 
    onPressIn={() => LearnerHover(true)}
    onPressOut={() => LearnerHover(false)}
    >
        <View className='w-12 h-12' >
            <Ionicons name={isIcon} size={30} color="black"  />
        </View>
        
    </Pressable>
    </View>
  )
}

export default StatusBarView