// 

import { Link } from "expo-router";
import { Text, View, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#1D1A37]">
      <Image source={require('../assets/images/folder.png')} style={{ width: 150, height: 150, marginBottom: 30 }} />
      
      <View className="items-center">
        <Text className="font-bold mb-4 text-2xl text-white">Welcome to CoinVault</Text>
        <Text className="text-white">To get started, create a new wallet or</Text>
        <Text className="text-white">login into an existing one</Text>
      </View>

      <TouchableOpacity className="w-4/5 mt-20 rounded-full overflow-hidden">
        <LinearGradient
          colors={['#2024F2', '#F229D1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="px-10 py-4 items-center rounded-full"
        >
          <Link href="/emailScreen1" className="text-violet-950 font-bold">Create a new wallet</Link>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity className="w-4/5 mt-5 items-center bg-[#303034] rounded-full px-10 py-4">
        <Link href="/emailScreen2" className="text-white font-bold">I already have a wallet</Link>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
