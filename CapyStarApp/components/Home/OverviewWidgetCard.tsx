import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import TitleTextStyle from "../Text/TitleTextStyle";
import { useDatabase } from "@/utils/handleLocalStoredContext";
import { Widget } from "@/libs/type";
import { useAuthContext } from "@/utils/authContext";

const OverviewWidgetCard = () => {
  const { getWidgetData, isDbLoading } = useDatabase();
  const { Learner, isAuthLoading } = useAuthContext();
  const [isWidget, setWidget] = useState<Widget | null>(null);
  useEffect(() => {
    const getWidgetFromData = async () => {
      if (!isDbLoading && !isAuthLoading) {
        if (Learner?.id_learners != null) {
          const data = await getWidgetData(Learner?.id_learners);
          if (data != null) {
            setWidget(data);
          } else {
            console.log("Widget is null");
          }
        }
      }
    };
    getWidgetFromData();
  }, [isDbLoading, isAuthLoading]);
  return (
    <View className="w-full flex flex-row flex-wrap gap-3">
      <View className="w-[47%] p-2 items-center border-2 flex-row border-gray-300 rounded-xl">
        <View className="w-2/3 h-full">
          <Text className="font-bold text-2xl text-[#333]">{isWidget?.Level_id}</Text>
          <TitleTextStyle content="Cấp độ hiện tại" color="gray" />
        </View>
        <View className="w-1/3 h-full flex flex-col">
          <View className="w-14 h-14 items-center bg-[#FFDDD7] flex justify-center rounded-xl">
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=59881&format=png&color=FA5252",
              }}
              className="w-6 h-6"
            />
          </View>
          <View className="w-full">
            <Text className="text-xl"> </Text>
          </View>
        </View>
      </View>

      <View className="w-[47%] p-2 items-center border-2 flex-row border-gray-300 rounded-xl">
        <View className="w-2/3 h-full">
          <Text className="font-bold text-2xl text-[#333]">{isWidget?.TOTAL_COMPLETE_LESSION}</Text>
          <TitleTextStyle content="Bài Học Đã Hoàn Thành" color="gray" />
        </View>
        <View className="w-1/3 h-full flex flex-col">
          <View className="w-14 h-14 items-center bg-[#E8FFE8] flex justify-center rounded-xl">
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=36872&format=png&color=40C057",
              }}
              className="w-6 h-6"
            />
          </View>
          <View className="w-full">
            <Text className="text-xl"> </Text>
          </View>
        </View>
      </View>

      <View className="w-[47%] p-2 items-center border-2 flex-row border-gray-300 rounded-xl">
        <View className="w-2/3 h-full">
          <Text className="font-bold text-2xl text-[#333]">{isWidget?.TOTAL_SCORE_FORM_SUCCES_LESSON}</Text>
          <TitleTextStyle content="Điểm trung bình" color="gray" />
        </View>
        <View className="w-1/3 h-full flex flex-col">
          <View className="w-14 h-14 items-center bg-[#EAEDFF] flex justify-center rounded-xl">
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=115265&format=png&color=343b6e",
              }}
              className="w-7 h-7"
            />
          </View>
          <View className="w-full">
            <Text className="text-xl"> </Text>
          </View>
        </View>
      </View>

      <View className="w-[47%] p-2 items-center border-2 flex-row border-gray-300 rounded-xl">
        <View className="w-2/3 h-full">
          <Text className="font-bold text-2xl text-[#333]">{isWidget?.progress_learners}</Text>
          <TitleTextStyle content="Tiến Độ" color="gray" />
        </View>
        <View className="w-1/3 h-full flex flex-col">
          <View className="w-14 h-14 items-center bg-[#FFFADD] flex justify-center rounded-xl">
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=UNLUvg9yET4Y&format=png&color=000000",
              }}
              className="w-7 h-7"
            />
          </View>
          <View className="w-full">
            <Text className="text-xl"> </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OverviewWidgetCard;
