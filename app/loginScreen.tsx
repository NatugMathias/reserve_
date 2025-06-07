// 





import { Text, View, SafeAreaView, TouchableOpacity, Pressable } from "react-native";
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';


export default function LoginScreen() {
  const router = useRouter();
  return (
<SafeAreaView className="flex-1 p-8" style={{backgroundColor: '#1D1A37'}}>
   
      <View className=" w-10 h-10 rounded-full items-center justify-center" style={{backgroundColor: '#1D1A37'}}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="purple" />
        </Pressable>
      </View>
    
    <View className="justify-center items-center">
      <View className="mt-20 mb-20"><FontAwesome name="envelope" size={66} color="black" /></View>
      <View><Text className="text-xl font-bold text-white">Select Your Email</Text></View>
      <View><Text className="text-white">Login with your Apple or</Text></View>
      <View><Text className="text-white">Google account</Text></View>
    </View>
    <View className="justify-center items-center mt-10">
     
      <TouchableOpacity className="w-80" onPress={() => router.replace('/(tabs)/homeScreen')}>
        <LinearGradient colors={['#2024F2', '#F229D1']} start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }} className="px-10 py-4"  style={{alignItems: 'center', borderRadius:50}}><Text className="text-white font-bold">Continue with Google</Text></LinearGradient>
      </TouchableOpacity>
      

      <View className="mt-5 mb-5"><Text className="text-white">or</Text></View>
     
      <TouchableOpacity className="w-80"> 
        <LinearGradient colors={['#2024F2', '#F229D1']} start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }} className="px-10 py-4"  style={{alignItems: 'center', borderRadius:50}}><Text className="text-white font-bold">Continue with Apple</Text></LinearGradient>
      </TouchableOpacity>
     
    </View>
</SafeAreaView>
  );
}
