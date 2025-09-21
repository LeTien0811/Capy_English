import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaViewBase,
} from "react-native";
import React from "react";
import ButtonStyle from "@/components/ButtonStyle";
import { router, useRouter } from "expo-router";
import { useDatabase } from "@/utils/handleLocalStoredContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "@/utils/authContext";
import { LoadingScreen } from "@/components/loadingScreen";
import HeadingTextStyle from "@/components/Text/HeadingTextStyle";
import TitleTextStyle from "@/components/Text/TitleTextStyle";
import OverviewWidgetCard from "@/components/Home/OverviewWidgetCard";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { NewsList } from "@/libs/type";
import NewsCards from "@/components/Home/NewsCards";

const newsData: NewsList[] = [
  {
    Category: "Technology",
    NewsItems: [
      {
        heading: "New Smartphone Launch",
        content:
          "Tech giant announces a new flagship phone with advanced AI features.",
        newspaper: "The Daily Gadget",
        DateUploads: new Date("2025-09-01"),
        image: "e9kwp4nwoxygjbwictt7",
        views: 1500,
      },
      {
        heading: "Breakthrough in Quantum Computing",
        content:
          "Scientists achieve a major milestone in developing a stable quantum chip.",
        newspaper: "Future Tech Journal",
        DateUploads: new Date("2025-08-28"),
        image: "fbv6qotjwlnjbqqtuizy",
        views: 2200,
      },
    ],
  },
  {
    Category: "Science",
    NewsItems: [
      {
        heading: "Discovery of New Planet",
        content:
          "Astronomers find a new exoplanet with conditions that could support life.",
        newspaper: "Cosmic Times",
        DateUploads: new Date("2025-09-03"),
        image: "kiqf9fgqsk1vdr96metn",
        views: 3100,
      },
      {
        heading: "Medical AI Predicts Disease",
        content:
          "An artificial intelligence model can now predict certain diseases with high accuracy.",
        newspaper: "Health News Today",
        DateUploads: new Date("2025-09-02"),
        image: "ba0bk4k2erpa4wfuod2z",
        views: 1850,
      },
    ],
  },
  {
    Category: "Business",
    NewsItems: [
      {
        heading: "Global Market Trends",
        content:
          "Analysts report significant changes in consumer spending habits worldwide.",
        newspaper: "Wall Street Chronicle",
        DateUploads: new Date("2025-09-04"),
        image: "bvnkmqeirb1fz3sqxezj",
        views: 4500,
      },
      {
        heading: "Startup Receives Record Funding",
        content:
          "A new company focused on clean energy secures a massive investment round.",
        newspaper: "Venture Weekly",
        DateUploads: new Date("2025-09-01"),
        image: "ba0bk4k2erpa4wfuod2z",
        views: 2900,
      },
    ],
  },
];

export default function Index() {
  const tabBarHeight = useBottomTabBarHeight();
  const router = useRouter();

  const { resetDatabaseForTesting } = useDatabase();
  const { Learner } = useAuthContext();
  const hanldeClickGo = () => {
    router.push("/(protected)/(lesson)");
  };
  return (
    <SafeAreaView className="flex-1 p-2 w-full h-full bg-white">
      <View className="w-full flex flex-row mb-2 items-center justify-between">
        <Text className="font-bold text-xl">Hi {Learner?.full_name}!</Text>
        <TouchableOpacity className="w-14 h-14 border-2 border-gray-300 rounded-xl items-center flex justify-center">
          <Image
            source={{
              uri: "https://img.icons8.com/?size=100&id=849XkTbsgJDo&format=png&color=343b6e",
            }}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>

      <View className="w-full mb-8">
        <OverviewWidgetCard />
      </View>

      <View className="w-full flex flex-col gap-6">
        <View className="w-full flex flex-col mb-2">
          <Text className="text-3xl font-bold ">News</Text>
          <TitleTextStyle
            content="this is a news for learning english people!"
            color="gray"
          />
        </View>
        <View className="w-full">
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled
          >
            {newsData.map((newslist) =>
              newslist.NewsItems.map((item, index) => (
                  <View key={index} className="px-1 py-3">
                    <NewsCards key={index} NewsItem={item} />
                  </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
