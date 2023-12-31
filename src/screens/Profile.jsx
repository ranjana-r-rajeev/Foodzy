import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, useWindowDimensions, ScrollView, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import EditProfile from './EditProfile'

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

  const [posts, setPosts] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    // Fetch user posts from Firestore
    const fetchUserPosts = async () => {
      const user = auth().currentUser;

      try {
        const postsRef = firestore().collection('posts');
        const userPosts = await postsRef.where('userId', '==', user.uid).get();

        const userPostsData = userPosts.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(userPostsData);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, []);

  const toggleDescription = (postId) => {
    setExpandedIds((prevIds) => {
      if (prevIds.includes(postId)) {
        return prevIds.filter((id) => id !== postId);
      } else {
        return [...prevIds, postId];
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        color: 'black',
        height: 900,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          backgroundColor: 'rgb(125,199,255)',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
          {name}
        </Text>
        <TouchableOpacity onPress={handleSettings}>
          <Icon name="settings" size={30} color="blue" />
        </TouchableOpacity>
      </View>

      <StatusBar backgroundColor="grey" />
      <View style={{width: '100%'}}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,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',
          }}
          style={{height: 175, width: '100%'}}
          resizeMode="cover"
        />
      </View>
      <View style={{position: 'absolute', top: 10, right: 12}}>
        <Icon name="settings" size={30} color="blue" onPress={handleSettings} />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={{uri: selectedImage || 'https://placekitten.com/200/300'}}
          style={{
            height: 195,
            width: 195,
            borderRadius: 999,
            borderColor: 'rgb(4,55,242)',
            borderWidth: 2,
            marginTop: -90,
          }}
        />
        
        <View style={{marginTop: 0}}>
          <Text style={{fontSize: 18, marginVertical: 8, textAlign: 'center'}}>
            {updatedName}
          </Text>
          <Text style={{fontSize: 16, textAlign: 'center'}}>{description}</Text>

          <View style={{flexDirection: 'row'}}>
            {/* <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            padding: 10
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold'
            }}>
              0
                    </Text>
            <Text style={{
              fontSize: 16
            }}>
              Posts
                    </Text>
          </View> */}
            {/* <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            padding: 10,
            marginLeft: 20,
            marginRight: 20
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold'
            }}>
              0
                    </Text>
            <Text style={{
              fontSize: 16,
            }}>
              Following
                    </Text>
          </View> */}
            {/* <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            padding: 10
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold'
            }}>
              0
                    </Text>
            <Text style={{
              fontSize: 16
            }}>
              Followers
                    </Text>
          </View> */}
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'blue',
              borderRadius: 10,
              padding: 2,
              marginTop: 15,
            }}
            onPress={handleEditProfile}>
            <Text style={{color: 'white'}}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={{}}>
        <Text style={{ alignSelf: 'center', marginTop: 230 }}>POSTS</Text>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postDescription}>{item.description}</Text>
              <Text style={styles.postDetails}>Location: {item.location}</Text>
              <Text style={styles.postDetails}>Price: {item.price}</Text>
              <Text style={styles.postDetails}>Quantity: {item.quantity}</Text>
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: '100%', height: 200, marginTop: 10, borderRadius: 8 }}
                resizeMode="cover"
              />
              {/* ... include other post details ... */}
      {/* </View> */}
      {/* )} */}
      {/* /> */}
      {/* // </View> */}
      <View style={{height: '63%'}}>
        <Text style={{textAlign: 'center', marginTop: 190}}>POSTS</Text>
        <FlatList
          data={posts}
          keyExtractor={item => item?.id}
          renderItem={({ item }) => {
            const isExpanded = item && expandedIds.includes(item.id);

            return (
              <View style={styles.postContainer}>
                <Text style={styles.postTitle}>Title: {item.title}</Text>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: '100%', height: 200, marginTop: 10, borderRadius: 8 }}
                  resizeMode="cover"
                />
                <TouchableOpacity onPress={() => toggleDescription(item.id)}>
                  <Text style={styles.postDescription}>
                    {isExpanded
                      ? `Description: ${item.description}\nLocation: ${item.location}\nQuantity: ${item.quantity}\nPrice: ${item.price}`
                      : `${item.description.substring(0, 100)}... Read More`}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 8,
    color: 'grey',
  },
  postDetails: {
    fontSize: 14,
    marginBottom: 4,
    color: 'black',
  },
});

export default Profile;