import React, {useState} from 'react';
import {View, Text, TextInput, Button, Image, StyleSheet, ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import CustomButton from '../components/CustomButton';

const Add = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [price, setPrice] = useState( );
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePost = () => {
    // Implement your posting logic here, e.g., send the postText and selectedImage to a server.
    console.log('Selected Image:', selectedImage);
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
      <Text>Title:</Text>
      <TextInput
        onChangeText={text => setTitle(text)}
        value={title}
      />

      <Text>Description:</Text>
      <TextInput
        onChangeText={text => setDescription(text)}
        value={description}
      />

      <Text>Quantity:</Text>
      <TextInput
        onChangeText={text => setQuantity(text)}
        value={quantity}
      />

      <Text>Location:</Text>
      <TextInput
        onChangeText={text => setLocation(text)}
        value={location}
      />

      <Text>Date:</Text>
      <TextInput
        onChangeText={text => setDate(text)}
        value={date}
      />

      <Text>Phone No:</Text>
      <TextInput
        onChangeText={text => setPhoneno(text)}
        value={phoneno}
      />

      <Text>Price:</Text>
      <TextInput
        onChangeText={text => setPrice(text)}
        value={price}
      />

      <Text>Photos:</Text>
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
