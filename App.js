import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import FoundIcon from '@expo/vector-icons/Ionicons';

export default function App() {
  const [scanned, setScanned] = useState(false);
  const [zoom, setZoom] = useState(0.1);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [autoFocus, toggleAutoFocus] = useState(Camera.Constants.AutoFocus.off);

  const onToggleAutoFocus = () => {
    toggleAutoFocus((current) =>
      current === Camera.Constants.AutoFocus.on
        ? Camera.Constants.AutoFocus.off
        : Camera.Constants.AutoFocus.on
    );
  };
  const handleBarCodeScanned = ({ type, data }) => {
    // Handle scanned QR code data here
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  function handleZoomIn() {
   if (zoom < 0.9 ) {
    setZoom(zoom + 0.1   );
   } 
  }

  function handleZoomOut() {
    if ( zoom > 0.2)  {setZoom(zoom - 0.1);}
  }
  function handleToggleFlash() {
    setFlashMode(current => (current === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off));
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' , marginVertical:20, fontSize:16 }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
   
  return (
    <View style={styles.container}>
       <Camera
        style={{ flex: 1 , marginVertical: 200 ,  marginHorizontal: 50 }}
        type={Camera.Constants.Type.back}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.datamatrix],
        }}
        
        onBarCodeScanned={ handleBarCodeScanned}
        zoom={zoom}
        flashMode={flashMode}
        // autoFocus={Camera.Constants.AutoFocus.on}    
          
   
        
      />

      {/* {scanned && <Button title={'Tap to Scan Again'} style={styles.tabButton} onPress={() => setScanned(false)} />} */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
         <MaterialIcons name="add" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
          <MaterialIcons name="remove" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.controlButton} onPress={handleToggleFlash}>
          {/* <Text style={styles.controlText}> */}
            {flashMode === Camera.Constants.FlashMode.off ? <FoundIcon name='flashlight-outline' size={30} color="black" /> : <FoundIcon name='flashlight' size={30} color="black" /> }
          {/* </Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlAutoFocus} onPress={onToggleAutoFocus}>
           {autoFocus === Camera.Constants.AutoFocus.off ? <FoundIcon name='ios-camera-reverse-outline' size={30} color="black" /> : <FoundIcon name='ios-camera-reverse' size={30} color="black" /> }
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '60%',
    alignSelf: 'center',
    height: 400,
    marginVertical: 300,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  controlButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'lightgrey',
    borderRadius: 50,
    padding: 10,
    margin: 5,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
  },
  zoomButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 50,
    padding: 10,
    margin: 5,
  },
  controlText: {
    fontSize: 30,
  },
  tabButton: {
  
  },
  controlAutoFocus: {
    position: 'absolute',
    bottom: 20,
    right: 80,
    backgroundColor: 'lightgrey',
    borderRadius: 50,
    padding: 10,
    margin: 5,
  },
});
