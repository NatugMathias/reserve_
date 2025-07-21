// import React, { useState, useEffect } from 'react';
// import {
//   View, Text, TouchableOpacity, TextInput,
//   StyleSheet, FlatList, Modal, ScrollView, ActivityIndicator
// } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useTheme } from "../context/themeContext";

// const tokenList = ['ethereum', 'bitcoin', 'tether', 'binancecoin'];

// const symbolMap: Record<string,string> = {
//   ethereum: 'ETH',
//   bitcoin: 'BTC',
//   tether: 'USDT',
//   binancecoin: 'BNB',
// };

// const formatVolume = (value: number): string => {
//   if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
//   if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
//   if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
//   return `$${value}`;
// };

// export default function SwapScreen() {
//   const { backgroundColor } = useTheme();
//   const [payToken, setPayToken] = useState('ethereum');
//   const [receiveToken, setReceiveToken] = useState('tether');
//   const [payAmount, setPayAmount] = useState('');
//   const [receiveAmount, setReceiveAmount] = useState('');
//   const [selectingFor, setSelectingFor] = useState<'pay'|'receive'|null>(null);

//   const [tokenPrices, setTokenPrices] = useState<Record<string,number>>({});
//   const [loadingPrices, setLoadingPrices] = useState(false);
//   const [tokenData, setTokenData] = useState<any[]>([]);

//   const [timeFilter, setTimeFilter] = useState('24h');
//   const [showTimeModal, setShowTimeModal] = useState(false);

//   const [trendingFilter, setTrendingFilter] = useState('Trending');
//   const [showTrendingModal, setShowTrendingModal] = useState(false);

//   const fakeBalance: Record<string, number> = {
//     ethereum: 1.2, bitcoin: 0.5, tether: 10000, binancecoin: 4.3
//   };

//   // fetch simple price
//   const fetchPrices = async () => {
//     setLoadingPrices(true);
//     try {
//       const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenList.join('%2C')}&vs_currencies=usd`);
//       const js = await res.json();
//       const p: Record<string,number> = {};
//       tokenList.forEach(id => p[id] = js[id]?.usd ?? 0);
//       setTokenPrices(p);
//     } catch {
//       console.log('Price fetch failed');
//     }
//     setLoadingPrices(false);
//   };

//   // fetch full market data
//   const fetchMarket = async () => {
//     try {
//       const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenList.join('%2C')}&order=market_cap_desc&sparkline=false`);
//       const js = await res.json();
//       setTokenData(js);
//     } catch {
//       console.log('Market fetch failed');
//     }
//   };

//   useEffect(() => {
//     fetchPrices();
//     fetchMarket();
//   }, []);

//   const sortTokens = (data: any[], filter: string) => {
//     const arr = [...data];
//     if (filter === 'Trending') arr.sort((a,b)=>a.price_change_percentage_24h - b.price_change_percentage_24h);
//     if (filter === 'Volume') arr.sort((a,b)=>a.total_volume - b.total_volume);
//     if (filter === 'Price') arr.sort((a,b)=>a.current_price - b.current_price);
//     return arr;
//   };

//   const applyFilter = (filter: string) => {
//     setTrendingFilter(filter);
//     setShowTrendingModal(false);
//     setTokenData(curr => sortTokens(curr, filter));
//   };

//   const swapTokens = () => {
//     setPayToken(receiveToken);
//     setReceiveToken(payToken);
//     setPayAmount(receiveAmount);
//     setReceiveAmount(payAmount);
//   };

//   const convert = (value: string) => {
//     const num = parseFloat(value);
//     if (isNaN(num)) return setReceiveAmount('');
//     const p = tokenPrices[payToken], r = tokenPrices[receiveToken];
//     if (!p || !r) return;
//     setReceiveAmount(((num * p) / r).toFixed(6));
//   };

//   const handleTokenSelect = (id: string) => {
//   if (selectingFor === 'pay') {
//     setPayToken(id);
//     convert(payAmount);
//   } else if (selectingFor === 'receive') {
//     setReceiveToken(id);
//     convert(payAmount);
//   }
//   setSelectingFor(null);
// };


//   return (
//     <View style={[styles.container,{backgroundColor}]} >
//       <Text style={styles.header}>Swap</Text>

//       {/* Pay Input */}
//       <View style={styles.card}>
//         <Text style={styles.label}>You Pay</Text>
//         <View style={styles.row}>
//           <TextInput
//             style={styles.amount} placeholder="0.00"
//             keyboardType="numeric"
//             value={payAmount}
//             onChangeText={v => { setPayAmount(v); convert(v); }}
//           />
//           <TouchableOpacity style={styles.tokenBtn} onPress={()=>setSelectingFor('pay')}>
//             <Text style={styles.tokenText}>{symbolMap[payToken]} ▼</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Swap Icon */}
//       <TouchableOpacity style={styles.swapIcon} onPress={swapTokens}>
//         <MaterialIcons name="swap-vert" size={28} color="#fff" />
//       </TouchableOpacity>

//       {/* Receive Input */}
//       <View style={styles.card}>
//         <Text style={styles.label}>You Receive</Text>
//         <View style={styles.row}>
//           <TextInput
//             style={styles.amount} placeholder="0.00"
//             keyboardType="numeric"
//             value={receiveAmount}
//             onChangeText={setReceiveAmount}
//           />
//           <TouchableOpacity style={styles.tokenBtn} onPress={()=>setSelectingFor('receive')}>
//             <Text style={styles.tokenText}>{symbolMap[receiveToken]} ▼</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Pricing Details */}
//       {payAmount !== '' && (
//         <View style={styles.pricingSection}>
//           {loadingPrices ? <ActivityIndicator /> : (
//             <>
//               <View style={styles.pricingRow}>
//                 <Text style={styles.pricingLabel}>1 {symbolMap[payToken]} ≈</Text>
//                 <Text style={styles.pricingValue}>${tokenPrices[payToken]?.toFixed(2)}</Text>
//               </View>
//               <View style={styles.divider} />
//               <View style={styles.pricingRow}><Text style={styles.pricingLabel}>Slippage</Text><Text style={styles.pricingValue}>0.6%</Text></View>
//               <View style={styles.divider} />
//               <View style={styles.pricingRow}><Text style={styles.pricingLabel}>Price Impact</Text><Text style={styles.pricingValue}>0%</Text></View>
//               <View style={styles.divider} />
//               <View style={styles.pricingRow}><Text style={styles.pricingLabel}>Fees</Text><Text style={styles.pricingValue}>$0.37</Text></View>
//               <View style={[styles.statusBox, parseFloat(payAmount) > fakeBalance[payToken] ? styles.statusError : styles.statusSuccess]}>
//                 <Text style={styles.statusText}>
//                   {parseFloat(payAmount) > fakeBalance[payToken] ? 'Insufficient funds' : 'Sufficient funds'}
//                 </Text>
//               </View>
//             </>
//           )}
//         </View>
//       )}

//       {/* Token List */}
//       {!payAmount && (
//         <View style={styles.tokenListWrapper}>
//           <Text style={styles.tokenTitle}>Tokens</Text>
//           <View style={styles.filterRow}>
//             <TouchableOpacity style={styles.filterBtn} onPress={()=>setShowTrendingModal(true)}>
//               <Text style={styles.filterText}>{trendingFilter} ▼</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.filterBtn}>
//               <Text style={styles.filterText}>All Networks</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.filterBtn} onPress={()=>setShowTimeModal(true)}>
//               <Text style={styles.filterText}>{timeFilter} ▼</Text>
//             </TouchableOpacity>
//           </View>

//           {loadingPrices ? <ActivityIndicator /> : (
//             <ScrollView style={styles.scrollTokenList} showsVerticalScrollIndicator={false}>
//               {tokenData.map((tk:any)=>(
//                 <View key={tk.id} style={styles.tokenRow}>
//                   <View>
//                     <Text style={styles.tokenName}>{tk.symbol.toUpperCase()} - {tk.name}</Text>
//                     <Text style={styles.tokenSubInfo}>
//                       Vol: {formatVolume(tk.total_volume)} | Change: {tk.price_change_percentage_24h?.toFixed(2)}%
//                     </Text>
//                   </View>
//                   <Text style={styles.tokenPrice}>${tk.current_price.toFixed(2)}</Text>
//                 </View>
//               ))}
//             </ScrollView>
//           )}
//         </View>
//       )}

//       {/* Time Modal */}
//       <Modal visible={showTimeModal} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             {['1h','24h','7d','30d'].map(i=>(
//               <TouchableOpacity key={i} style={styles.modalItem} onPress={()=>{setTimeFilter(i);setShowTimeModal(false);}}>
//                 <Text style={styles.modalText}>{i}</Text>
//               </TouchableOpacity>
//             ))}
//             <TouchableOpacity onPress={()=>setShowTimeModal(false)}>
//               <Text style={styles.modalCancelText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Trending Modal */}
//       <Modal visible={showTrendingModal} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             {['Trending','Volume','Price'].map(opt=>(
//               <TouchableOpacity key={opt} style={styles.modalItem} onPress={()=>applyFilter(opt)}>
//                 <Text style={styles.modalText}>{opt}</Text>
//               </TouchableOpacity>
//             ))}
//             <TouchableOpacity onPress={()=>setShowTrendingModal(false)}>
//               <Text style={styles.modalCancelText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Token Picker Modal */}
//       <Modal visible={selectingFor!==null} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             {tokenList.map(id=>(
//               <TouchableOpacity key={id} style={styles.modalItem} onPress={()=>handleTokenSelect(id)}>
//                 <Text style={styles.modalText}>{symbolMap[id]}</Text>
//               </TouchableOpacity>
//             ))}
//             <TouchableOpacity onPress={()=>setSelectingFor(null)}><Text style={styles.modalCancelText}>Cancel</Text></TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingTop: 60,
//     flex: 1,
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#fff',
//   },
//   card: {
//     backgroundColor: '#BFC0C3',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     color: '#6b7280',
//     marginBottom: 8,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   amount: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     flex: 1,
//   },
//   tokenBtn: {
//     backgroundColor: '#d1d5db',
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     marginLeft: 10,
//   },
//   tokenText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   swapIcon: {
//     position: 'absolute',
//     top: 225,
//     left: '45%',
//     zIndex: 1,
//     backgroundColor: '#2563eb',
//     borderRadius: 20,
//     padding: 8,
//     elevation: 5,
//   },
//   pricingSection: {
//     marginTop: 24,
//     backgroundColor: '#f9fafb',
//     borderRadius: 12,
//     padding: 16,
//   },
//   pricingRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 6,
//   },
//   pricingLabel: {
//     fontSize: 16,
//     color: '#4b5563',
//   },
//   pricingValue: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#d1d5db',
//     marginVertical: 6,
//   },
//   statusBox: {
//     marginTop: 16,
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   statusText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   statusError: {
//     backgroundColor: '#dc2626',
//   },
//   statusSuccess: {
//     backgroundColor: '#16a34a',
//   },
//   tokenListWrapper: {
//     marginTop: 30,
//     backgroundColor: '#f3f4f6',
//     borderRadius: 12,
//     padding: 12,
//     flex: 1,
//   },
//   scrollTokenList: {
//     maxHeight: 200,
//   },
//   tokenTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   filterRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   filterBtn: {
//     backgroundColor: '#e5e7eb',
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//   },
//   filterText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#374151',
//   },
//   tokenRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 20,
//   },
//   tokenName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   tokenPrice: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#2563eb',
//   },
//   tokenSubInfo: {
//     fontSize: 13,
//     color: '#6b7280',
//     marginTop: 2,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: '#00000088',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     width: '80%',
//     borderRadius: 16,
//     padding: 20,
//     elevation: 10,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   modalItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//   },
//   modalText: {
//     fontSize: 18,
//   },
//   modalCancel: {
//     marginTop: 12,
//     alignSelf: 'center',
//   },
//   modalCancelText: {
//     color: '#2563eb',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });


import {View, Text } from 'react-native';

export default function SwapScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Swap Screen</Text>
    </View>
  );
}   