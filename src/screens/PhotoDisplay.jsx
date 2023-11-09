import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icons from 'react-native-vector-icons/Ionicons';

const PhotoDisplay = ({ route }) => {
  const { capturedPhoto } = route.params;
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack(); // Navigate back to the Camera screen
  };

  const sendPic = () => {
      //go where
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `file://${capturedPhoto.path}` }}
        style={styles.photo}
      />
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <View style={{marginLeft:6, marginTop:6}}>
          <Icon name="arrow-left" size={30} color="white"/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sendButton} onPress={sendPic}>
        <View style={{marginLeft:15}}>
          <Icons name="send-sharp" size={40} color='white'/>
          <Text>send</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  photo: {
    flex: 1,
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
  sendButton:{
    position: 'absolute',
    bottom: 100,
    alignSelf: 'flex-end',
    bottom:40,
    right:20,
    width: 65,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'black',
    opacity: 0.8,
  },
  backButtonText: {
    fontSize: 18,
  },
});

export default PhotoDisplay;