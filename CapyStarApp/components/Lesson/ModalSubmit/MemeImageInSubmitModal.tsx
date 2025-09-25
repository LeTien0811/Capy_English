import { View, Text, ImageSourcePropType, Image  } from 'react-native'
import React from 'react'

interface MemeImageInSubmitModalType {
  imageMeme: ImageSourcePropType  | null;
}

const MemeImageInSubmitModal = ({imageMeme}:MemeImageInSubmitModalType) => {
  return (
      imageMeme && (
        <Image source={imageMeme} className="w-28 h-32" />
      )
  )
}

export default MemeImageInSubmitModal