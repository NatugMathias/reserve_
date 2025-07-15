// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Alert } from 'react-native';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import Ionicons from '@expo/vector-icons/Ionicons';

// export default function BuynextScreen() {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const { name, symbol, price } = params;

//   const [amountUSD, setAmountUSD] = useState('0');
//   const [amountToken, setAmountToken] = useState('0');

//   // Parse and fallback
//   const tokenSymbol = symbol ? symbol.toUpperCase() : '';
//   const tokenPrice = price ? parseFloat(price) : null;

//   useEffect(() => {
//     if (!name || !symbol || !price) {
//       Alert.alert('Missing token info', 'Please go back and select a token again.');
//       router.replace('/');
//     }
//   }, []);

//   const handleNumberPress = (num) => {
//     const newAmount = amountUSD === '0' ? num : amountUSD + num;
//     setAmountUSD(newAmount);

//     if (tokenPrice && !isNaN(parseFloat(newAmount))) {
//       const converted = (parseFloat(newAmount) / tokenPrice).toFixed(6);
//       setAmountToken(converted);
//     } else {
//       setAmountToken('0');
//     }
//   };

//   const handleClear = () => {
//     setAmountUSD('0');
//     setAmountToken('0');
//   };

//   const handlePreset = (val) => {
//     setAmountUSD(val.toString());
//     if (tokenPrice) {
//       const converted = (parseFloat(val) / tokenPrice).toFixed(6);
//       setAmountToken(converted);
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#111', padding: 20, paddingTop: 60 }}>
//       <TouchableOpacity onPress={() => router.back()}>
//         <MaterialIcons name="keyboard-arrow-left" size={28} color="white" />
//       </TouchableOpacity>

//       <Text style={{ color: 'white', fontSize: 22, marginTop: 20 }}>
//         Buy {name} ({tokenSymbol})
//       </Text>

//       <View style={{ alignItems: 'center', marginVertical: 30 }}>
//         <Text style={{ color: 'white', fontSize: 48 }}>${amountUSD}</Text>
//         <Text style={{ color: 'gray', marginTop: 8 }}>
//           {amountToken} {tokenSymbol}
//         </Text>
//       </View>

//       {/* Quick amount buttons */}
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
//         {[25, 50, 100].map((val) => (
//           <TouchableOpacity
//             key={val}
//             onPress={() => handlePreset(val)}
//             style={{
//               backgroundColor: '#222',
//               padding: 16,
//               borderRadius: 8,
//               width: '30%',
//               alignItems: 'center',
//             }}
//           >
//             <Text style={{ color: 'white' }}>${val}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* <View style='flex:1'/> */}

//       {/* Number pad */}
//       <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
//         {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '<'].map((key) => (
//           <TouchableOpacity
//             key={key}
//             onPress={() => (key === '<' ? handleClear() : handleNumberPress(key.toString()))}
//             style={{
//               width: '30%',
//               marginBottom: 10,
//               backgroundColor: '#222',
//               padding: 16,
//               borderRadius: 8,
//               alignItems: 'center',
//             }}
//           >
//             <Text style={{ color: 'white', fontSize: 20 }}>{key}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }
