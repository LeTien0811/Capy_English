import { AuthContext } from '@/utils/authContext'
import { HeaderShownContext } from '@react-navigation/elements';
import { Redirect, Stack } from 'expo-router'
import React, { useContext } from 'react'

export default function ProtectedLayout() {
    const { isLogin, isLoading } = useContext(AuthContext);
    if(!isLogin){
        return <Redirect href="/authentications" />;
    }
  return (
    <Stack>
        <Stack.Screen 
        name='(tabs)'
        options={{
            headerShown: false
        }}
        />
    </Stack>
  )
}
