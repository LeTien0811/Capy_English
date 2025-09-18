import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  Alert,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import InputStyle from "@/components/InputStyle";
import ButtonStyle from "@/components/ButtonStyle";
import { useLogin } from "@/hooks/handleFetchAPI";
import { useDatabase } from "@/utils/handleLocalStoredContext";
import { useAuthContext } from "@/utils/authContext";

export default function ModalInputName() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [iconExit, seticonExit] = useState(
    "https://img.icons8.com/?size=100&id=22107&format=png&color=000000"
  );
  let CheckIsIconExit = true;
  const changeIconExit = () => {
    if (CheckIsIconExit) {
      seticonExit(
        "https://img.icons8.com/?size=100&id=LRNHSg8YnQRx&format=png&color=000000"
      );
      CheckIsIconExit = false;
    } else {
      seticonExit(
        "https://img.icons8.com/?size=100&id=22107&format=png&color=000000"
      );
      CheckIsIconExit = true;
    }
  };

  const [WaitRegister, setWaitRegister] = useState(false);

  const spinValue = useState(new Animated.Value(0))[0];
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    let animation: any;
   
    if(WaitRegister){
      animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1, // xoay từ 0 đến 1
        duration: 3000, // thời gian xoay
        easing: Easing.linear, // sử dụng hàm chuyển động
        useNativeDriver: true, // sử dụng drive gốc
      })
    ).start();
    } 
    return () => {
      if(animation) {
        animation.stop;
      }
    };

  }, [setWaitRegister]);

  const {RegisterLearner, isDbLoading, resetDatabaseForTesting} = useDatabase()
   const {
      Learner,
      isAuthLoading,
      signIn,
      Register,
    } = useAuthContext();
  const HandleRegister = async () => {
    if (isDbLoading) {
      Alert.alert("Lỗi", "Cơ sở dữ liệu đang tải, vui lòng đợi.");
      return;
    }
    try {
      setWaitRegister(true);
      const result = await useLogin("", "", name, true);
      Alert.alert(
        "Thành công",
        "Đăng nhập thành công! Dữ liệu: " + JSON.stringify(result)
      );
      const RegisterWithLocal = await RegisterLearner(result.id_learners, result.full_name, result.created_at);
      if(RegisterWithLocal) {
        const register = await Register(result.id_learners, "", "", "", result.full_name, result.created_at);
        if(register) {
          router.push({pathname: "/"});
        } else{
          Alert.alert("Lỗi Mẹ Nó Rồi", "dcu");    
        }
      }
      setTimeout(() => {
        setWaitRegister(false);
      }, 5000);
    } catch (error: any) {
      setWaitRegister(false);
      Alert.alert("Lỗi Mẹ Nó Rồi", "Mày đang bị lỗi này nè: " + error.message);
    } finally {
      setWaitRegister(false);
    }
  };

  return (
    <Pressable
      className="w-full h-full items-center justify-center"
      // onPress={() => router.back()}
    >
      <View className="bg-white py-6 px-5 flex gap-5 border-2 rounded-xl relative">
        <Pressable
          onHoverIn={() => changeIconExit()}
          onHoverOut={() => changeIconExit()}
          onPress={() => router.back()}
          className="absolute right-1 top-0"
        >
          <Image
            source={{
              uri: iconExit,
            }}
            className="w-6 h-6"
          />
        </Pressable>
        <TextInput
          className="px-2 outline-none py-2 border-2 border-gray-500 rounded-xl"
          placeholder="Nhập Tên Vào Đây"
          value={name}
          onChangeText={setName}
        />
        {WaitRegister || isDbLoading ? (
          <Pressable className="h-[59] px-5 border-2 rounded-xl flex justify-center">
            <Animated.Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=undefined&format=png&color=000000",
              }}
              className="w-6 h-6 "
              style={{
                // Áp dụng transform rotate vào style
                transform: [{ rotate: spin }],
              }}
            />
          </Pressable>
        ) : (
          <ButtonStyle
            content="Xong!"
            color="#333"
            textColor="white"
            onPress={() => HandleRegister()}
            align_items="center"
            key={1}/>
        )}
        
        <ButtonStyle
            content="Thiên Hạ Thái Bình Quất Thới Giân An!"
            color="#333"
            textColor="white"
            onPress={async() => await resetDatabaseForTesting()}
            align_items="center"
            key={2}
          />
        
      </View>
    </Pressable>
  );
}
