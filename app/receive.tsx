// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, Image, Alert, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
// import { useRouter } from 'expo-router';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import * as Clipboard from 'expo-clipboard';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Entypo from '@expo/vector-icons/Entypo';

// const coinSymbols = [
//   { id: 'BTCUSDT', name: 'Bitcoin', symbol: 'BTC' },
//   { id: 'ETHUSDT', name: 'Ethereum', symbol: 'ETH' },
//   { id: 'SOLUSDT', name: 'Solana', symbol: 'SOL' },
//   { id: 'MATICUSDT', name: 'Polygon', symbol: 'MATIC' },
//   { id: 'USDTUSDT', name: 'Tether', symbol: 'USDT' },
//   { id: 'BNBUSDT', name: 'Binance Coin', symbol: 'BNB' },
//   { id: 'USDCUSDT', name: 'USD Coin', symbol: 'USDC' },
// ];

// const ReceiveScreen = () => {
//   const router = useRouter();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         const response = await fetch('https://api.binance.com/api/v3/ticker/price');
//         const prices = await response.json();

//         const selectedCoins = coinSymbols.map((coin) => {
//           return {
//             id: coin.symbol,
//             name: coin.name,
//             symbol: coin.symbol,
//             address: `0x${Math.random().toString(16).substr(2, 8)}`,
//             icon: `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`,
//           };
//         });

//         setData(selectedCoins);
//       } catch (error) {
//         console.error('Failed to fetch Binance data:', error);
//         Alert.alert('Error', 'Failed to load coin data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrices();
//   }, []);

//   const renderItem = ({ item }) => (
    

//     <TouchableOpacity style={styles.item}>
//       <Image source={{ uri: item.icon }} style={styles.icon} />
//       <View style={{ flex: 1 }}>
//         <Text style={styles.name}>
//           {item.name} ({item.symbol})
//         </Text>
//         <Text style={styles.address}>{item.address}</Text>
//       </View>
//       <TouchableOpacity
//         style={{ marginRight: 10 }}
//         onPress={() =>
//           router.push({
//             pathname: `/qr/${item.id}`,
//             params: { address: item.address },
//           })
//         }
//       >
//         <MaterialIcons name="qr-code" size={24} color="#60a5fa" />
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => {
//           Clipboard.setStringAsync(item.address);
//           Alert.alert('Copied', 'Address copied to clipboard!');
//         }}
//       >
//         <MaterialIcons name="content-copy" size={24} color="#60a5fa" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#60a5fa" />
//         <Text style={styles.name}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
    
//     <SafeAreaView style={styles.container}>

//       <FlatList data={data} keyExtractor={(item) => item.id} renderItem={renderItem} />

//         <View  style={{ alignItems: 'center', marginTop: 20,}}>
//             <TouchableOpacity style={{ padding: 4, borderRadius: 50, backgroundColor: '#1a1a1a' }} onPress={() => router.back()}>
//                 <Text className='text-white'><Entypo name="cross" size={44} color="blue" /></Text>
//             </TouchableOpacity>
//         </View>
//     </SafeAreaView>
  
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#111',
//     padding: 16,
//     // paddingTop: 50,

//   },
//   item: {
//     flexDirection: 'row',
//     backgroundColor: '#222',
//     paddingHorizontal: 12,
//     paddingVertical: 24,
//     marginBottom: 8,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   icon: {
//     width: 32,
//     height: 32,
//     marginRight: 12,
//   },
//   name: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   address: {
//     color: '#aaa',
//     fontSize: 12,
//   },
//   center: {
//     flex: 1,
//     backgroundColor: '#111',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default ReceiveScreen;
