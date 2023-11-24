// import React, { useState } from 'react';
// import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';

// const searchData = [
//   {
//     id: 1,
//     profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkISrkY0JL9CRE8FQ_rhPPesvt8BcO_UWoSA&usqp=CAU',
//     username: 'john_doe',
//   },
//   {
//     id: 2,
//     profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNocPxX0k27kOIm5N6Fl5p2gSm5UvUphuyw&usqp=CAU',
//     username: 'jane_smith',
//   },
//   {
//     id: 3,
//     profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbeTEuSqiiMhu-2Dn8jixmP6aNiwsKC1ugSg&usqp=CAU',
//     username: 'jammy',
//   },
//   {
//     id: 4,
//     profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1CgG65cc1h4xU2UQmkmFPeeM4ejrl2tFl3g&usqp=CAU',
//     username: 'cally',
//   },
//     // Add more posts as needed
//   ];

// const SearchData = () => {
//   const [searchText, setSearchText] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = () => {
//     // Implement your search logic here, e.g., filter searchData based on searchText.
//     const filteredResults = searchData.filter(item =>
//       item.username.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setSearchResults(filteredResults);
//   };

//   const renderSearchResult = ({ item }) => (
//     <View style={styles.resultContainer}>
//       <Image source={{ uri: item.profilepicUrl }} style={styles.profileImage} />
//       <Text style={styles.username}>{item.username}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search users"
//         value={searchText}
//         onChangeText={text => setSearchText(text)}
//         onSubmitEditing={handleSearch}
//       />
//       <FlatList
//         data={searchResults}
//         keyExtractor={item => item.id.toString()}
//         renderItem={renderSearchResult}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     padding: 10,
//     borderRadius:20,
//     marginTop:20,
//   },
//   resultContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   username: {
//     fontWeight: 'bold',
//   },
// });

// export default SearchData;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SearchData = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userUid = user.uid;
          const userPostsSnapshot = await firestore()
            .collection('posts')
            .where('userId', '==', userUid)
            .get();

          const userPostsData = userPostsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          setSearchResults(userPostsData);
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSearch = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const userUid = user.uid;
        const filteredResultsSnapshot = await firestore()
          .collection('posts')
          .where('userId', '==', userUid)
          .where('title', '>=', searchText)
          .where('title', '<=', searchText + '\uf8ff')
          .get();

        const filteredResultsData = filteredResultsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSearchResults(filteredResultsData);
      }
    } catch (error) {
      console.error('Error searching data: ', error);
    }
  };

  const renderSearchResult = ({ item }) => (
    <View style={styles.resultContainer}>
      <Image source={{ uri: item.selectedImage }} style={styles.profileImage} />
      <Text style={styles.username}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search posts"
        value={searchText}
        onChangeText={text => setSearchText(text)}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id.toString()}
        renderItem={renderSearchResult}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Your existing styles
});

export default SearchData;
