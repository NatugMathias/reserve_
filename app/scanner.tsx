// // app/scanner.tsx
// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';
// import { useRouter } from 'expo-router';

// export default function ScannerScreen() {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [scannedData, setScannedData] = useState<string | null>(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const cameraRef = useRef<Camera>(null);
//   const router = useRouter();

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ data }: any) => {
//     if (!scannedData) {
//       setScannedData(data);
//       setModalVisible(true);
//     }
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }

//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         ref={cameraRef}
//         onBarCodeScanned={handleBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//         ratio="16:9"
//       />

//       {/* Modal with scanned data */}
//       <Modal
//         visible={modalVisible}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalView}>
//           <Text style={styles.modalText}>Scanned Address:</Text>
//           <Text style={styles.dataText}>{scannedData}</Text>

//           <TouchableOpacity
//             onPress={() => {
//               setModalVisible(false);
//               setScannedData(null);
//             }}
//             style={styles.button}
//           >
//             <Text style={styles.buttonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   modalView: {
//     marginTop: 'auto',
//     backgroundColor: 'white',
//     padding: 25,
//     borderTopRightRadius: 25,
//     borderTopLeftRadius: 25,
//     alignItems: 'center',
//   },
//   modalText: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   dataText: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#222',
//     padding: 12,
//     borderRadius: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });



import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useHoldings } from './context/holdingsContext';
import { Picker } from '@react-native-picker/picker';

const tokenList = [
  { name: "Bitcoin", id: "bitcoin", short: "BTC" },
  // Add other tokens as needed
];

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState(tokenList[0].short);
  const { holdings = {} } = useHoldings() || {}; // Fallback to empty object
  const router = useRouter();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (data && !scanned) {
      setScanned(true);
      setRecipientAddress(data); // Assume QR code contains a recipient address
      Alert.alert(
        'QR Code Scanned',
        `Recipient Address: ${data}`,
        [
          {
            text: 'Cancel',
            onPress: () => {
              setScanned(false);
              setRecipientAddress('');
            },
            style: 'cancel',
          },
          {
            text: 'Proceed',
            onPress: () => {
              // Show token selection and amount input
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const proceedToSend = () => {
    if (!recipientAddress || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid recipient address and amount');
      return;
    }

    const availableBalance = holdings[selectedToken] || 0;
    if (parseFloat(amount) > availableBalance) {
      Alert.alert('Error', `Insufficient ${selectedToken} balance`);
      return;
    }

    // Navigate to SendAmountScreen with parameters
    router.push({
      pathname: '/sendAmount',
      params: {
        token: tokenList.find((t) => t.short === selectedToken)?.name || 'Bitcoin',
        symbol: selectedToken,
        account: recipientAddress, // Using address as account for now
        address: recipientAddress,
      },
    });
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to use the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={handleBarCodeScanned}
        />
      ) : (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Recipient Address</Text>
          <TextInput
            style={styles.input}
            value={recipientAddress}
            onChangeText={setRecipientAddress}
            placeholder="Enter recipient address"
            placeholderTextColor="#aaa"
          />
          <Text style={styles.label}>Select Token</Text>
          <Picker
            selectedValue={selectedToken}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedToken(itemValue)}
          >
            {tokenList.map((token) => (
              <Picker.Item key={token.id} label={`${token.name} (${holdings[token.short] || 0} available)`} value={token.short} />
            ))}
          </Picker>
          <Text style={styles.label}>Amount ({selectedToken})</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder={`Enter amount (Available: ${holdings[selectedToken] || 0} ${selectedToken})`}
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
          <Button title="Proceed to Send" onPress={proceedToSend} />
          <Button
            title="Scan Again"
            onPress={() => {
              setScanned(false);
              setRecipientAddress('');
              setAmount('');
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'rgba(242, 242, 242, 0.1)',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    marginBottom: 15,
  },
  picker: {
    backgroundColor: 'rgba(242, 242, 242, 0.1)',
    color: '#fff',
    width: '100%',
    marginBottom: 15,
  },
});