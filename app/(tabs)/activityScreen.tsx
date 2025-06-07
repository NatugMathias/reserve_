import {Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBackgroundColor } from '../context/BackgroundColorContext';
// import { Link } from 'expo-router'; 


export default function ActivityScreen() {
  const { bgColor, setBgColor } = useBackgroundColor();

  return (
    <SafeAreaView className="flex-1 p-8" style={{ backgroundColor: bgColor}}>
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-2xl font-bold mb-4">Activity Screen</Text>
        <Text className="text-blue-500">Go to Home Screen</Text>
      </View>
    </SafeAreaView>
  );
}