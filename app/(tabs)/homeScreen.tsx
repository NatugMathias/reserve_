// import React, { useEffect, useState } from "react";
// import {ScrollView, Text, View,Button, Image, StatusBar,
//  StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   FlatList } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// // import { Link, useNavigation } from 'expo-router';
// // import Ionicons from '@expo/vector-icons/Ionicons';
// import IconWithLabel from '../components/IconWithLabel1';
// import { useProfile } from '../context/profileContext';
// import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";


// // Fake owned amounts (can replace with real user data later)
// const tokenHoldings = {
//   BTC: 100,
//   SOL: 2.5,
//   ETH: 1.2,
// };

// const tokenList = [
//   {
//     name: "Bitcoin",
//     symbol: "BTCUSDT",
//     icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
//     short: "BTC",
//   },
//   {
//     name: "Solana",
//     symbol: "SOLUSDT",
//     icon: "https://cryptologos.cc/logos/solana-sol-logo.png",
//     short: "SOL",
//   },
//   {
//     name: "Ethereum",
//     symbol: "ETHUSDT",
//     icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
//     short: "ETH",
//   },
// ];



// export default function HomeScreen() {
//     const { profileImage, username } = useProfile();
//      const [prices, setPrices] = useState({});
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   useEffect(() => {
//     fetchPrices();
//     const interval = setInterval(fetchPrices, 10000); // Refresh every 10 seconds
//     return () => clearInterval(interval);
//   }, []);

//   const fetchPrices = async () => {
//     try {
//       const responses = await Promise.all(
//         tokenList.map((token) =>
//           fetch(
//             `https://api.binance.com/api/v3/ticker/24hr?symbol=${token.symbol}`
//           )
//         )
//       );
//       const data = await Promise.all(responses.map((res) => res.json()));

//       const priceData = {};
//       data.forEach((item, index) => {
//         const symbol = tokenList[index].short;
//         priceData[symbol] = {
//           price: parseFloat(item.lastPrice),
//           changePercent: parseFloat(item.priceChangePercent),
//         };
//       });

//       setPrices(priceData);
//     } catch (err) {
//       console.error("Error fetching prices:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const btcPrice = prices["BTC"]?.price || 0;
//   const btcChange = prices["BTC"]?.changePercent || 0;
//   const totalValue = (btcPrice * (tokenHoldings["BTC"] || 0)).toFixed(2);
//   const dollarChange = (
//     (btcPrice * btcChange * tokenHoldings["BTC"]) /
//     100
//   ).toFixed(2);

//   const renderToken = ({ item }) => {
//     const short = item.short;
//     const price = prices[short]?.price || 0;
//     const change = prices[short]?.changePercent || 0;
//     const amount = tokenHoldings[short] || 0;
//     const value = (price * amount).toFixed(2);
//     const changeInUsd = ((price * change * amount) / 100).toFixed(2);

//     return (
//       <TouchableOpacity
//         style={styles.tokenItem}
//         onPress={() => navigation.navigate("TokenDetail", { token: item })}
//       >
//         <Image source={{ uri: item.icon }} style={styles.tokenIcon} />
//         <View style={{ flex: 1, marginLeft: 10 }}>
//           <Text style={styles.tokenName}>{item.name}</Text>
//           <Text style={styles.tokenAmount}>
//             {amount} {short}
//           </Text>
//         </View>
//         <View style={{ alignItems: "flex-end" }}>
//           <Text style={styles.tokenValue}>${value}</Text>
//           <Text
//             style={[
//               styles.tokenChange,
//               { color: change >= 0 ? "#3FD88C" : "#F75B5B" },
//             ]}
//           >
//             {change >= 0 ? "+" : "-"}${Math.abs(changeInUsd)}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
  
//   return (
//    <> 

//     <SafeAreaView edges={['top','bottom']} className="flex-1 bg-[#1D1A37]" style={{paddingHorizontal: 10 }}>
//       <View className='flex-row justify-between mt-6 items-center'>
//         <View className='flex-row gap-2 items-center'>
//           <View>{profileImage ? (
//         <Image source={{ uri: profileImage }} style={{ width: 50, height: 50, borderRadius: 25 }} />
//       ) : (
//         <Text style={{color:"white",fontSize:24,fontFamily:"Courier New"}}>HI</Text>
//       )}</View>
//           <View>
//             <Text style={{color:"gray",fontSize:20,fontFamily:"Courier New"}}>Welcome!</Text>
//             <Text style={{color:"white",fontSize:16,fontFamily:"Courier New"}}>{username || "Username"}</Text>
//           </View>
//         </View>
       
//           <View className='flex-row'>
//             <Ionicons name="scan" size={30} color="white" className='mr-4' />
//             <Ionicons name="search" size={30} color="white" className='mr-2'/>
//           </View>
//       </View>

//       <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} className='mt-4 mb-6' style={{ flex: 1 }}>

//       {/* <View style={styles.balanceCard}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#fff" />
//         ) : (
//           <>
//             <Text style={styles.totalBalance}>${totalValue}</Text>
//             <View style={styles.balanceInfo}>
//               <Text style={styles.balanceChange}>${dollarChange}</Text>
//               <Text
//                 style={[
//                   styles.percentChange,
//                   { color: btcChange >= 0 ? "#3FD88C" : "#F75B5B" },
//                 ]}
//               >
//                 {btcChange >= 0 ? "+" : "-"}
//                 {Math.abs(btcChange)}%
//               </Text>
//             </View>
//           </>
//         )} */}
//       {/* </View> */}
      
//       <View className='flex-row justify-between mt-10 mb-2'>
//         <TouchableOpacity onPress={() => navigation.navigate("receive")}>
//           <IconWithLabel iconLibrary="AntDesign" iconName="qrcode" label="Receive" color="purple" />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate("empty")}>
//           <IconWithLabel iconLibrary="Feather" iconName="send" label="Send" color="purple" />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate("buy")}>
//           <IconWithLabel iconLibrary="Feather" iconName="dollar-sign" label="Buy" color="purple" />
//         </TouchableOpacity>
//       </View>

      
//         <View style={{ width: "100%", marginLeft: 0, marginTop: 20 }}>
//             {/* Token Section */}
//       {/* <Text style={styles.tokenHeader}>Tokens</Text>
//       {loading ? (
//         <ActivityIndicator size="small" color="#fff" style={{ marginTop: 20 }} />
//       ) : (
//         <FlatList
//           data={tokenList}
//           keyExtractor={(item) => item.symbol}
//           renderItem={renderToken}
//           contentContainerStyle={{ paddingVertical: 40 }}
//         />
//       )} */}
//         </View>

//         </ScrollView>
//     </SafeAreaView>

   
//        <StatusBar barStyle="light-content" />
      
// </>
//   );
// }

// const styles = StyleSheet.create({
//   balanceCard: {
//     backgroundColor: "#22203E",
//     borderRadius: 15,
//     paddingHorizontal: 20,
//     paddingTop: 30,
//     paddingBottom: 30,
//     marginTop: 30,
//     marginLeft: 6,
//     marginRight: 6,
//   },
//   totalBalance: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#fff",
//     textAlign: "center",
//   },
//   balanceInfo: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   balanceChange: {
//     color: "#aaa",
//     fontSize: 16,
//   },
//   percentChange: {
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   tokenHeader: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "bold",
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   tokenItem: {
//     flexDirection: "row",
//     backgroundColor: "#22203E",
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 10,
//     alignItems: "center",
//   },
//   tokenIcon: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//   },
//   tokenName: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   tokenAmount: {
//     color: "#aaa",
//     fontSize: 14,
//   },
//   tokenValue: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   tokenChange: {
//     fontSize: 14,
//   },
// });



import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconWithLabel from "../components/IconWithLabel1";
import { useProfile } from "../context/profileContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Fake owned amounts (can replace with real user data later)
const tokenHoldings = {
  BTC: 100,
  SOL: 2.5,
  ETH: 1.2,
  BNB: 4.0,
  XRP: 200,
  DOGE: 1000,
};

const tokenList = [
  {
    name: "Bitcoin",
    symbol: "BTCUSDT",
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    short: "BTC",
  },
  {
    name: "Solana",
    symbol: "SOLUSDT",
    icon: "https://cryptologos.cc/logos/solana-sol-logo.png",
    short: "SOL",
  },
  {
    name: "Ethereum",
    symbol: "ETHUSDT",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    short: "ETH",
  },
  {
    name: "Binance Coin",
    symbol: "BNBUSDT",
    icon: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
    short: "BNB",
  },
  {
    name: "Ripple",
    symbol: "XRPUSDT",
    icon: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
    short: "XRP",
  },
  {
    name: "Dogecoin",
    symbol: "DOGEUSDT",
    icon: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    short: "DOGE",
  },
];

export default function HomeScreen() {
  const { profileImage, username } = useProfile();
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchPrices = async () => {
    try {
      const responses = await Promise.all(
        tokenList.map((token) =>
          fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${token.symbol}`)
        )
      );
      const data = await Promise.all(responses.map((res) => res.json()));

      const priceData = {};
      data.forEach((item, index) => {
        const symbol = tokenList[index].short;
        priceData[symbol] = {
          price: parseFloat(item.lastPrice),
          changePercent: parseFloat(item.priceChangePercent),
        };
      });

      setPrices(priceData);
    } catch (err) {
      console.error("Error fetching prices:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderToken = ({ item }) => {
    const short = item.short;
    const price = prices[short]?.price || 0;
    const change = prices[short]?.changePercent || 0;
    const amount = tokenHoldings[short] || 0;
    const value = (price * amount).toFixed(2);
    const changeInUsd = ((price * change * amount) / 100).toFixed(2);

    return (
      <TouchableOpacity
        style={styles.tokenItem}
        onPress={() => navigation.navigate("TokenDetail", { token: item })}
      >
        <Image source={{ uri: item.icon }} style={styles.tokenIcon} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.tokenName}>{item.name}</Text>
          <Text style={styles.tokenAmount}>
            {amount} {short}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.tokenValue}>${value}</Text>
          <Text
            style={[
              styles.tokenChange,
              { color: change >= 0 ? "#3FD88C" : "#F75B5B" },
            ]}
          >
            {change >= 0 ? "+" : "-"}${Math.abs(changeInUsd)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView
        edges={["top", "bottom"]}
        className="flex-1 bg-[#1D1A37]"
        style={{ paddingHorizontal: 10 }}
      >
        <View className="flex-row justify-between mt-6 items-center">
          <View className="flex-row gap-2 items-center">
            <View>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              ) : (
                <Text style={{ color: "white", fontSize: 24 }}>HI</Text>
              )}
            </View>
            <View>
              <Text style={{ color: "gray", fontSize: 20 }}>Welcome!</Text>
              <Text style={{ color: "white", fontSize: 16 }}>
                {username || "Username"}
              </Text>
            </View>
          </View>

          <View className="flex-row">
            <Ionicons name="scan" size={30} color="white" className="mr-4" />
            <Ionicons name="search" size={30} color="white" className="mr-2" />
          </View>
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          className="mt-4 mb-6"
          style={{ flex: 1 }}
        >
          <View className="flex-row justify-between mt-10 mb-2">
            <TouchableOpacity onPress={() => navigation.navigate("receive")}>
              <IconWithLabel
                iconLibrary="AntDesign"
                iconName="qrcode"
                label="Receive"
                color="purple"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("empty")}>
              <IconWithLabel
                iconLibrary="Feather"
                iconName="send"
                label="Send"
                color="purple"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("buy")}>
              <IconWithLabel
                iconLibrary="Feather"
                iconName="dollar-sign"
                label="Buy"
                color="purple"
              />
            </TouchableOpacity>
          </View>

          {/* TOKEN LIST */}
          <View style={{ width: "100%", marginLeft: 0, marginTop: 20 }}>
            <Text style={styles.tokenHeader}>Tokens</Text>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" style={{ marginTop: 20 }} />
            ) : (
              <FlatList
                data={tokenList}
                keyExtractor={(item) => item.symbol}
                renderItem={renderToken}
                contentContainerStyle={{ paddingVertical: 20 }}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      <StatusBar barStyle="light-content" />
    </>
  );
}

const styles = StyleSheet.create({
  tokenHeader: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  tokenItem: {
    flexDirection: "row",
    backgroundColor: "#22203E",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  tokenIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  tokenName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  tokenAmount: {
    color: "#aaa",
    fontSize: 14,
  },
  tokenValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  tokenChange: {
    fontSize: 14,
  },
});

