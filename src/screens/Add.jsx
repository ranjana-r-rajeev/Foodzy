import React, {useState} from 'react';
import {View, Text, TextInput, Button, Image, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome6';
import CustomButton from '../components/CustomButton';

const Add = () => {
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePost = () => {
    // Implement your posting logic here, e.g., send the postText and selectedImage to a server.
    console.log('Posting Text:', postText);
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
    <View style={styles.container}>
      <Text style={styles.heading}>Create a Post</Text>
      {selectedImage && (
        <Image source={{uri: selectedImage}} style={styles.image} />
      )}
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={postText}
        onChangeText={text => setPostText(text)}
        multiline
      />
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
