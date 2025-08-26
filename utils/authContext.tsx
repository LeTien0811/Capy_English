import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

// Định nghĩa kiểu dữ liệu cho AuthContext
export type AuthState = {
  isLogin: boolean;
  isLoading: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
};

// Khởi tạo Context với giá trị mặc định
export const AuthContext = createContext<AuthState>({
  isLogin: false,
  isLoading: true, // Đặt mặc định là true để chờ tải trạng thái
  signIn: () => null,
  signOut: () => null,
});

const authStorageKey = "auth-session";

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Hàm để lưu session vào AsyncStorage
  const storeAuthSession = async (token: string | null) => {
    try {
      if (token) {
        await AsyncStorage.setItem(authStorageKey, token);
      } else {
        await AsyncStorage.removeItem(authStorageKey);
      }
    } catch (error) {
      console.error("Error storing auth session", error);
    }
  };

  const signIn = async (token: string) => {
    await storeAuthSession(token);
    setIsLogin(true);
  };

  const signOut = async () => {
    await storeAuthSession(null);
    setIsLogin(false);
  };

  // useEffect để tải trạng thái từ AsyncStorage khi app khởi động
  useEffect(() => {
    const getAuthFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(authStorageKey);
        if (value !== null) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        console.error("Error fetching from storage", error);
      } finally {
        setIsLoading(false); 
        SplashScreen.hideAsync(); 
      }
    };
    getAuthFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}