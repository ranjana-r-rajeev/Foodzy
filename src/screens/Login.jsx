import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const Login = ({navigation}) => {

  const [email, setemail] = useState('');
  const [password, setpassword] =useState('');

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
      secureTextEntry/>
      <View style={styles.button}> 
        <Button 
        title='Login'
        color={'blue'}/>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign:'center',
    paddingTop: 200,
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
    borderRadius:30
  }
})