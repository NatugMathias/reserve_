import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";



export default function LoginScreen() {
  const router = useRouter();

  // State for inputs
  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Success modal state
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogin = () => {
    //  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username || !password) {
    alert("Please fill in all fields.");
    return;
  }

  if (/\s/.test(username)) {
    alert("Username should not contain spaces.");
    return;
  }

  // if (!emailRegex.test(email)) {
  //   alert("Please enter a valid email address.");
  //   return;
  // }

  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }


    // Simulate login
    setUsername("");
    // setEmail("");
    setPassword("");
    setShowSuccess(true);
  };

  return (
    <SafeAreaView className="flex-1 p-0" style={{ backgroundColor: "#1D1A37" }}>
      {/* Back Button */}
      <View className="w-10 h-10 rounded-full items-center justify-center ml-4 mt-4">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="purple" />
        </Pressable>
      </View>

      {/* Header */}
      <View className="justify-center items-center">
        <View className="mt-20 mb-20">
          <FontAwesome name="envelope" size={66} color="black" />
        </View>
        <Text className="text-xl font-bold text-white">Make Your Login </Text>
        <Text className="text-white">Login with your username and</Text>
        <Text className="text-white">password</Text>
      </View>

      {/* Input Form */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView className="mt-6">
          <View className="items-center">
            {/* Username */}
            <View className="space-y-1">
              <Text className="text-gray-500 font-semibold">User Name:</Text>
              <TextInput
                placeholder="Enter name"
                value={username}
                onChangeText={setUsername}
                className="h-[50px] w-[300px] border border-gray-300 rounded-xl px-4 py-2 bg-gray-50"
              />
            </View>

            {/* Email */}
            {/* <View className="space-y-1 mt-4">
              <Text className="text-gray-500 font-semibold">Email:</Text>
              <TextInput
                placeholder="Enter email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                className="h-[50px] w-[300px] border border-gray-300 rounded-xl px-4 py-2 bg-gray-50"
              />
            </View> */}

            {/* Password */}
            <View className="space-y-1 mt-4">
              <Text className="text-gray-500 font-semibold">Password:</Text>
              <TextInput
                placeholder="Enter password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="h-[50px] w-[300px] border border-gray-300 rounded-xl px-4 py-2 bg-gray-50"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="flex:1"/>

      {/* Login Button */}
      <View className="justify-center items-center mt-10 mb-4">
        <TouchableOpacity className="w-80" onPress={handleLogin}>
          <LinearGradient
            colors={["#2024F2", "#F229D1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="px-10 py-4"
            style={{ alignItems: "center", borderRadius: 50 }}
          >
            <Text className="text-white font-bold">Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Signup Redirect */}
        <View className="mt-2 flex-row">
          <Text className="text-gray-500">Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/signupScreen")}>
            <Text style={{ color: "#234ea2", fontWeight: "bold" }}> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ✅ Custom Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View className="flex-1 justify-center items-center " style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className="bg-[#2c2c2e] rounded-2xl p-6 w-[80%] items-center shadow-lg">
            <Text className="text-3xl mb-2">✅</Text>
            <Text className="text-white text-lg font-bold mb-1">
              Login Successful
            </Text>
            <Text className="text-white text-sm text-center mb-4">
              You have successfully logged in.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowSuccess(false);
                router.replace("/(tabs)/homeScreen"); // navigate to home
              }}
               style={{backgroundColor:"#234ea2", padding: 10, borderRadius: 50, width: '100%', alignItems: 'center'}}
            >
              <Text className="text-white font-semibold">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
