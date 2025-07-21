// // File: app/send.tsx
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from 'expo-router';
// import { useTheme } from "./context/themeContext";

// const SendScreen = () => {
//   const navigation = useNavigation();
//   const [search, setSearch] = useState('');
//   const [tokens, setTokens] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { backgroundColor } = useTheme();

//   useEffect(() => {
//     fetch(
//       'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1&page=1&sparkline=false'
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setTokens(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   const filteredTokens = tokens.filter((token) =>
//     token.name.toLowerCase().includes(search.toLowerCase()) ||
//     token.symbol.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleTokenSelect = (token) => {
//     navigation.navigate('selectAccount' as never, {
//       token: token.name,
//       symbol: token.symbol,
//     } as never);
//   };

//   return (
//     <View style={[styles.container, { backgroundColor }]}>
//       {/* Header */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={26} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.header}>Send Token</Text>
//         <View style={{ width: 26 }} />
//       </View>

//       {/* Token List Section */}
//       <View style={styles.tokenContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search token..."
//           placeholderTextColor="#ccc"
//           value={search}
//           onChangeText={setSearch}
//         />

//         {loading ? (
//           <ActivityIndicator size="large" color="#fff" />
//         ) : (
//           <FlatList
//             data={filteredTokens}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={styles.tokenRow}
//                 onPress={() => handleTokenSelect(item)}
//               >
//                 <Image source={{ uri: item.image }} style={styles.tokenImage} />
//                 <View>
//                   <Text style={styles.tokenName}>{item.name}</Text>
//                   <Text style={styles.tokenSymbol}>{item.symbol.toUpperCase()}</Text>
//                 </View>
//               </TouchableOpacity>
//             )}
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// export default SendScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     paddingHorizontal: 16,
//     paddingTop: 50,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: '20%',
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   tokenContainer: {
//     backgroundColor: "rgba(242, 242, 242, 0.6)",
//     borderRadius: 16,
//     padding: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   searchInput: {
//     backgroundColor: "rgba(242, 242, 242, 0.1)",
//     color: '#fff',
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     marginBottom: 12,
//     fontSize: 16,
//   },
//   tokenRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomColor: '#333',
//     borderBottomWidth: 1,
//   },
//   tokenImage: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     marginRight: 12,
//   },
//   tokenName: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#fff',
//   },
//   tokenSymbol: {
//     fontSize: 14,
//     color: '#aaa',
//   },
// });
