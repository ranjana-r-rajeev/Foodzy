import React, {useState} from 'react';
import {View,Text,TextInput,Image,StyleSheet,ScrollView,TouchableHighlight,} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import DatePicker from 'react-native-date-picker';
import {TextInputMask} from 'react-native-masked-text';
import {format} from 'date-fns';

const Add = () => {

  const [open, setOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [date, setDate] = useState(new Date()); // Initialize with the current date

  const handleConfirm = (selectedDate) => {
    setOpen(false);
    setDate(selectedDate);

    // Format the selected date and time as per your requirement
    const formattedDateTime = format(selectedDate, 'yyyy-MM-dd HH:mm:ss');
    setSelectedDateTime(formattedDateTime);
  };

  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [price, setPrice] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePost = async () => {
    if (
      !title ||
      !description ||
      !quantity ||
      !location ||
      !date ||
      !phoneno ||
      !price ||
      !selectedImage
    ) {
      console.error('All fields are required');
      // Handle the case where not all required fields are filled
      return;
    }

    if (isNaN(price)) {
      console.error('Price must be a valid number');
      return;
    }

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

    console.log('posted');
    //   let filename = postData.substring(postData.lastIndexOf('/' +1));

    //   try{
    //     await storage().ref(filename).putFile(postData);
    //   } catch(e) {
    //     console.log(e);
    //   }

    // };
    if (postData.selectedImage) {
      const filename = postData.selectedImage.split('/').pop();

      try {
        await storage().ref(filename).putFile(postData.selectedImage);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.error('No selected image to upload');
    }
    setTitle('');
    setDescription('');
    setQuantity('');
    setLocation('');
    setDate(new Date());
    setPhoneno('');
    setPrice('');
    setSelectedImage(null);
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
        <TextInput
          style={styles.box}
          onChangeText={text => setTitle(text)}
          value={title}
        />

        <Text style={styles.h1}>Description:</Text>
        <TextInput
          style={styles.box}
          onChangeText={text => setDescription(text)}
          value={description}
        />

        <Text style={styles.h1}>Quantity:</Text>
        <TextInput
          style={styles.box}
          onChangeText={text => setQuantity(text)}
          value={quantity}
        />

        <Text style={styles.h1}>Location:</Text>
        <TextInput
          style={styles.box}
          onChangeText={text => setLocation(text)}
          value={location}
        />

        <Text style={styles.h1}>Use till Date:</Text>
        <TouchableHighlight onPress={() => setOpen(true)}>
          <Text style={styles.box}>{selectedDateTime || 'Select Date'}</Text>
        </TouchableHighlight>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={handleConfirm}
          onDateChange={(newDate) => setDate(newDate)}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <Text style={styles.h1}>Phone No:</Text>
        <TextInputMask
          style={styles.box}
          type={'custom'}
          options={{
            mask: '99999 99999',
          }}
          value={phoneno}
          onChangeText={text => setPhoneno(text)}
        />

        <Text style={styles.h1}>Price:</Text>
        <TextInput
          style={styles.box}
          onChangeText={text => setPrice(text)}
          value={price.toString()}
        />

        <Text style={styles.h1}>Photos:</Text>
        {selectedImage && (
          <Image source={{uri: selectedImage}} style={styles.image} />
        )}
        <View style={{}}>
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
    fontWeight: 'bold',
  },
  h1: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  box: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 5,
    marginBottom: 5,
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
    borderRadius: 30,
  },
});

export default Add;
