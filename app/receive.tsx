// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Modal,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import Entypo from '@expo/vector-icons/Entypo';
// import * as Clipboard from 'expo-clipboard';
// import QRCode from 'react-native-qrcode-svg';
// import { useRouter } from 'expo-router';
// import { useTheme } from "./context/themeContext";


// const coinIds = ['bitcoin', 'ethereum', 'solana', 'tether', 'binancecoin', 'usd-coin'];

// // Map actual wallet addresses for each token
// const walletAddresses: Record<string, string> = {
//   bitcoin: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
//   ethereum: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
//   solana: '4eFQwdzYzRVGeneEMz1eP3wFLMn6u29JnNV4EidjGKBj',
//   tether: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
//   binancecoin: 'bnb1grpf0955h0yk3zxz9z7caql96xu6dy4gkfj2gk',
//   'usd-coin': '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
// };

// const ReceiveScreen = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedToken, setSelectedToken] = useState<any>(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const router = useRouter();
//   const { backgroundColor } = useTheme();

//   useEffect(() => {
//     const fetchTokens = async () => {
//       try {
//         const response = await fetch(
//           `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}`
//         );
//         const json = await response.json();
//         const tokens = json.map((item: any) => ({
//           id: item.id,
//           name: item.name,
//           symbol: item.symbol.toUpperCase(),
//           image: item.image,
//           address: walletAddresses[item.id] || '',
//         }));
//         setData(tokens);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         Alert.alert('Network Error', 'Failed to fetch token data.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTokens();
//   }, []);

//   const showQRModal = (token: any) => {
//     if (!token.address) {
//       Alert.alert('Address missing', 'No wallet address defined for this token.');
//       return;
//     }
//     setSelectedToken(token);
//     setModalVisible(true);
//   };

//   const copyToClipboard = (text: string) => {
//     Clipboard.setStringAsync(text);
//     Alert.alert('Copied', 'Wallet address copied to clipboard!');
//   };

//   const renderItem = ({ item }: { item: any }) => (
//     <TouchableOpacity style={styles.item}>
//       <Image source={{ uri: item.image }} style={styles.icon} />
//       <View style={{ flex: 1 }}>
//         <Text style={styles.name}>{item.name} ({item.symbol})</Text>
//         <Text style={styles.address}>{item.address}</Text>
//       </View>
//       <TouchableOpacity onPress={() => showQRModal(item)} style={{ marginRight: 10 }}>
//         <MaterialIcons name="qr-code" size={24} color="#60a5fa" />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => copyToClipboard(item.address)}>
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
//     <SafeAreaView style={[styles.container, { backgroundColor }]}>
//       <FlatList data={data} keyExtractor={(item) => item.id} renderItem={renderItem} />

//       <Modal visible={modalVisible} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {selectedToken && (
//               <>
//                 <Text style={styles.name}>{selectedToken.name} Address</Text>
//                 <QRCode value={selectedToken.address} size={200} />
//                 <Text selectable style={styles.address}>{selectedToken.address}</Text>
//                 <TouchableOpacity
//                   style={styles.copyBtn}
//                   onPress={() => copyToClipboard(selectedToken.address)}
//                 >
//                   <Text style={{ color: 'white' }}>Copy Address</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => setModalVisible(false)}
//                   style={styles.closeBtn}
//                 >
//                   <Entypo name="cross" size={32} color="white" />
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>

//         <View style={{  justifyContent: 'space-between', alignItems: 'center' }}>
//         <TouchableOpacity style={{width: 70, height:70,borderRadius:'50%',backgroundColor:"rgba(242, 242, 242, 0.1)",justifyContent:'center', alignItems: 'center'}}
//             onPress={() => router.back()}
//             >
//                 <Entypo name="cross" size={40} color="blue" />
//          </TouchableOpacity>
//         </View>
//     </SafeAreaView>
//   );
// };

// export default ReceiveScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#111', padding: 16 },
//   item: {
//     flexDirection: 'row',
//     backgroundColor: "rgba(242, 242, 242, 0.1)",
//     paddingHorizontal: 12,
//     paddingVertical: 20,
//     marginBottom: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   icon: { width: 32, height: 32, marginRight: 12 },
//   name: { color: 'white', fontSize: 16, fontWeight: 'bold' },
//   address: { color: '#aaa', fontSize: 12, marginTop: 2, textAlign: 'center' },
//   center: { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center' },
//   modalContainer: { flex: 1, backgroundColor: '#000000aa', justifyContent: 'center', alignItems: 'center' },
//   modalContent: {
//     backgroundColor: '#222',
//     padding: 20,
//     borderRadius: 12,
//     alignItems: 'center',
//     width: '80%',
//   },
//   qrImage: { width: 200, height: 200, marginVertical: 20 },
//   copyBtn: { backgroundColor: '#60a5fa', padding: 12, borderRadius: 8, marginTop: 10 },
//   closeBtn: { marginTop: 20, backgroundColor: '#444', padding: 10, borderRadius: 20 },
// });
