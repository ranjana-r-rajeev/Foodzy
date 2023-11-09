import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useCameraPermission, useCameraDevice, Camera } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const CameraScreen = () => {
  const camera = useRef(null);
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack(); // Navigate back to the Camera screen
  };

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [capturedPhoto, setCapturedPhoto] = useState(null); // State to store the captured photo

  if (!hasPermission) {
    requestPermission();
  }

  const takePicture = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      const result = await fetch(`file://${photo.path}`, {
        type: 'photo',
      });
      console.log(photo);
      setCapturedPhoto(photo); // Store the captured photo in the state
      navigation.navigate('PhotoDisplay', { capturedPhoto: photo }); // Navigate to the PhotoDisplay screen
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo
      />
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <View style={{marginLeft:6, marginTop:6}}>
          <Icon name="arrow-left" size={30} color="white"/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.captureButton}
        onPress={() => {
          takePicture();
        }}
      ></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 6,
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    alignSelf: 'flex-start',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'black',
    opacity: 0.8,
  },
});

export default CameraScreen;