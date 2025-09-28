import InputStyle from "@/components/InputStyle";
import Cart_lesson from "@/components/Lesson/Cart_lesson";
import HeadingTextStyle from "@/components/Text/HeadingTextStyle";
import TitleTextStyle from "@/components/Text/TitleTextStyle";
import { course, Lesson_Group, Lessons } from "@/libs/type";
import { useAuthContext } from "@/utils/authContext";
import { useDatabase } from "@/utils/handleLocalStoredContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { Learner, isAuthLoading } = useAuthContext();
  const {
    isDbLoading,
    getCourse,
    getLesson,
    getLessonGroup,
    resetDatabaseForTesting,
  } = useDatabase();
  const [isLesson, setLesson] = useState<Lessons[]>([]);
  const [isLessonGroup, setLessonGroup] = useState<Lesson_Group[]>([]);
  useEffect(() => {
    const boost = async () => {
      if (!isDbLoading && !isAuthLoading) {
        const [lessons, groups] = await Promise.all([
          getLesson(),
          getLessonGroup(),
        ]);
        // console.log("Fetched course:", course);
        // console.log("Fetched lessons:", lessons);
        // console.log("Fetched groups:", groups);
        setLesson(lessons ?? []);
        setLessonGroup(groups ?? []);
      }
    };
    boost();
  }, [isAuthLoading, isDbLoading]);

  if (isAuthLoading && isDbLoading) {
    return (
      <SafeAreaView className="bg-white w-full h-full">
        <View className="w-full h-full px-3 flex flex-wrap flex-col gap-5">
          <Text>Đang Tải</Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={true} pagingEnabled>
          {Array.isArray(isLessonGroup) &&
            Array.isArray(isLesson) &&
            isLessonGroup.map((itemGroup) => {
              const lessonsInGroup = isLesson.filter(
                (item) => item.Lesson_Group_id === itemGroup.id_group
              );
              return (
                <Cart_lesson
                  key={itemGroup.id_group}
                  Lesson={lessonsInGroup}
                  LessonGroup={itemGroup}
                />
              );
            })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
