import { View,Text }  from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import { useRouter } from 'expo-router';

export default function SwapScreen() {
  const bgColor = '#1D1A37'; 
 

  return (
    <SafeAreaView className="flex-1 p-8" style={{ backgroundColor: bgColor}}>
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-2xl font-bold mb-4">Swap Screen</Text>
        <Text >Go to Home Screen</Text>
      </View>
    </SafeAreaView>
  );
}
