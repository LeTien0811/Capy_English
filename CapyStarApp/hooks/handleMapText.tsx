import { View, Text } from 'react-native'
import React from 'react'

const handleMapText = (text: string | null) => {
    if(text === null ) return null;
    return text.split(/[\s,."'?;:!]+/).filter(Boolean);
}
export default handleMapText