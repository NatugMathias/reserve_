import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function ActivityScreen() {
  const bgColor = '#1D1A37'; 
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);

    // Simulate a "refresh" with a timeout (like fetching new data)
    setTimeout(() => {
      setIsRefreshing(false);
      // You can also update state/data here in real use case
    }, 1500); // 1.5 seconds
  };

  return (
    <SafeAreaView className="flex-1 p-8" style={{ backgroundColor: bgColor }}>
      <View>
        <Text className="text-white text-2xl font-bold">Recent Activity</Text>
      </View>

      <View className="flex-1 justify-center items-center">
        <View>
          <Text className="text-gray-500 text-xl font-bold mb-4">
            {isRefreshing ? 'Refreshing...' : 'No Activity'}
          </Text>
        </View>

        <TouchableOpacity
          className="bg-black pt-2 pb-2 px-4 rounded-full flex-row items-center justify-center"
          onPress={handleRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white">Refresh</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
