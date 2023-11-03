import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PhotoDisplay = ({ route }) => {
  const { capturedPhoto } = route.params;
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack(); // Navigate back to the Camera screen
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `file://${capturedPhoto.path}` }}
        style={styles.photo}
      />
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
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
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
  },
});

export default PhotoDisplay;