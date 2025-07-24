import {  Modal,Text, TextInput, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Platform, Pressable, Alert } from "react-native";
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";



export default function SignupScreen() {
  const router = useRouter();

  // State for form input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);


  // Handle Signup
  const handleSignup = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (/\s/.test(username)) {
    alert("Username should not contain spaces.");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Reset form fields
  setUsername("");
  setEmail("");
  setPassword("");
  setConfirmPassword("");

    // Simulate successful signup
    console.log("User Signed Up:", { username, email });
    setShowSuccess(true);


  };

  return (
    <SafeAreaView className="flex-1 p-0" style={{ backgroundColor: '#1D1A37' }}>
      {/* Back Button */}
      <View className="w-10 h-10 rounded-full items-center justify-center ml-4 mt-4" style={{ backgroundColor: '#1D1A37' }}>
        <Pressable onPress={() => router.push('/emailScreen1')}>
          <Ionicons name="arrow-back" size={24} color="purple" />
        </Pressable>
      </View>

      {/* Center Content */}
      <View className="justify-center items-center">
        <View className="mt-10 mb-10">
          <FontAwesome name="envelope" size={66} color="black" />
        </View>
        <Text className="text-xl font-bold text-white">Make Your Signup</Text>
        <Text className="text-white">Add a wallet with username,</Text>
        <Text className="text-white">email and password</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ marginTop: 30 }}>
          <View className="items-center">
            {/* User Name Field */}
            <View className="space-y-1">
              <Text className="text-gray-500 font-semibold">User Name:</Text>
              <TextInput
                placeholder="Enter name"
                value={username}
                onChangeText={setUsername}
                className="h-[50px] w-[300px] border border-gray-300 rounded-xl px-4 py-2 bg-gray-50"
              />
            </View>

            {/* Email Field */}
            <View className="space-y-1 mt-4">
              <Text className="text-gray-500 font-semibold">Email:</Text>
              <TextInput
                placeholder="Enter email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                className="h-[50px] w-[300px] border border-gray-300 rounded-xl px-4 py-2 bg-gray-50"
              />
            </View>

            {/* Password Field */}
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

            {/* Confirm Password Field */}
            <View className="space-y-1 mt-4">
              <Text className="text-gray-500 font-semibold">Confirm Password:</Text>
              <TextInput
                placeholder="Confirm password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className="h-[50px] w-[300px] border border-gray-300 rounded-xl px-4 py-2 bg-gray-50"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Buttons */}
      <View className="justify-center items-center">
        {/* Signup Button */}
        <TouchableOpacity
          onPress={handleSignup}
          className="w-80 rounded-full overflow-hidden"
        >
          <LinearGradient
            colors={['#2024F2', '#F229D1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="px-10 py-4 items-center"
            style={{ borderRadius: 50 }}
          >
            <Text className="text-white font-bold">Signup</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Navigate to Login */}
        <View className="mt-2 mb-4 flex-row">
          <Text className="text-gray-500">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/loginScreen")}>
            <Text style={{ color: "#234ea2", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

       <Modal
  visible={showSuccess}
  transparent
  animationType="fade">
  <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <View className="bg-[#2c2c2e] rounded-2xl p-6 w-[80%] items-center shadow-lg">
      <Text className="text-3xl mb-2">✅</Text>
      <Text className="text-white text-lg font-bold mb-1">Signup Successful</Text>
      <Text className="text-white text-sm text-center mb-4">Your account has been created successfully!</Text>
      <TouchableOpacity
        onPress={() => {
          setShowSuccess(false);
          router.push("/(tabs)/homeScreen"); // or another screen
        }}
        style={{backgroundColor:"#234ea2", padding: 10, borderRadius: 50, width: '100%', alignItems: 'center'}}
      >
        <Text className="text-white font-semibold" >Continue</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </SafeAreaView>

  
  );
}
