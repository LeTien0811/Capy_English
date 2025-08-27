import { AuthContext } from "@/utils/authContext";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

// Định nghĩa interface cho props của CustomButton
interface CustomButtonProps {
  content: string;
  color: string;
  textColor: string;
  onPress?: () => void;
  icon?: keyof typeof FontAwesome.glyphMap; // Sử dụng kiểu dữ liệu cụ thể hơn cho icon
  iconColor?: string;
}

// Một component ButtonStyle được thiết kế lại để linh hoạt hơn
const CustomButton: React.FC<CustomButtonProps> = ({
  content,
  color,
  textColor,
  onPress,
  icon,
  iconColor,
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.button,
      {
        backgroundColor: color,
        opacity: pressed ? 0.7 : 1,
      },
    ]}
  >
    <View style={styles.buttonContent}>
      {icon && (
        <View style={styles.iconWrapper}>
          <FontAwesome name={icon} size={24} color={iconColor} />
        </View>
      )}
      <Text style={[styles.buttonText, { color: textColor }]}>{content}</Text>
    </View>
  </Pressable>
);

export default function Login() {
  const authContext = useContext(AuthContext);
  const handleLogin = async () => {
    const fakeToken = "a-fake-auth-token-12345";
    // Kiểm tra xem authContext và signIn có tồn tại không trước khi gọi
    if (authContext && authContext.signIn) {
      authContext.signIn(fakeToken);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <MaterialCommunityIcons
          name="account"
          size={100}
          color="#333"
        />
        <Text style={styles.logoText}>Capy Star</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          keyboardType="email-address"
           placeholderTextColor="#000000"
          autoCapitalize="none"
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#000000"
          secureTextEntry={true}
        />

        <CustomButton
          content="Continue"
          color="#FF9800"
          textColor="#000000"
          onPress={handleLogin}
        />





        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>or</Text>
          <View style={styles.separatorLine} />
        </View>

        <CustomButton
          content="Continue With Google"
          color="#FFFFFF"
          textColor="#000000"
          icon="google"
          iconColor="#4285F4"
          // onPress là prop tùy chọn, không cần phải có
        />
        <CustomButton
          content="Continue With Facebook"
          color="#FFFFFF"
          textColor="#000000"
          icon="facebook"
          iconColor="#4267B2"
          // onPress là prop tùy chọn, không cần phải có
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F9",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  formContainer: {
    width: "100%",
    gap: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  input: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    fontSize: 16,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#CCC",
    marginHorizontal: 8,
  },
  separatorText: {
    color: "#777",
    fontSize: 14,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  iconWrapper: {
    marginRight: 10,
  },
});
