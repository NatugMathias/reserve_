// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   TextInput,
// } from 'react-native';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import { transactionLogs, Transaction } from './transactions';
// import { useHoldings } from './context/holdingsContext';
// import { useTheme } from "./context/themeContext";



// export default function BuynextScreen() {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const { backgroundColor } = useTheme();
//   const { name, symbol, price } = params;

//   const [amountUSD, setAmountUSD] = useState('0');
//   const [amountToken, setAmountToken] = useState('0');
//   const [showModal, setShowModal] = useState(false);
//   const [cardNumber, setCardNumber] = useState('4111111111111111'); // Dummy Visa
//   const [cvv, setCvv] = useState('123');
//   const [expiry, setExpiry] = useState('12/28');

//   const tokenSymbol = symbol ? symbol.toUpperCase() : '';
//   const tokenPrice = price ? parseFloat(price) : null;
//   const { updateHolding } = useHoldings();
 


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

//  const handlePurchase = () => {
//   if (!cardNumber || !cvv || !expiry) {
//     Alert.alert('Error', 'Please enter all card details.');
//     return;
//   }

//   const newTransaction: Transaction = {
//     type: 'buy',
//     symbol: tokenSymbol,
//     amount: amountToken,
//     account: '**** **** **** 1111', // you can format it as needed
//     address: 'Purchased via card',
//     timestamp: Date.now(),
//   };

//   transactionLogs.push(newTransaction); // Add it to logs
//   updateHolding(tokenSymbol, parseFloat(amountToken));


//   setShowModal(false);
//   Alert.alert('Success', `You've bought ${amountToken} ${tokenSymbol}`);
//   router.replace('/(tabs)/homeScreen');
// };


//   return (
//     <View style={{ flex: 1, backgroundColor, padding: 20, paddingTop: 60 }}>
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
//               backgroundColor: "rgba(242, 242, 242, 0.1)",
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

//       {/* Number pad */}
//       <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
//         {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '<'].map((key) => (
//           <TouchableOpacity
//             key={key}
//             onPress={() => (key === '<' ? handleClear() : handleNumberPress(key.toString()))}
//             style={{
//               width: '30%',
//               marginBottom: 10,
//               backgroundColor: "rgba(242, 242, 242, 0.1)",
//               padding: 16,
//               borderRadius: 8,
//               alignItems: 'center',
//             }}
//           >
//             <Text style={{ color: 'white', fontSize: 20 }}>{key}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Continue button */}
//       {parseFloat(amountUSD) > 0 && (
//         <TouchableOpacity
//           onPress={() => setShowModal(true)}
//           style={{
//             marginTop: 20,
//             backgroundColor: '#00cc99',
//             padding: 16,
//             borderRadius: 10,
//             alignItems: 'center',
//           }}
//         >
//           <Text style={{ color: '#000', fontWeight: 'bold' }}>Continue</Text>
//         </TouchableOpacity>
//       )}

//       {/* Modal for card input */}
//       <Modal visible={showModal} transparent animationType="slide">
//         <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 }}>
//           <View style={{ backgroundColor: '#222', padding: 20, borderRadius: 12 }}>
//             <Text style={{ color: 'white', fontSize: 18, marginBottom: 12 }}>Enter Your Card Details</Text>

//             <TextInput
//               placeholder="Card Number"
//               placeholderTextColor="#888"
//               keyboardType="number-pad"
//               value={cardNumber}
//               onChangeText={setCardNumber}
//               style={{
//                 backgroundColor: '#333',
//                 color: 'white',
//                 marginBottom: 10,
//                 padding: 12,
//                 borderRadius: 8,
//               }}
//             />
//             <TextInput
//               placeholder="Expiry (MM/YY)"
//               placeholderTextColor="#888"
//               value={expiry}
//               onChangeText={setExpiry}
//               style={{
//                 backgroundColor: '#333',
//                 color: 'white',
//                 marginBottom: 10,
//                 padding: 12,
//                 borderRadius: 8,
//               }}
//             />
//             <TextInput
//               placeholder="CVV"
//               placeholderTextColor="#888"
//               keyboardType="number-pad"
//               secureTextEntry
//               value={cvv}
//               onChangeText={setCvv}
//               style={{
//                 backgroundColor: '#333',
//                 color: 'white',
//                 marginBottom: 20,
//                 padding: 12,
//                 borderRadius: 8,
//               }}
//             />

//             <TouchableOpacity
//               onPress={handlePurchase}
//               style={{
//                 backgroundColor: '#00cc99',
//                 padding: 14,
//                 borderRadius: 10,
//                 alignItems: 'center',
//               }}
//             >
//               <Text style={{ color: '#000', fontWeight: 'bold' }}>Buy Now</Text>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={() => setShowModal(false)} style={{ marginTop: 10, alignItems: 'center' }}>
//               <Text style={{ color: '#ccc' }}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }
