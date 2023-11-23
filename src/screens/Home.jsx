// import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
// import React from 'react'
// import TopBar from '../components/TopBar'
// import Icon from 'react-native-vector-icons/FontAwesome6';

// const posts = [
//   {
//     id: 1,
//     profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkISrkY0JL9CRE8FQ_rhPPesvt8BcO_UWoSA&usqp=CAU',
//     username: 'john_doe',
//     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXd5-wG3S5ZuMMjbeFZtAVY0GaXJYx1uBzOA&usqp=CAU',
//     caption: 'Lifes too short to skip dessert! 🍰🍦 #TreatYourself #SweetTooth',
//   },
//   {
//     id: 2,
//     profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNocPxX0k27kOIm5N6Fl5p2gSm5UvUphuyw&usqp=CAU',
//     username: 'jane_smith',
//     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3UCW-2VdiWpjGo0LPHn0et8AtF_QSgXAp_w&usqp=CAU',
//     caption: 'Eating good, feeling great! 🥗💪 #HealthyEating #WellnessJourney',
//   },
//   {
//     id: 3,
//     profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbeTEuSqiiMhu-2Dn8jixmP6aNiwsKC1ugSg&usqp=CAU',
//     username: 'jammy',
//     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT0iffbRFwkkhldizWK3EzD7L8axKBg9HqfOkuw77tOSyRFHl7f6mTGSH2oEc46v-b-S0&usqp=CAU',
//     caption: 'Savoring every bite of this delicious meal. 😋🍽️ #FoodieHeaven #NomNom',
//   },
//   {
//     id: 4,
//     profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1CgG65cc1h4xU2UQmkmFPeeM4ejrl2tFl3g&usqp=CAU',
//     username: 'cally',
//     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzduwQTkzQhCkZdVo5YHCyl3phATtR6hPE8w&usqp=CAU',
//     caption: 'Yummy',
//   },
//   // Add more posts as needed
// ];

// const Home = () => {

//   const renderPost = ({ item }) => (
//     <View style={styles.postContainer}>
//       <View style={{flexDirection:'row'}}>
//       <Image source={{uri: item.profilepicUrl}}style={styles.profilepic}/>
//       <Text style={styles.username}>{item.username}</Text>
//       </View>
//       <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
//       <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
//       <Icon name="heart" size={20} color="red" style={styles.icon} />
//       <Icon name="comment" size={20} color="black" style={{marginLeft:15}} />
//       <Icon name="phone" size={20} color="blue" style={{marginLeft:15}} />
//       <Icon name="share" size={20} color="green" style={{marginLeft:15}} />
//       <Icon name="bookmark" size={20} color="purple" style={{marginLeft:200}} />
//     </View>
//       <Text style={styles.caption}>{item.caption}</Text>
//     </View>
//   );

//   return (
//     <View>
//       <TopBar/>
//       <View style={{marginBottom:150}}>
//       <FlatList
//         data={posts}
//         keyExtractor={item => item.id.toString()}
//         renderItem={renderPost}
//       />
//       </View>
//     </View>
//   )
// }

// export default Home

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   postContainer: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   username: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//     alignSelf:'center',
//     marginLeft: 10,
//   },
//   profilepic:{
//     width:50,
//     height:50,
//     borderRadius:30,
//     marginTop:10,
//   },
//   postImage: {
//     marginTop:10,
//     width: '60%',
//     aspectRatio: 0.9,
//     alignSelf:'center'
//   },
//   caption: {
//     marginTop: 5,
//   },
//   // icon:{
//   //   marginLeft:20,
//   // },
// })
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome6';
import TopBar from '../components/TopBar'

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsSnapshot = await firestore().collection('posts').get();
        const postsData = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

  const toggleDescription = (postId) => {
    setExpandedIds(prevIds => {
      if (prevIds.includes(postId)) {
        return prevIds.filter(id => id !== postId);
      } else {
        return [...prevIds, postId];
      }
    });
  };
  // const date = item.date.toDate();

  // const renderPostItem = ({ item }) => (
  //   <View style={styles.postContainer}>
  //     <Text style={styles.postTitle}>{item.title}</Text>
  //     <Text style={styles.postLocation}>{item.location}</Text>
  //     <Image source={{ uri: item.selectedImage }} style={styles.postImage} />
  //     <Text style={styles.postDescription}>{item.description}</Text>
  //     {/* <Text style={styles.postDate}>{item.date}</Text> */}
  //     <Text style={styles.postDate}>{date.toLocaleString()}</Text>
  //     <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
  //    <Icon name="heart" size={20} color="red" style={styles.icon} />
  //      <Icon name="comment" size={20} color="black" style={{marginLeft:15}} />
  //      <Icon name="phone" size={20} color="blue" style={{marginLeft:15}} />
  //          <Icon name="share" size={20} color="green" style={{marginLeft:15}} />
  //      <Icon name="bookmark" size={20} color="purple" style={{marginLeft:170}} />
  //    </View>
  //   </View>
  // );
  const renderPostItem = ({ item }) => {
    const date = item.date.toDate();
    const isExpanded = expandedIds.includes(item.id);

    return (
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postLocation}>{item.location}</Text>
        <Image source={{ uri: item.selectedImage }} style={styles.postImage} />
        {/* <Text style={styles.postDescription}>{item.description}</Text> */}
        <Text style={styles.postDate}>Use till: {date.toLocaleString()}</Text>
        <TouchableOpacity onPress={() => toggleDescription(item.id)}>
          <Text style={styles.postDescription}>
          {/* {isExpanded ? item.description : `${item.description.substring(0, 100)}... Read More`} */}
          {isExpanded ? (
      `\nDescription: ${item.description}\nQuantity: ${item.quantity}\nPrice: ${item.price}`
    ) : (
      `${item.description.substring(0, 100)}... Read More`
    )}
          </Text>
        </TouchableOpacity>
        {/* <Text style={styles.postDescription}>{item.description}</Text>
        <Text style={styles.postDescription}>{item.description}</Text>
        <Text style={styles.postDescription}>{item.description}</Text> */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <Icon name="heart" size={20} color="red" style={styles.icon} />
          <Icon name="comment" size={20} color="black" style={{ marginLeft: 15 }} />
          <Icon name="phone" size={20} color="blue" style={{ marginLeft: 15 }} />
          <Icon name="share" size={20} color="green" style={{ marginLeft: 15 }} />
          <Icon name="bookmark" size={20} color="purple" style={{ marginLeft: 170 }} />
        </View>
      </View>
    );
  };

  return (
    <>
    <TopBar/>
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
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
