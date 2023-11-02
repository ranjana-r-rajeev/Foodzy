import { Button, StyleSheet, Text, TextInput, View, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import CustomButton from '../components/CustomButton';
import Signup from './Signup';

const Login = ({ navigation }) => {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const navigateToSignup = () => {
    navigation.navigate('Signup'); // Make sure 'Signup' is the correct screen name in your navigation stack.
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., send data to a server or perform client-side validation
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('MainScreen');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          navigation.navigate('MainScreen');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <View>
      <Text style={styles.title}>Foodzy</Text>
      <TextInput style={styles.textbox}
        placeholder='Email Id or Phone No.'
        value={email}
        onChangeText={setemail}
      />
      <TextInput style={styles.textbox}
        placeholder='Password'
        value={password}
        onChangeText={setpassword}
        secureTextEntry />
      <View>
        <CustomButton title="Login" onPress={handleSubmit} />
      </View>
      <Divider style={{ marginTop: 180, marginBottom: 10, width: "80%", alignSelf: "center" }} />
      <View style={styles.linktext} >
        <Text>
          Don't Have an account{' '}
          <TouchableHighlight onPress={navigateToSignup}>
            <Text style={{ color: 'blue' }}>Signup</Text>
          </TouchableHighlight>
        </Text>
        <Text style={{ textAlign: 'center' }}>Forgot Password?</Text>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 200,
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
  },
  linktext: {
    alignSelf: "center"
  }
})