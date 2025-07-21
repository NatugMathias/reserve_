// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
//   Image,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { useTheme } from "./context/themeContext";


// export default function BuyScreen() {
//   const [search, setSearch] = useState('');
//   const [tokens, setTokens] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const { backgroundColor } = useTheme();

//   useEffect(() => {
//     fetch(
//       'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=2&page=1&sparkline=false'
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setTokens(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   const filteredTokens = tokens.filter(
//     (token) =>
//       token.name.toLowerCase().includes(search.toLowerCase()) ||
//       token.symbol.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor }}>
//       <ScrollView
//         style={{ backgroundColor, paddingTop: 20, paddingHorizontal: 16 }}
//         keyboardShouldPersistTaps="handled"
//       >

//         {/* arrow back */}
//         <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
//             <TouchableOpacity onPress={() => router.back()}>
//                <Ionicons name="arrow-back" size={26} color="white" />
//             </TouchableOpacity>
//         </View>

   


//         {/* Header */}
//         <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
//           <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Select Token</Text>
//         </View>

//         {/* Search + Cancel */}
//         <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
//           <TextInput
//             value={search}
//             onChangeText={setSearch}
//             placeholder="Search"
//             placeholderTextColor="#888"
//             style={{
//               flex: 1,
//               color: 'white',
//               backgroundColor: "rgba(242, 242, 242, 0.2)",
//               borderRadius: 8,
//               paddingVertical: 10,
//               paddingHorizontal: 14,
//             }}
//           />
//           {search.length > 0 && (
//             <TouchableOpacity onPress={() => setSearch('')}>
//               <Text style={{ color: 'white', marginLeft: 10 }}>Cancel</Text>
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* Token list */}
//         {loading ? (
//           <ActivityIndicator size="large" color="#00ffcc" />
//         ) : (
//           filteredTokens.map((token) => (
//             <TouchableOpacity
//               key={token.id}
//               style={{
//                 backgroundColor: "rgba(242, 242, 242, 0.1)",
//                 padding: 12,
//                 marginBottom: 10,
//                 borderRadius: 10,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}
//               onPress={() =>
//                 router.push({
//                   pathname: '/buynext', // Navigate to Buynext screen
//                   params: {
//                     name: token.name,
//                     symbol: token.symbol,
//                     price: token.current_price,
//                     image: token.image,
//                   },
//                 })
//               }
//             >
//               <Image
//                 source={{ uri: token.image }}
//                 style={{
//                   width: 36,
//                   height: 36,
//                   borderRadius: 18,
//                   marginRight: 12,
//                   backgroundColor: '#333',
//                 }}
//               />
//               <View>
//                 <Text
//                   style={{ color: 'white', fontSize: 16, maxWidth: 200 }}
//                   numberOfLines={1}
//                   ellipsizeMode="tail"
//                 >
//                   {token.name}
//                 </Text>
//                 <Text style={{ color: '#aaa', fontSize: 13 }}>{token.symbol.toUpperCase()}</Text>
//               </View>
//             </TouchableOpacity>
//           ))
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
