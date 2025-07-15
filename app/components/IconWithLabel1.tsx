// components/IconWithLabel.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

type IconType = 'Ionicons' | 'AntDesign' | 'Feather';

interface Props {
  iconLibrary: IconType;
  iconName: string;
  label: string;
  size?: number;
  color?: string;
}

export default function IconWithLabel1({
  iconLibrary,
  iconName,
  label,
  size = 40,
  color = 'black',
}: Props) {
  const renderIcon = () => {
    switch (iconLibrary) {
      case 'Ionicons':
        return <Ionicons name={iconName as any} size={size} color={color} />;
      case 'AntDesign':
        return <AntDesign name={iconName as any} size={size} color={color} />;
      case 'Feather':
        return <Feather name={iconName as any} size={size} color={color} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container} className='bg-gray-800'>
      {renderIcon()}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    // backgroundColor: '#343434',
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  label: {
    marginTop: 6,
    fontSize: 14,
    color: 'gray',
  },
});
