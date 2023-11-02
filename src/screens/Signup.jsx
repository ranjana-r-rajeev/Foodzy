import { StyleSheet, Text, TextInput, View, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

const Signup = ({navigation}) => {

    const [username, setusername] = useState('');
    const [phoneno, setphoneno] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const handleSubmit = () => {
      // Handle form submission, e.g., send data to a server or perform client-side validation
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          navigation.navigate('Home');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            navigation.navigate('Home');
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
          <View style={styles.button}>
            <Button title="SignUp" color={'blue'} onPress={handleSubmit}/>
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
        textAlign:'center',
        paddingTop: 150,
        paddingBottom:30,
        fontWeight:'bold'
      },
      textbox: {
        borderWidth:1,
        marginTop:10,
        marginLeft:20,
        marginRight:20,
        marginBottom:20,
        paddingLeft:30,
        // textAlign:'center',
        borderRadius:30
      },
      button: {
        width:200,
        alignSelf:'center',
        borderRadius:30,
        marginTop:10
      }
})