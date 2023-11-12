import React, {useState} from 'react';
import {View, Text, TextInput, Button, Image, StyleSheet, ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const Add = () => {

  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [price, setPrice] = useState( );
  const [selectedImage, setSelectedImage] = useState(null);

  // const handlePost = () => {
  //   // Implement your posting logic here, e.g., send the postText and selectedImage to a server.
  //   console.log('Selected Image:', selectedImage);
  // };

  const handlePost = () => {
    const postData = {
      title,
      description,
      quantity,
      location,
      date,
      phoneno,
      price,
      selectedImage,
    };

    // Pass the postData to the Home screen
    navigation.navigate('', { postData });
  };

  const upload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        if (image) {
          setSelectedImage(image.path);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.heading}>Create a Post</Text>
      <Text style={styles.h1}>Title:</Text>
      <TextInput style={styles.box}
        onChangeText={text => setTitle(text)}
        value={title}
      />

      <Text style={styles.h1}>Description:</Text>
      <TextInput style={styles.box}
        onChangeText={text => setDescription(text)}
        value={description}
      />

      <Text style={styles.h1}>Quantity:</Text>
      <TextInput style={styles.box}
        onChangeText={text => setQuantity(text)}
        value={quantity}
      />

      <Text style={styles.h1}>Location:</Text>
      <TextInput style={styles.box}
        onChangeText={text => setLocation(text)}
        value={location}
      />

      <Text style={styles.h1}>Date:</Text>
      <TextInput style={styles.box}
        onChangeText={text => setDate(text)}
        value={date}
      />

      <Text style={styles.h1}>Phone No:</Text>
      <TextInput style={styles.box}
        onChangeText={text => setPhoneno(text)}
        value={phoneno}
      />

      <Text style={styles.h1}>Price:</Text>
      <TextInput style={styles.box}
        onChangeText={text => setPrice(text)}
        value={price}
      />

      <Text style={styles.h1}>Photos:</Text>
      {selectedImage && (
        <Image source={{uri: selectedImage}} style={styles.image} />
      )}
      <View style={{}}>
        {/* <View style={{paddingTop:30, marginLeft:30}}>
        <Icon name='image'size={35} onPress={upload}/>
        </View> */}
        {/* <View style={{paddingTop:30, marginLeft:100,width:'50%'}}>
        <Button title="Post" onPress={handlePost} />
        </View> */}
        <View style={{}}>
          <CustomButton title="Select Image" onPress={upload} />
        </View>
        <View style={{}}>
          <CustomButton title="Post" onPress={handlePost} />
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight:"bold",
  },
  h1: {
    fontSize:15,
    fontWeight:"bold",
  },
  box: {
    borderColor:'grey',
    borderWidth:1,
    borderRadius:20,
    paddingLeft:15,
    paddingBottom:5,
    paddingTop:5,
    marginTop:5,
    marginBottom:5
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius:30,
  },
});

export default Add;
