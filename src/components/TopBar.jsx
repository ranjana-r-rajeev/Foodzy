import { View, Text } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper';
import Camera from './Camera';

const TopBar = () => {

    const openCamera = () => console.log('Open camera');

    const _handleSearch = () => console.log('Searching');

  return (
    <Appbar.Header>
      <Appbar.Action icon="camera" onPress={openCamera} />
      <Appbar.Content title="Foodzy" style={{alignItems:'center'}}/>
      <Appbar.Action icon="chat" onPress={_handleSearch} />
    </Appbar.Header>
  )
}

export default TopBar