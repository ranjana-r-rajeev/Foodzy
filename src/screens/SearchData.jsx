import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SearchData = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const user = auth().currentUser;
      if (user) {
        const userUid = user.uid;

        // Perform a case-insensitive search for posts with matching titles
        const filteredResultsSnapshot = await firestore()
          .collection('posts')
          .where('userId', '==', userUid)
          .where('title', '>=', searchText.toLowerCase())
          .where('title', '<=', searchText.toLowerCase() + '\uf8ff')
          .get();

        const filteredResultsData = filteredResultsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSearchResults(filteredResultsData);
      }
    } catch (error) {
      console.error('Error searching data: ', error);
      setError('Error searching posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity onPress={() => showDetails(item)}>
      <View style={styles.resultContainer}>
        <Image
          source={{ uri: item.selectedImage }}
          style={styles.profileImage}
          onError={(e) => console.log('Error loading image:', e)}
        />
        <Text style={styles.username}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const showDetails = (item) => {
    // Implement logic to navigate to a screen showing all details for the selected post
    console.log('Show details for post:', item);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search posts by title"
        value={searchText}
        onChangeText={text => setSearchText(text)}
        onSubmitEditing={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : searchResults.length === 0 ? (
        <Text style={styles.noResultsText}>No results found</Text>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id.toString()}
          renderItem={renderSearchResult}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchData;
