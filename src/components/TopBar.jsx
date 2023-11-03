import React from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const TopBar = () => {

    const navigation = useNavigation();

    const openCamera = () => navigation.navigate('CameraScreen');

    const _handleSearch = () => console.log('Searching');

  return (
    <Appbar.Header>
      <Appbar.Action icon="camera" onPress={openCamera}/>
      <Appbar.Content title="Foodzy" style={{alignItems:'center'}}/>
      <Appbar.Action icon="chat" onPress={_handleSearch} />
    </Appbar.Header>
  )
}

export default TopBar