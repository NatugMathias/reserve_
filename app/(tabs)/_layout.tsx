import { View } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import "@/global.css";
import { ProfileProvider } from "../context/profileContext";
import { ThemeProvider, useTheme } from "../context/themeContext";

function TabsLayout() {
  const { backgroundColor } = useTheme(); // Must be used inside ThemeProvider

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
          backgroundColor: backgroundColor,
          alignContent: "center",
          height: 60,
          elevation: 0,
          shadowOpacity: 0,
        },

        tabBarIcon: ({ color, focused }) => {
          const size = focused ? 30 : 25;
          let icon;

          const renderWithIndicator = (icon, focused) => (
            <View style={{ alignItems: "center" }}>
              {focused && (
                <View
                  style={{
                    width: 30,
                    height: 4,
                    backgroundColor: "blue",
                    borderRadius: 4,
                    marginBottom: 4,
                  }}
                />
              )}
              {icon}
            </View>
          );

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
              icon = <Feather name="repeat" size={size} color={color} />;
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
                <Ionicons name="ellipse-outline" size={size} color={color} />
              );
          }

          return renderWithIndicator(icon, focused);
        },
      })}
    >
      <Tabs.Screen name="homeScreen" options={{ headerShown: false }} />
      <Tabs.Screen name="swapScreen" options={{ headerShown: false }} />
      <Tabs.Screen name="activityScreen" options={{ headerShown: false }} />
      <Tabs.Screen name="profileScreen" options={{ headerShown: false }} />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    // <ThemeProvider>
      <ProfileProvider>
        <TabsLayout />
      </ProfileProvider>
    // </ThemeProvider>
  );
}
