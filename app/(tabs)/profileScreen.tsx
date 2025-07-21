import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useProfile } from '../context/profileContext';
import { useTheme } from '../context/themeContext';

export default function ProfileScreen() {
  // const defaultColor = '#1D1A37';
  const { backgroundColor, setBackgroundColor } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const { profileImage, setProfileImage, username, setUsername } = useProfile();
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  const askPermission = async () => {
    const mediaPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
    if (mediaPerm.status !== 'granted' || cameraPerm.status !== 'granted') {
      alert('We need access to your camera and gallery to upload a photo.');
      return false;
    }
    return true;
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets?.[0];
      if (asset?.uri) {
        setProfileImage(asset.uri);
      }
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets?.[0];
      if (asset?.uri) {
        setProfileImage(asset.uri);
      }
    }
  };

  const handlePhotoOptions = async () => {
    const granted = await askPermission();
    if (!granted) return;

    Alert.alert(
      'Select Option',
      'Choose photo source',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Gallery', onPress: pickFromGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const themeColors = ['#1D1A37', '#121212', '#0B0F33', '#023E8A', '#2C3E50',
     '#4B0082', '#006400', '#8B0000', '#800000','#243B55'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor, padding: 16 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <View style={{ flex: 1 }} />
        <Text style={{ flex: 2, fontSize: 24, color: 'blue', textAlign: 'center' }}>Profile Screen</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="settings" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Picture */}
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <TouchableOpacity onPress={handlePhotoOptions} activeOpacity={0.8}>
          <View
            style={{
              width: 160,
              height: 160,
              borderRadius: 80,
              backgroundColor: '#ccc',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {profileImage && (
              <Image source={{ uri: profileImage }} style={{ width: '100%', height: '100%' }} />
            )}
            <View
              style={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 6,
                elevation: 3,
              }}
            >
              <Ionicons name="camera" size={20} color="black" />
            </View>
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 12, color: 'white', fontSize: 16 }}>Edit Photo</Text>
      </View>

      {/* Form Inputs */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView style={{ marginTop: 30 }} showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
            <Text style={{ color: 'white', fontSize: 18, marginBottom: 8 }}>Username</Text>
            <TextInput
              style={{ backgroundColor: 'white', padding: 12, borderRadius: 8, fontSize: 16 }}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
            <Text style={{ color: 'white', fontSize: 18, marginBottom: 8 }}>Email</Text>
            <TextInput
              style={{ backgroundColor: 'white', padding: 12, borderRadius: 8, fontSize: 16 }}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
            <Text style={{ color: 'white', fontSize: 18, marginBottom: 8 }}>Bio</Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                padding: 12,
                borderRadius: 8,
                fontSize: 16,
                height: 100,
                textAlignVertical: 'top',
              }}
              placeholder="Write a short bio"
              multiline
              value={bio}
              onChangeText={setBio}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Theme Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center' }}>
          <View style={{ margin: 20, backgroundColor: 'white', borderRadius: 12, padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Theme:</Text>
            <FlatList
              data={themeColors}
              horizontal
              keyExtractor={(item) => item}
              contentContainerStyle={{ paddingVertical: 10 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: item,
                    marginRight: 12,
                    borderWidth: item === backgroundColor ? 3 : 1,
                    borderColor: item === backgroundColor ? 'black' : '#ccc',
                  }}
                  onPress={() => {
                    setBackgroundColor(item);
                    setModalVisible(false);
                  }}
                />
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20, alignSelf: 'flex-end' }}>
              <Text style={{ color: 'blue', fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
