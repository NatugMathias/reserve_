// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   Pressable,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation, useLocalSearchParams } from 'expo-router';
// import { transactionLogs } from './transactions'; // Adjust path if needed
// import { useRouter } from 'expo-router';
// import { useTheme } from "./context/themeContext";


// const SendAmountScreen = () => {
//   const navigation = useNavigation();
//   const { backgroundColor } = useTheme();
//   const router = useRouter();
//   const { token, symbol, account, address } = useLocalSearchParams<{
//     token?: string;
//     symbol?: string;
//     account?: string;
//     address?: string;
//   }>();

//   const [amount, setAmount] = useState('');
//   const [showSuccess, setShowSuccess] = useState(false);

//   const handleSend = () => {
//   if (!amount) {
//     setShowSuccess(false);
//     return;
//   }

//   // ✅ Add transaction to global store
//   transactionLogs.unshift({
//     symbol: symbol || '',
//     amount,
//     account: account || '',
//     address: address || '',
//     timestamp: Date.now(),
//   });

//   // ✅ Show success
//   setShowSuccess(true);
// };

//   const handleClose = () => {
//     setShowSuccess(false);
//     router.push('/(tabs)/homeScreen');
//   };

//   return (
//     <View style={[styles.container, { backgroundColor }]}>
//       {/* Back Button */}
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         <Ionicons name="arrow-back" size={24} color="white" />
//       </TouchableOpacity>

//       <Text style={styles.title}>Send {symbol}</Text>
//       <Text style={styles.subtext}>To: {account}</Text>
//       <Text style={styles.address}>{address}</Text>

//       <TextInput
//         style={styles.input}
//         placeholder={`Enter amount in ${symbol}`}
//         placeholderTextColor="#ccc"
//         keyboardType="numeric"
//         value={amount}
//         onChangeText={setAmount}
//       />

//       <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
//         <Text style={styles.sendText}>Send</Text>
//       </TouchableOpacity>

//       {/* Custom Modal */}
//       <Modal visible={showSuccess} transparent animationType="fade">
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             <Ionicons name="checkmark-circle" size={64} color="#1E90FF" />
//             <Text style={styles.modalTitle}>Success!</Text>
//             <Text style={styles.modalText}>
//               {`You have sent ${amount} ${symbol} to\n${account} (${address})`}
//             </Text>
//             <Pressable style={styles.modalButton} onPress={handleClose}>
//               <Text style={styles.modalButtonText}>Done</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default SendAmountScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#000',
//     padding: 20,
//     paddingTop: 48,
//   },
//   backButton: {
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 6,
//     color: '#fff',
//   },
//   subtext: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 4,
//     color: '#9a9a9a',
//   },
//   address: {
//     fontSize: 14,
//     color: '#9a9a9a',
//     marginBottom: 30,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: 16,
//     fontSize: 18,
//     marginBottom: 30,
//     backgroundColor: '#555',
//     color: '#fff',
//   },
//   sendButton: {
//     backgroundColor: '#1E90FF',
//     padding: 16,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   sendText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   // Modal Styles
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.8)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     backgroundColor: '#1a1a1a',
//     padding: 30,
//     borderRadius: 16,
//     alignItems: 'center',
//     width: '80%',
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginTop: 12,
//   },
//   modalText: {
//     fontSize: 16,
//     color: '#ccc',
//     textAlign: 'center',
//     marginVertical: 16,
//   },
//   modalButton: {
//     backgroundColor: '#1E90FF',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//   },
//   modalButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
