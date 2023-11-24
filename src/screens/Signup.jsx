import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import CustomButton from '../components/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';

const Signup = ({ navigation }) => {

  const route = useRoute();

  const { updatedImage, updatedName, updatedDescription } = route.params || {};
  const [username, setusername] = useState('');
  const [phoneno, setphoneno] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const handleSubmit = () => {

    if (!username || !phoneno || !email || !password) {
      // Show an alert or set an error state
      console.log('Please fill in all fields');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  
        // Set the display name
        user.updateProfile({
          displayName: username,
        })
        .then(() => {
          console.log('User account created & display name set!', user);
  
          navigation.navigate('MainScreen', {
            screen: 'Profile',
            params: {
              updatedName: username,
              updatedEmail: email,
            },
          });
        })
        .catch((error) => {
          console.error('Error setting display name:', error);
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          navigation.navigate('MainScreen', {
            screen: 'Profile',
            params: {
              updatedName: username,
              updatedEmail: email,
            },
          });
        }
  
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
  
        console.error(error);
      });
  };
  

  return (
    <View>
      <ScrollView>
        <KeyboardAvoidingView>
          <Text style={styles.title}>Foodzy</Text>
          <TextInput
            style={styles.textbox}
            placeholder="First & Last Name"
            value={username}
            onChangeText={setusername}
          />
          <TextInput
            style={styles.textbox}
            placeholder="Phone No."
            value={phoneno}
            onChangeText={setphoneno}
          />
          <TextInput
            style={styles.textbox}
            placeholder="Email Id"
            value={email}
            onChangeText={setemail}
          />
          <TextInput
            style={styles.textbox}
            placeholder="Password"
            value={password}
            onChangeText={setpassword}
            secureTextEntry
          />
          <View >
            <CustomButton title='Signup' onPress={handleSubmit} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default Signup

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 150,
    paddingBottom: 30,
    fontWeight: 'bold'
  },
  textbox: {
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    paddingLeft: 30,
    // textAlign:'center',
    borderRadius: 30
  }
})