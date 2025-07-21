import { Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { transactionLogs, clearTransactionLogs } from '../transactions';
import { useTheme } from "../context/themeContext";
 // Adjust the path if needed
import moment from 'moment'; // For time display

export default function ActivityScreen() {
  // const bgColor = '#1D1A37'; 
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { backgroundColor } = useTheme();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // In real use, you'd re-fetch or update transactionLogs here
    }, 1500);
  };

  const [_, forceUpdate] = useState(0);

const handleClear = () => {
  clearTransactionLogs();
  forceUpdate((n) => n + 1); // Triggers a re-render to show it's empty
};


  return (
    <SafeAreaView className="flex-1 p-8" style={{ backgroundColor }}>
      <View>
        <Text className="text-white text-2xl font-bold">Recent Activity</Text>
      </View>

      {/* Transaction List */}
      <ScrollView className="flex-1 mt-6">
        {transactionLogs.length === 0 ? (
          <View className="flex-1 justify-center items-center mt-20">
            <Text className="text-gray-500 text-xl font-bold mb-4">
              {isRefreshing ? 'Refreshing...' : 'No Activity'}
            </Text>
          </View>
        ) : (
          transactionLogs.map((tx, index) => (
            <View
              key={index}
              className="mb-4 p-4 rounded-2xl"
              style={{ backgroundColor: "rgba(242, 242, 242, 0.1)", }}
            >
              {/* <Text className="text-white text-base font-semibold mb-1">
                Sent {tx.amount} {tx.symbol}
              </Text> */}
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {tx.type === 'buy' ? 'Bought' : tx.type === 'send' ? 'Sent' : 'Received'} {tx.amount} {tx.symbol}
              </Text>


              <Text className="text-gray-400 text-sm">To: {tx.account}</Text>
              <Text className="text-gray-400 text-sm mb-1">Address: {tx.address}</Text>
              <Text className="text-gray-500 text-xs">
                {moment(tx.timestamp).fromNow()}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Refresh Button */}
      <View className="items-center mt-4 mb-20">
        <TouchableOpacity
          style={{ backgroundColor: '#9a9a9a', padding: 10, borderRadius: 30 }}
          className="flex-row items-center justify-center"
          onPress={handleRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-bold">Refresh</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
  style={{ backgroundColor: '#ff4d4d', padding: 10, borderRadius: 30, marginTop: 10 }}
  className="flex-row items-center justify-center"
  onPress={handleClear}
>
  <Text className="text-white font-bold">Clear Activity</Text>
</TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
