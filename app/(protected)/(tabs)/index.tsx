import { Image } from "expo-image";
import { HelloWave } from "@/components/systerm/HelloWave";
import ParallaxScrollView from "@/components/systerm/ParallaxScrollView";
import { ThemedText } from "@/components/systerm/ThemedText";
import { ThemedView } from "@/components/systerm/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import HeadingTextStyle from "@/components/Text/HeadingTextStyle";
import TitleTextStyle from "@/components/Text/TitleTextStyle";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import InputStyle from "@/components/InputStyle";
import Cart_lesson from "@/components/Cart_lesson";
import {
  Platform,
  Pressable,
  SafeAreaViewComponent,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const CartList = [
  { topicId: 1, topicName: "Daily Communication" },
  { topicId: 2, topicName: "Travel" },
  { topicId: 3, topicName: "Food" },
  { topicId: 4, topicName: "Work and Careers" },
  { topicId: 5, topicName: "Health" },
  { topicId: 6, topicName: "Education" },
  { topicId: 7, topicName: "Entertainment and Movies" },
  { topicId: 8, topicName: "Family and Friends" },
  { topicId: 9, topicName: "Weather" },
  { topicId: 10, topicName: "Shopping" },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-white w-full h-full p-4 flex flex-wrap flex-col gap-5">
      <HeadingTextStyle content="Lessons" />
      <TitleTextStyle
        content="Keep track of your current and completed lessons."
        color="gray"
      />

      <View className="w-full flex flex-row items-center justify-between gap-2">
        <View className="w-[300] flex flex-row items-center px-2 gap-2 rounded-2xl bg-[#DFDFDF] ">
          <MaterialIcons name="search" size={24} color="black" />
          <InputStyle content="Search" isBorder={false} />
        </View>
        <Pressable className="border-gray-500 border-2 p-2 rounded-xl">
          <MaterialIcons name="filter-list" size={24} color="black" />
        </Pressable>
      </View>

      <ScrollView 
      className="">
        {CartList.map((items) => (
          <TouchableOpacity key={items.topicId}>
            <Cart_lesson topicId={items.topicId} topicName={items.topicName} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
