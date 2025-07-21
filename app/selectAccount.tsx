// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
// } from 'react-native';
// import { useNavigation, useLocalSearchParams } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { useTheme } from "./context/themeContext";

// // Dummy data for accounts
// const accounts = [
//   { id: '1', name: 'Main Wallet', address: '0x1234...abcd' },
//   { id: '2', name: 'Savings Wallet', address: '0x5678...efgh' },
//   { id: '3', name: 'Trading Wallet', address: '0x9abc...ijkl' },
// ];

// const SelectAccountScreen = () => {
//   const navigation = useNavigation();
//   const { backgroundColor } = useTheme();
//   const { token, symbol } = useLocalSearchParams<{ token?: string; symbol?: string }>();

//   const handleSelect = (account: (typeof accounts)[0]) => {
//     navigation.navigate('sendAmount' as never, {
//       token,
//       symbol,
//       account: account.name,
//       address: account.address,
//     } as never);
//   };

//   return (
    
//     <View style={[styles.container, { backgroundColor }]}>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         <Ionicons name="arrow-back" size={24} color="white" />
//       </TouchableOpacity>

//       <Text style={styles.title}>Select an Account</Text>

//       <FlatList
//         data={accounts}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.accountCard} onPress={() => handleSelect(item)}>
//             <Text style={styles.accountName}>{item.name}</Text>
//             <Text style={styles.accountAddress}>{item.address}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
    
//   );
// };

// export default SelectAccountScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#000',
//     paddingHorizontal: 16,
//     paddingTop: 40,
//   },
//   backButton: {
//     marginBottom: 10,
  
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '600',
//     marginBottom: 20,
//     color: '#fff', // Title text color
//   },
//   accountCard: {
//     backgroundColor: "rgba(242, 242, 242, 0.2)",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 14,
//   },
//   accountName: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   accountAddress: {
//     fontSize: 14,
//     color: '#777',
//     marginTop: 4,
//   },
// });
