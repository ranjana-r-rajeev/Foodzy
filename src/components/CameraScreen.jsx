import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
} from 'react-native-vision-camera';

const CameraScreen = () => {
  const camera = useRef(null);

  const {hasPermission, requestPermission} = useCameraPermission();

  const device = useCameraDevice('back');

  if (!hasPermission) {
    requestPermission();
  }

  const takePicture = async () => {
    const photo = await camera.current.takePhoto();
    const result = await fetch(`file://${photo.path}`, {
      type: 'photo',
    });
    console.log(photo);
  };

  return (
    <View style={{flex: 1}}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo
      />
      <TouchableOpacity
        style={{
          width: 70,
          height: 70,
          borderRadius: 40,
          borderColor: 'purple',
          borderWidth: 6,
          position: 'absolute',
          bottom: 100,
          alignSelf: 'center',
        }}
        onPress={() => {
          takePicture();
        }}></TouchableOpacity>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({});
