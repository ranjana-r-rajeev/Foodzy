import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useCameraPermission,useCameraDevice,Camera,} from 'react-native-vision-camera';

const CameraScreen = () => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  if (!hasPermission) {
    requestPermission();
  }

  return (
    <View style={{flex:1}}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({});