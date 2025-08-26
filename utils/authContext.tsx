import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

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
  isLoading: false,
  signIn: () => null,
  signOut: () => null,
});

const authStorageKey = "auth-session";

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLogin, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect để tải trạng thái từ AsyncStorage khi app khởi động
 useEffect(() => {
    const getAuthFromStorage = async () => {
      // simulate a delay, e.g. for an API request
      await new Promise((res) => setTimeout(() => res(null), 1000));
      try {
        const value = await AsyncStorage.getItem(authStorageKey);
        if (value !== null) {
          const auth = JSON.parse(value);
          setIsLoggedIn(auth.isLoggedIn);
        }
      } catch (error) {
        console.log("Error fetching from storage", error);
      }
      setIsLoading(true);
    };
    getAuthFromStorage();
  }, []);

  useEffect(() => {
    if (isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  const signIn = () => {
    setIsLoggedIn(true)
  };

  const signOut = async () => {
    setIsLoggedIn(false)
  };

  return (
    <AuthContext.Provider value={{ isLogin, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}