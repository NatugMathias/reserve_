

//app/tokenDetail/[id].tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Share,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from "../context/themeContext";


const screenWidth = Dimensions.get('window').width;

export default function TokenDetailScreen() {
  const router = useRouter();
  const { backgroundColor } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [selectedRange, setSelectedRange] = useState<'1D' | '7D' | '30D'>('1D');
  const [chartData, setChartData] = useState<number[]>([]);
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const rangeToDays: Record<'1D' | '7D' | '30D', number> = {
    '1D': 1,
    '7D': 7,
    '30D': 30,
  };

  // const fetchData = async () => {
  //   if (!id) return;

  //   try {
  //     setLoading(true);

  //     const [chartRes, infoRes] = await Promise.all([
  //       fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${rangeToDays[selectedRange]}`),
  //       fetch(`https://api.coingecko.com/api/v3/coins/${id}`),
  //     ]);

  //     const chartJson = await chartRes.json();
  //     const infoJson = await infoRes.json();

  //     const prices = chartJson.prices.map((entry: number[]) => entry[1]);

  //     setChartData(prices);
  //     setTokenInfo(infoJson);
  //   } catch (err) {
  //     console.error('Error fetching token data:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


// const fetchData = async () => {
//   if (!id) return;

//   try {
//     setLoading(true);

//     const [chartRes, infoRes] = await Promise.all([
//       fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${rangeToDays[selectedRange]}`),
//       fetch(`https://api.coingecko.com/api/v3/coins/${id}`),
//     ]);

//     const chartJson = await chartRes.json();
//     const infoJson = await infoRes.json();

//     if (!Array.isArray(chartJson.prices)) {
//       throw new Error("Invalid chart data");
//     }

//     const prices = chartJson.prices.map((entry: number[]) => entry[1]);

//     setChartData(prices);
//     setTokenInfo(infoJson);
//   } catch (err) {
//     console.error('Error fetching token data:', err);
//   } finally {
//     setLoading(false);
//   }
// };




const fetchData = async () => {
  if (!id) return;

  let chartRes, infoRes;

  try {
    setLoading(true);

    [chartRes, infoRes] = await Promise.all([
      fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${rangeToDays[selectedRange]}`),
      fetch(`https://api.coingecko.com/api/v3/coins/${id}`),
    ]);

    if (!chartRes.ok || !infoRes.ok) {
      throw new Error("One or both API responses failed.");
    }

    const chartJson = await chartRes.json();
    const infoJson = await infoRes.json();

    if (!Array.isArray(chartJson.prices)) {
      throw new Error("Invalid chart data format.");
    }

    const prices = chartJson.prices.map((entry: number[]) => entry[1]);

    setChartData(prices);
    setTokenInfo(infoJson);
  } catch (err) {
    console.error('Error fetching token data:', err);

    // Log raw API text if available
    try {
      const chartText = chartRes && (await chartRes.text());
      const infoText = infoRes && (await infoRes.text());
      console.log("Chart API response:", chartText);
      console.log("Info API response:", infoText);
    } catch (extraErr) {
      console.error("Error reading raw API response:", extraErr);
    }
  } finally {
    setLoading(false);
  }
};




  useEffect(() => {
    fetchData();
  }, [id, selectedRange]);

  if (loading || !tokenInfo) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#00FFAA" />
        <Text className="text-white mt-4">Loading token data...</Text>
      </SafeAreaView>
    );
  }

  const chartObj = {
    labels: chartData.map((_, i, arr) => {
      const step = Math.floor(arr.length / 6);
      return i % step === 0 ? `${i}` : '';
    }),
    datasets: [
      {
        data: chartData,
        color: () => '#00FFAA',
        strokeWidth: 2,
      },
    ],
  };

  const {
    name,
    symbol,
    market_data: data,
  } = tokenInfo;

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome crypto app! 🚀 https://yourcryptosite.com',
        title: 'Share Crypto App',
        url: 'https://yourcryptosite.com',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type (e.g., Facebook, WhatsApp)
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-4 pt-6" style={{ backgroundColor }}>
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold capitalize">
          {name || 'Token'}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Chart */}
        <View className="bg-[#29284A] rounded-2xl p-2 mb-6 ">
          <LineChart
            data={chartObj}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: '#29284A',
              backgroundGradientFrom: '#29284A',
              backgroundGradientTo: '#29284A',
              decimalPlaces: 2,
              color: () => '#00FFAA',
              labelColor: () => '#FFFFFF',
              propsForDots: {
                r: '2',
                strokeWidth: '1',
                stroke: '#00FFAA',
              },
            }}
            bezier
            style={{ borderRadius: 16 }}
          />
        </View>

        {/* Time Range Filters */}
        <View className="flex-row justify-around mb-8">
          {['1D', '7D', '30D'].map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setSelectedRange(range as '1D' | '7D' | '30D')}
              className={`px-4 py-2 rounded-full w-20 items-center ${
                selectedRange === range ? 'bg-white' : 'bg-[#444]'
              }`}
            >
              <Text
                className={`font-bold ${
                  selectedRange === range ? 'text-black' : 'text-white'
                }`}
              >
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Actions */}
   <View className="flex-row justify-around mb-10">
      {[
        { label: 'Receive', icon: 'qr-code-outline', route: '/receive' },
        { label: 'Buy', icon: 'logo-usd', route: '/buy' },
        { label: 'Share', icon: 'share-social-outline', route: null },
      ].map((action) => (
        <TouchableOpacity
          key={action.label}
          className="items-center justify-center"
          onPress={() => {
            if (action.route) {
              router.push(action.route);
            } else if (action.label === 'Share') {
              handleShare(); // Call share function
            }
          }}
          style={{
            backgroundColor: "rgba(242, 242, 242, 0.1)",
            width: 80,
            height: 80,
            borderRadius: 10,
          }}
        >
          <Ionicons name={action.icon as any} size={28} color="skyblue" />
          <Text className="text-gray-300 font-bold mt-1">{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>

        {/* Token Info */}
        <View className="bg-[#1E1E2E] p-5 rounded-2xl shadow-md mb-10">
          <Text className="text-white text-2xl font-semibold mb-4">Token Info</Text>
          {[
            { label: 'Symbol', value: symbol?.toUpperCase() },
            { label: 'Current Price', value: `$${data?.current_price?.usd?.toLocaleString()}` },
            { label: 'Market Cap', value: `$${data?.market_cap?.usd?.toLocaleString()}` },
            { label: '24h Volume', value: `$${data?.total_volume?.usd?.toLocaleString()}` },
            { label: 'Circulating Supply', value: `${data?.circulating_supply?.toLocaleString()} ${symbol?.toUpperCase()}` },
            { label: 'All-Time High', value: `$${data?.ath?.usd?.toLocaleString()}` },
            { label: 'All-Time Low', value: `$${data?.atl?.usd?.toLocaleString()}` },
          ].map((item, index, arr) => (
            <View key={item.label}>
              <View className="flex-row justify-between py-3">
                <Text className="text-gray-400 text-base">{item.label}</Text>
                <Text className="text-white text-base font-medium">{item.value}</Text>
              </View>
              {index !== arr.length - 1 && (
                <View className="h-[1px] bg-[#333] opacity-60" />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
