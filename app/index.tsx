import { useRouter } from "expo-router";
import { Text, View, SafeAreaView, Image, TouchableOpacity, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#1D1A37]">
     
      <Image
        source={require('../assets/images/only.png')}
        style={{ width: 150, height: 150, marginBottom: 30 }}
      />

    
      <View className="items-center">
        <Text className="font-bold mb-4 text-2xl text-white">Welcome to CoinVault</Text>
        <Text className="text-white">To get started, create a new wallet or</Text>
        <Text className="text-white">login into an existing one</Text>
      </View>

      
      <TouchableOpacity onPress={() => router.push('/emailScreen1')} className="w-4/5 mt-20 rounded-full overflow-hidden">
        <LinearGradient
          colors={['#2024F2', '#F229D1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="px-10 py-4 items-center rounded-full"
        >
          <Text className="text-white font-bold">Create a new wallet</Text>
        </LinearGradient>
      </TouchableOpacity>

     
      <TouchableOpacity
        onPress={() => router.push('/emailScreen2')}
        className="w-4/5 mt-5 items-center bg-[#303034] rounded-full px-10 py-4">
        <Text className="text-white font-bold">I already have a wallet</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
