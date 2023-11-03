import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useCameraPermission, useCameraDevice, Camera } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const camera = useRef(null);
  const navigation = useNavigation();

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
    borderColor: 'purple',
    borderWidth: 6,
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
});

export default CameraScreen;