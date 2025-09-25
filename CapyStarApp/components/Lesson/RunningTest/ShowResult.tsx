import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

// Định nghĩa lại kiểu dữ liệu để có thể truyền giá trị undefined
type Result = {
  numberOfQuestion: number;
  score: number;
};

// Kiểu dữ liệu props cho component ShowResult
interface ShowResultProps {
  isResult: Result | undefined;
}

const ShowResult = ({ isResult }: ShowResultProps) => {
  const style = StyleSheet.create({
    boxShadow: {
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        },
        android: {
          elevation: 8,
        },
      })
    }
  });

  if (!isResult) {
    return (
      <View className='w-full h-full flex items-center justify-center bg-[#2B223E]'>
        <Text className='text-lg text-gray-400'>Không có kết quả để hiển thị.</Text>
      </View>
    );
  }

  return (
    <View className='w-screen flex flex-col items-center justify-center p-6 gap-3 bg-[#2B223E]'>
      <View className='flex items-center gap-2'>
        <Text className='text-white text-4xl font-bold'>CAPY STAR</Text>
        <Text className='text-white text-2xl font-bold'>
          Cảm ơn bạn đã làm bài
        </Text>
      </View>
      <View className='flex-row items-center justify-center p-6 gap-3'>
        <Text className=' border-2 bg-white p-5 rounded-xl font-semibold'>Số Câu: {isResult.numberOfQuestion}</Text>
      <Text className='border-2 bg-white p-5 rounded-xl font-semibold'>Điểm:{isResult.score.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default ShowResult;