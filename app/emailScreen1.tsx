import { Text, View, SafeAreaView,TouchableOpacity, Pressable, Image } from "react-native";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from "react-native-safe-area-context";




export default function EmailScreen1() {
const router = useRouter();

  return (
    //SafeAreaProvider is not needed here as we are not using it in this screen
    <SafeAreaView className="flex-1 p-8 bg-[#1D1A37]" >
    
      <View className=" w-10 h-10 rounded-full items-center justify-center bg-[#1D1A37]">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="purple" />
        </Pressable>
      </View>
      

      <View className="mt-10 mb-14 items-center"><Image source={require('../assets/images/folder (1).png')} style={{width: 100, height: 100}} /></View>
      
      <View className="justify-center items-center"><Text className="text-white text-2xl">Add a Wallet</Text></View>
      <View className="flex-row gap-2 mt-14">
        <View><Feather name="pen-tool" size={24} color="blue" /></View>
        <View>
          <Text className="text-white font-bold">Seamless setup</Text>
          <Text className="text-gray-500">Create a new wallet using Google or Apple</Text>
          <Text className="text-gray-500">account and explore web3 with ease</Text>
        </View>
      </View>
        
      <View className="flex-row mt-12 gap-4">
        <View><FontAwesome name="lock" size={25} color="green" /></View>
        <View>
          <Text className="text-white font-bold">Enhanced security</Text>
          <Text className="text-gray-500">Your wallet is store securely and</Text>
          <Text className="text-gray-500">decentralised across multiple factors</Text>
        </View>
      </View>

      <View className="flex-row mt-12 gap-2">
        <View><FontAwesome name="heartbeat" size={24} color="red" /></View>
        <View>
          <Text className="text-white font-bold">Easy recovery</Text>
          <Text className="text-gray-500">Recover access to you wallet with your</Text>
          <Text className="text-gray-500">Google or Apple account</Text>
        </View>
      </View>

      <TouchableOpacity className="flex-1 justify-end" onPress={() => router.push('/signupScreen')}>
        <LinearGradient colors={['#2024F2', '#F229D1']} start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}  className="bg-white rounded-full px-10 py-4" style={{alignItems: 'center',borderRadius:50}} >
          <Text>Continue with Email</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}






