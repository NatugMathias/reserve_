import { Stack } from "expo-router";
import "@/global.css";


export default function RootLayout() {
  return( 
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="emailScreen1" options={{headerShown:false}}/>
      <Stack.Screen name="signupScreen" options={{headerShown:false}}/>
      <Stack.Screen name="emailScreen2" options={{headerShown:false}}/>
      <Stack.Screen name="loginScreen" options={{headerShown:false}}/>
      <Stack.Screen name="receive" options={{headerShown:false}}/>
      <Stack.Screen name="buy" options={{headerShown:false}}/>
      <Stack.Screen name="buynext" options={{headerShown:false}}/>
      <Stack.Screen name="empty" options={{headerShown:false}}/>
      <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
    </Stack>
  );
}
