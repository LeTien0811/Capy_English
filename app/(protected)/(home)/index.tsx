import InputStyle from "@/components/InputStyle";
import Cart_lesson from "@/components/Lesson/Cart_lesson";
import HeadingTextStyle from "@/components/Text/HeadingTextStyle";
import TitleTextStyle from "@/components/Text/TitleTextStyle";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Pressable,
  ScrollView,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CartList = [
  { topicId: 1, topicName: "Đường Xá" },
  { topicId: 2, topicName: "Ẩm thực" },
  { topicId: 3, topicName: "Rau củ quả" },
  { topicId: 4, topicName: "Quần Áo" },
  { topicId: 5, topicName: "Toán học" },
  { topicId: 6, topicName: "Môi trường" },
  { topicId: 7, topicName: "Con người" },
  { topicId: 8, topicName: "Ngôn ngữ" },
  { topicId: 9, topicName: "Động vật" },
  { topicId: 10, topicName: "Gia đình" },
  { topicId: 11, topicName: "Màu sắc" },
  { topicId: 12, topicName: "Cảm xúc" },
  { topicId: 13, topicName: "Mua sắm" },
];


export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-white w-full h-full">
      <View className="w-full h-full px-3 flex flex-wrap flex-col gap-5">
        <View className="w-full flex justify-center items-center">
          <HeadingTextStyle content="Lesson" />
          <TitleTextStyle
            content="Keep track of your current and completed lessons."
            color="green"
          />
        </View>

        <View className="w-full flex flex-row items-center justify-between gap-2">
          <View className="w-[300] flex flex-1 flex-row items-center px-2 gap-2 rounded-2xl bg-[#DFDFDF] ">
            <MaterialIcons name="search" size={24} color="black" />
            <InputStyle content="Search" isBorder={false} />
          </View>
          <Pressable className="border-gray-500 border-2 p-2 rounded-xl">
            <MaterialIcons name="filter-list" size={24} color="black" />
          </Pressable>
        </View>

        <View className="flex-1 h-full">
          <ScrollView className="" showsVerticalScrollIndicator={false}>
            {CartList.map((items) => (
              <Pressable key={items.topicId}>
                <Cart_lesson
                  topicId={items.topicId}
                  topicName={items.topicName}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
