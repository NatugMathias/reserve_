import {Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBackgroundColor } from '../context/BackgroundColorContext';



export default function ProfileScreen() {
  const { bgColor, setBgColor } = useBackgroundColor();
  return (
    <SafeAreaView className="flex-1 p-8" style={{ backgroundColor: bgColor}}>
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-2xl font-bold mb-4">Search Screen</Text>
      </View>
    </SafeAreaView>
  );
}