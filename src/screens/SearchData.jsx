import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';

const searchData = [
  {
    id: 1,
    profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkISrkY0JL9CRE8FQ_rhPPesvt8BcO_UWoSA&usqp=CAU',
    username: 'john_doe',
  },
  {
    id: 2,
    profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNocPxX0k27kOIm5N6Fl5p2gSm5UvUphuyw&usqp=CAU',
    username: 'jane_smith',
  },
  {
    id: 3,
    profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbeTEuSqiiMhu-2Dn8jixmP6aNiwsKC1ugSg&usqp=CAU',
    username: 'jammy',
  },
  {
    id: 4,
    profilepicUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1CgG65cc1h4xU2UQmkmFPeeM4ejrl2tFl3g&usqp=CAU',
    username: 'cally',
  },
    // Add more posts as needed
  ];

const SearchData = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Implement your search logic here, e.g., filter searchData based on searchText.
    const filteredResults = searchData.filter(item =>
      item.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const renderSearchResult = ({ item }) => (
    <View style={styles.resultContainer}>
      <Image source={{ uri: item.profilepicUrl }} style={styles.profileImage} />
      <Text style={styles.username}>{item.username}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search users"
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
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius:20,
    marginTop:20,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
});

export default SearchData;
