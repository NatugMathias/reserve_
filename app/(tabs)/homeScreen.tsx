


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
import { useRouter } from "expo-router";
import { useTheme } from "../context/themeContext";
import { useHoldings } from '../context/holdingsContext';



const tokenList = [
  { name: "Bitcoin", id: "bitcoin", short: "BTC" },
  // { name: "Solana", id: "solana", short: "SOL" },
  // { name: "Ethereum", id: "ethereum", short: "ETH" },
  // { name: "Binance Coin", id: "binancecoin", short: "BNB" },
  // { name: "Ripple", id: "ripple", short: "XRP" },
  // { name: "Dogecoin", id: "dogecoin", short: "DOGE" },
];

export default function HomeScreen() {
  const { profileImage, username } = useProfile();
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [dailyChange, setDailyChange] = useState(0);
  const navigation = useNavigation();
  const { backgroundColor } = useTheme();
  const { holdings } = useHoldings();
  const router = useRouter();

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 20000);
    return () => clearInterval(interval);
  }, []);

  const fetchPrices = async () => {
    try {
      const ids = tokenList.map((token) => token.id).join(",");
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`
      );
      const data = await response.json();

      const updatedPrices = {};
      let total = 0;
      let totalChange = 0;

      data.forEach((token) => {
        const short = token.symbol.toUpperCase();
        const amount = holdings[short] || 0;
        const value = token.current_price * amount;
        const changeUsd = (token.price_change_percentage_24h * value) / 100;

        total += value;
        totalChange += changeUsd;

        updatedPrices[short] = {
          price: token.current_price,
          changePercent: token.price_change_percentage_24h,
          image: token.image,
        };
      });

      setPrices(updatedPrices);
      setTotalValue(total);
      setDailyChange(totalChange);
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
    const image = prices[short]?.image;
    const amount = holdings[short] || 0;
    const value = (price * amount).toFixed(2);
    const changeInUsd = ((price * change * amount) / 100).toFixed(2);

    return (
      <TouchableOpacity
        style={styles.tokenItem}
      onPress={() => router.push(`/tokenDetail/${item.id}`)}

      >
        {image && <Image source={{ uri: image }} style={styles.tokenIcon} />}
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
        className="flex-1"
        style={{ paddingHorizontal: 10, paddingBottom: 20, backgroundColor }}
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
          <View style={styles.balanceSummaryWrapper}>
            <View style={styles.balanceSummaryContainer}>
              <Text style={styles.balanceValue}>${totalValue.toFixed(2)}</Text>
              <View style={styles.balanceRow}>
                <Text
                  style={[
                    styles.subValue,
                    { color: dailyChange >= 0 ? "#3FD88C" : "#F75B5B" },
                  ]}
                >
                  {dailyChange >= 0 ? "+" : "-"}$
                  {Math.abs(dailyChange).toFixed(2)}
                </Text>
                <Text
                  style={[
                    styles.percentageValue,
                    { color: dailyChange >= 0 ? "#3FD88C" : "#F75B5B" },
                  ]}
                >
                  {totalValue !== 0
                    ? `${(
                        (dailyChange / (totalValue - dailyChange)) *
                        100
                      ).toFixed(2)}%`
                    : "0%"}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between mt-10 mb-2">
            <TouchableOpacity onPress={() => navigation.navigate("receive")}>
              <IconWithLabel
                iconLibrary="AntDesign"
                iconName="qrcode"
                label="Receive"
                color="skyblue"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("send")}>
              <IconWithLabel
                iconLibrary="Feather"
                iconName="send"
                label="Send"
                color="skyblue"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("buy")}>
              <IconWithLabel
                iconLibrary="Feather"
                iconName="dollar-sign"
                label="Buy"
                color="skyblue"
              />
            </TouchableOpacity>
          </View>

           <View style={{ width: "100%", marginTop: 20 }}>
            <Text style={styles.tokenHeader}>Tokens</Text>
            {loading ? (
              <ActivityIndicator
                size="small"
                color="#fff"
                style={{ marginTop: 20 }}
              />
            ) : (
              <FlatList
                data={tokenList}
                keyExtractor={(item) => item.id}
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
    backgroundColor: "rgba(242, 242, 242, 0.1)",
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
  balanceSummaryWrapper: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  balanceSummaryContainer: {
    backgroundColor: "rgba(242, 242, 242, 0.1)",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  balanceValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  subValue: {
    fontSize: 14,
  },
  percentageValue: {
    fontSize: 14,
    color: "#ccc",
  },
});
