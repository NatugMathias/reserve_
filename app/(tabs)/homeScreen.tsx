import React, { useLayoutEffect } from 'react';
import {ScrollView, Text, View,Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBackgroundColor } from '../context/BackgroundColorContext';
import { Link, useNavigation } from 'expo-router';
// import Ionicons from '@expo/vector-icons/Ionicons';


export default function HomeScreen() {
    const { bgColor, setBgColor } = useBackgroundColor();
    const navigation = useNavigation();

    const colors = ['lightblue', 'lightgreen', 'gray', 'lightpink', 'lavender', 'white','#1a1d37'];
    const changeColor = () => {
    const random = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(random);
    }

    useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 15 }}>
          <Button title="Change Color" onPress={changeColor} />
        </View>
      ),
    });
  }, [navigation]);

  return (
    
    <ScrollView className="flex: 1 " contentContainerStyle={{  flexGrow: 1 }} showsVerticalScrollIndicator={false}>
    <SafeAreaView edges={['top','bottom']} className="flex-1" style={{ backgroundColor: bgColor }}>
      
      <View className="flex-1 justify-center items-center">
        {/* <Button title="Change Background Color" onPress={changeColor} /> */}
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
        <Text className="text-blue text-2xl font-bold mb-4">Welcome to the Home Screen👋🙋‍♂️</Text>
      </View>
       
    </SafeAreaView>
    </ScrollView>
   
  );
}