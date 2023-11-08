import React from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const TopBar = () => {

    const navigation = useNavigation();

    const openCamera = () => navigation.navigate('CameraScreen');

    const handleSearch = () => navigation.navigate('ContactList');

  return (
    <Appbar.Header>
      <Appbar.Action icon="camera" onPress={openCamera}/>
      <Appbar.Content title="Foodzy" style={{alignItems:'center'}}/>
      <Appbar.Action icon="chat" onPress={handleSearch} />
    </Appbar.Header>
  )
}

export default TopBar