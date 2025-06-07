import { View, } from "react-native";
import { Button } from "react-native";
import { Tabs, } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { BackgroundColorProvider } from '../context/BackgroundColorContext';
import "@/global.css";


export default function RootLayout() {
  return( 
    <BackgroundColorProvider>
    <Tabs
      screenOptions={({ route }) => ({
        // headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#2024F2",
        tabBarInactiveTintColor: "gray",
tabBarStyle: {
      alignContent: "center",
      height: 60, // 👈 Increase this value to make the tab bar taller
    },

        tabBarIcon: ({ color, size, focused }) => {
          let icon;

          switch (route.name) {
            case "homeScreen":
              icon = (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={size}
                  color={color}
                />
              );
              break;

            case "swapScreen":
              icon = (
                <Feather
                  name="repeat"
                  size={size}
                  color={color}
                />
              );
              break;

            case "activityScreen":
              icon = (
                <Ionicons
                  name={focused ? "time" : "time-outline"}
                  size={size}
                  color={color}
                />
              );
              break;

            case "profileScreen":
              icon = (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={size}
                  color={color}
                />
              );
              break;

            default:
              icon = (
                <Ionicons
                  name="ellipse-outline"
                  size={size}
                  color={color}
                />
              );
          }

          return icon
              
        },

      })}
    >
      <Tabs.Screen name="homeScreen" options={{ headerShown: true, headerTitle: "" }} />
      <Tabs.Screen name="swapScreen" options={{ headerTitle: "Swap" }} />
      <Tabs.Screen name="activityScreen" options={{ headerTitle: "Activity" }} />
      <Tabs.Screen name="searchScreen.tsx" options={{ headerTitle: "Search" }} />
    </Tabs>
    </BackgroundColorProvider>
  );
}
