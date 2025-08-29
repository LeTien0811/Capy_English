import InputStyle from "@/components/InputStyle";
import Cart_lesson from "@/components/Lesson/Cart_lesson";
import HeadingTextStyle from "@/components/Text/HeadingTextStyle";
import TitleTextStyle from "@/components/Text/TitleTextStyle";
import useFetchAPI from "@/hooks/handleFetchAPI";
import { topicContext } from "@/libs/type";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [Data, isLoadingData] = useFetchAPI<topicContext[]>("topic/", "");
  const dataToRender = Array.isArray(Data) ? Data : [];
  if (isLoadingData) {
    return (
      <SafeAreaView className="bg-white w-full h-full">
        <View className="w-full h-full px-3 flex flex-wrap flex-col gap-5">
         <Text>Đang Tải</Text>
        </View>
      </SafeAreaView>
    );
  } else{
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
            {dataToRender.map((items) => (
              <Pressable key={items.id}>
                <Cart_lesson id={items.id} name={items.name} />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
  }
  
}
