// import React, { useLayoutEffect } from 'react';
import {ScrollView, Text, View,Button, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Link, useNavigation } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import IconWithLabel from '../components/IconWithLabel1';
import { useProfile } from '../context/profileContext';



export default function HomeScreen() {
    const { profileImage, username } = useProfile();
  
  return (
   <> 

    <SafeAreaView edges={['top','bottom']} className="flex-1 bg-[#1D1A37]" style={{paddingHorizontal: 10 }}>
      <View className='flex-row justify-between mt-6 items-center'>
        <View className='flex-row gap-2 items-center'>
          <View>{profileImage ? (
        <Image source={{ uri: profileImage }} style={{ width: 50, height: 50, borderRadius: 25 }} />
      ) : (
        <Text style={{color:"white",fontSize:24,fontFamily:"Courier New"}}>HI</Text>
      )}</View>
          <View>
            <Text style={{color:"gray",fontSize:20,fontFamily:"Courier New"}}>Welcome!</Text>
            <Text style={{color:"white",fontSize:16,fontFamily:"Courier New"}}>{username || "Username"}</Text>
          </View>
        </View>
       
          <View className='flex-row'>
            <Ionicons name="scan" size={30} color="white" className='mr-4' />
            <Ionicons name="search" size={30} color="white" className='mr-2'/>
          </View>
      </View>

      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} className='mt-4'>

      <View className='mt-10 w-4/5 bg-gray-800 self-center rounded-xl items-center px-4 justify-center' style={{height:160}}>
        <View>
          <View className='mb-2'><Text className='font-extrabold text-4xl text-white'>$3345076.00</Text></View>
          <View className='flex-row items-center justify-between'>
            <Text className='text-white'>$34567</Text>
            <Text className='text-white'>+3.5%</Text>
          </View>
        </View>
      </View>
      
      <View className='flex-row justify-between mt-10 mb-2'>
        <IconWithLabel iconLibrary="AntDesign" iconName="qrcode" label="Receive" color="purple" />
        <IconWithLabel iconLibrary="Feather" iconName="send" label="Send" color="purple" />
        <IconWithLabel iconLibrary="Feather" iconName="dollar-sign" label="Buy" color="purple" />
      </View>

      <View className='mt-10'><Text className='text-white text-2xl font-semibold'>Trending</Text></View>

      
       
        <View style={{ width: "100%", marginLeft: 0, marginTop: 20 }}>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions iiiiiiiiiiiii iiiiiiiiiii ii ii  iiiiiii j</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
            <Text style={{ color: 'purple', fontSize: 18, fontWeight: 'bold' }}>Recent Transactions</Text>
        </View>

        </ScrollView>
    </SafeAreaView>

   
       <StatusBar barStyle="light-content" />
      
</>
  );
}