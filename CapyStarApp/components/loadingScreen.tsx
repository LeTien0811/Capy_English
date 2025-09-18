import { ActivityIndicator, Text, View } from "react-native";
import React, { useContext } from 'react';

export const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Đang Tải Dữ Liệu .....</Text>
    </View>
  );
};