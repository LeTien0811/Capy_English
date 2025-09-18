import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import React from "react";
import { NewsItem } from "@/libs/type";
import { Cloudinary } from "@cloudinary/url-gen";
const { width } = Dimensions.get("window");
const style = StyleSheet.create({
  boxWithShadows: {
    width: width - 25,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

const NewsCards = ({ NewsItem }: { NewsItem: NewsItem }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dsrrik0wb",
    },
  });
  return (
    <TouchableOpacity
      className="h-[370px] flex flex-col gap-4 bg-white items-center p-2 rounded-xl relative"
      style={style.boxWithShadows}
    >
      <Image
        source={{ uri: cld.image(NewsItem.image).toURL() }}
        style={{ width: width - 35, resizeMode: "contain" }}
        className="h-[200px] rounded-2xl" // ảnh cao cố định
      />
        <View className="w-full">
          <Text className="indent-8 line-clamp-2 font-bold text-black text-2xl">
          {NewsItem.heading}
          </Text>
        </View>

      <View className="w-full flex flex-col gap-3 absolute bottom-0 p-2">
        <Text className="font-bold text-lg">{NewsItem.newspaper}</Text>
        <View className="w-full flex flex-row justify-between">
          <View className="flex flex-row gap-2 items-center">
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=85028&format=png&color=000000",
              }}
              className="w-6 h-6"
            />
            <Text>{NewsItem.views}</Text>
          </View>
          <Text>{NewsItem.DateUploads.toDateString()}</Text>
        </View>
      </View>
    
    </TouchableOpacity>
  );
};

export default NewsCards;
