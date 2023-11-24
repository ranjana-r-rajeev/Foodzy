import React, {useEffect, useState} from 'react';
import {View,Text,FlatList,Image,StyleSheet,ActivityIndicator,TouchableOpacity, Linking} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome6';
import TopBar from '../components/TopBar';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsSnapshot = await firestore().collection('posts').get();
        const postsData = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts: ', error);
        console.log('Error code: ', error.code);
        console.log('Error message: ', error.message);
        setError('Error fetching posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const toggleDescription = postId => {
    setExpandedIds(prevIds => {
      if (prevIds.includes(postId)) {
        return prevIds.filter(id => id !== postId);
      } else {
        return [...prevIds, postId];
      }
    });
  };
  const renderPostItem = ({item}) => {
    const date = item.date.toDate();
    const isExpanded = expandedIds.includes(item.id);

    const imageUrl = item.imageUrl || 'YOUR_DEFAULT_IMAGE_URL';

    console.log('Image URL:', imageUrl);

    // Add a function to handle the phone icon press
  const handlePhonePress = (phoneno) => {
    const url = `tel:${phoneno}`;
    
    // Check if the Linking module is supported
    if (Linking.canOpenURL(url)) {
      Linking.openURL(url);
    } else {
      console.log("Can't handle phone call");
    }
    if (!phoneno) {
      console.log('Phone number not available');
      return;
    }
  
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Can't handle phone call");
        }
      })
      .catch((error) => {
        console.error('Error opening URL:', error);
      });
  };

    return (
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postLocation}>{item.location}</Text>
        <Image

          source={{uri: imageUrl}}
          style={styles.postImage}
          onError={e =>
            console.log('Error loading image:', e.nativeEvent.error)
          }
        />
        <Text style={styles.postDate}>Use till: {date.toLocaleString()}</Text>
        <TouchableOpacity onPress={() => toggleDescription(item.id)}>
          <Text style={styles.postDescription}>
            {isExpanded
              ? `\nDescription: ${item.description}\nQuantity: ${item.quantity}\nPrice: ${item.price}`
              : `${item.description.substring(0, 100)}... Read More`}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Icon name="heart" size={20} color="red" style={styles.icon} />
          <Icon
            name="comment"
            size={20}
            color="black"
            style={{marginLeft: 15}}
          />
          <TouchableOpacity onPress={() => handlePhonePress(item.phoneno)}>
            <Icon name="phone" size={20} color="blue" style={{marginLeft: 15}} />
          </TouchableOpacity>
          
          <Icon name="share" size={20} color="green" style={{marginLeft: 15}} />
          <Icon
            name="bookmark"
            size={20}
            color="purple"
            style={{marginLeft: 170}}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <TopBar />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={item => item.id}
            renderItem={renderPostItem}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  postContainer: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 8,
    color: 'blue', // Add a color to indicate it's clickable
  },
});

export default Home;
