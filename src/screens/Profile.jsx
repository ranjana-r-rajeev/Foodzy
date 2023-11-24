import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, useWindowDimensions, SafeAreaView, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { updatedEmail, updatedImage, updatedName, updatedDescription } =
    route.params || {};

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', {
      updatedName: updatedName,
      updatedDescription: description,
      updatedEmail: email,
    });
  };

  const [name, setName] = useState(updatedName || 'Rose Peter');
  const [description, setDescription] = useState(
    updatedDescription || 'Food lover',
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [email, setEmail] = useState(updatedEmail || 'rose@gmail.com');

  useEffect(() => {
    const user = auth().currentUser;

    if (user && user.photoURL) {
      setSelectedImage(user.photoURL);
    }

    if (route.params && route.params.updatedDescription) {
      setDescription(route.params.updatedDescription);
    }
  }, [route.params]);

  const fetchImageFromFirebase = async () => {
    try {
      // If `updatedImage` is a URL, set it directly
      if (updatedImage.startsWith('http')) {
        setSelectedImage(updatedImage);
      } else {
        // Otherwise, assume `updatedImage` is the path to the image in Firebase Storage
        const reference = storage().ref(updatedImage);
        const imageUrl = await reference.getDownloadURL();
        setSelectedImage(imageUrl);
      }
    } catch (error) {
      console.error('Error fetching image from Firebase storage:', error);
    }
  };

  useEffect(() => {
    if (updatedImage) {
      fetchImageFromFirebase();
    }
  }, [updatedImage]);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 'white',
      color: 'black'
    }}>

      <StatusBar backgroundColor="grey" />
      <View style={{ width: "100%" }}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvGLIB5nbm0lkh1qxoj6lhjM_y0Jx_itVW7Q&usqp=CAU' }}
          style={{ height: 175, width: "100%" }}
          resizeMode='cover' />
      </View>
      <View style={{ position: 'absolute', top: 10, right: 12 }}>
        <Icon name="settings" size={30} color="blue" onPress={handleSettings} />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image
          source={{ uri: selectedImage }}
          style={{
            height: 195,
            width: 195,
            borderRadius: 999,
            borderColor: 'pink',
            borderWidth: 2,
            marginTop: -90
          }}
        />
        <Text style={{
          fontSize: 18,
          marginVertical: 8,
        }}>
          {name}
        </Text>
        <Text style={{
          fontSize: 16
        }}>
          {description}
        </Text>

        <Text style={{ fontSize: 18, marginVertical: 8 }}>{updatedName}</Text>
        <Text style={{ fontSize: 16 }}>{description}</Text>

        {/* ... (other profile details) */}

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'blue',
              borderRadius: 10,
              padding: 2,
              marginTop: 10,
            }}
            onPress={handleEditProfile}>
            <Text style={{ color: 'white' }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, marginHorizontal: 22, marginTop: 20 }}>
        {/* ... (other content) */}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
