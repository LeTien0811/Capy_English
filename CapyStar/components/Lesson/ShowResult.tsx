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
  // Styles động để tạo bóng đổ đẹp mắt cho cả iOS và Android
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

  // Kiểm tra an toàn để đảm bảo isResult có giá trị trước khi truy cập
  if (!isResult) {
    return (
      <View className='w-full h-full flex items-center justify-center bg-[#2B223E]'>
        <Text className='text-lg text-gray-400'>Không có kết quả để hiển thị.</Text>
      </View>
    );
  }

  return (
    <View className='w-screen h-full flex flex-col items-center justify-center p-6' style={styles.container}>
      {/* Tiêu đề lớn */}
      <Text style={styles.mainTitle}>
        <Text style={styles.titleQuik}>Capy</Text>
        <Text style={styles.titleQuiz}>Englsih Complete!</Text>
      </Text>

      {/* Phần mô tả */}
      <Text style={styles.description}>
        Thank you for completing the quiz! Here are your results:
      </Text>

      {/* Hiển thị điểm số và số câu hỏi - tạm thời thay thế bằng text */}
      
        <View className='flex flex-row items-center justify-center w-full gap-4'>
          <View style={style.boxShadow} className='flex-1 p-6 bg-white rounded-xl items-center justify-center border-2 border-gray-200'>
            <Text className='font-bold text-lg text-gray-500 mb-1'>Số câu hỏi</Text>
            <Text className='font-extrabold text-5xl text-blue-600'>{isResult.numberOfQuestion}</Text>
          </View>
          <View style={style.boxShadow} className='flex-1 p-6 bg-white rounded-xl items-center justify-center border-2 border-gray-200'>
            <Text className='font-bold text-lg text-gray-500 mb-1'>Điểm số</Text>
            <Text className='font-extrabold text-5xl text-purple-600'>{isResult.score}</Text>
          </View>
        </View>
      
    </View>
  );
};

// Sử dụng StyleSheet.create để tối ưu hóa hiệu suất
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B223E', // Màu nền tím đậm
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  titleQuik: {
    color: '#8A2BE2', // Màu tím
  },
  titleQuiz: {
    color: '#E0E0E0', // Màu trắng xám
  },
  description: {
    fontSize: 16,
    color: '#C0C0C0', // Màu xám nhạt
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    maxWidth: 500,
  },
});

export default ShowResult;