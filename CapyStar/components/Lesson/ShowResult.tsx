import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import ButtonStyle from "../ButtonStyle";
import { useRouter } from "expo-router";

type Result = {
  numberOfQuestion: number;
  score: number;
};

const ShowResult = ({ isResult }: { isResult: Result }) => {
  const router = useRouter();
  const style = StyleSheet.create({
    boxShadow: {
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 5, height: 5 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
        },
        android: {
          elevation: 7,
        },
      }),
    },
    wrapper: {
      padding: 2, // Đây là độ dày của đường viền gradient
      borderRadius: 10,
    },
    innerView: {
      backgroundColor: "white", // Màu nền của component
      borderRadius: 8,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const borderScore =
    isResult.score < 5
      ? { borderWidth: 3, borderColor: "red" }
      : isResult.score >= 5 && isResult.score < 7
        ? { borderWidth: 3, borderTopColor: "blue", borderLeftColor: "blue" }
        : isResult.score >= 7 && isResult.score < 8
          ? {
              borderLeftWidth: 3,
              borderTopWidth: 3,
              borderRightWidth: 3,
              borderLeftColor: "red",
            }
          : {
              borderLeftWidth: 3,
              borderTopWidth: 3,
              borderRightWidth: 3,
              borderBottomWidth: 3,
              borderLeftColor: "red",
            };

  return (
    <View className="w-screen h-full flex gap-20 relative items-center">
      <View
        style={style.boxShadow}
        className="w-full p-2 py-10 bg-white items-start"
      >
        <Text className="font-bold text-2xl">Lesson complete</Text>
        <Text className="font-bold text-gray-600 text-md">
          Well done! Keep up the good work
        </Text>
      </View>
      <View className="w-[300] h-[300] border-2 border-gray-400 items-center flex gap-4 justify-center">
        <View>
            <Text>Số Bài làm:  {isResult.numberOfQuestion}</Text>
        </View>
          <View
            style={borderScore}
            className="rounded-full items-center justify-center w-[150] h-[150]"
          >
            <Text className="font-bold text-2xl">{isResult.score}</Text>
            <Text>Cố Gắng Thêm Nhé</Text>
          </View>
      </View>
      <ButtonStyle 
        content="Continue"
        color=""
        textColor="white"
        onPress={() => router.push("/(protected)/(home)")}
      />
    </View>
  );
};

export default ShowResult;
