import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import CustomButton from './src/components/CustomButton';
import Profile from './src/screens/Profile';

const Stack = createStackNavigator();

const App = () => {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false, }} /> */}
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false, }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false, }} />
          <Stack.Screen name="Home" component={Home} />
          {/* <Stack.Screen name="Settings" component={Settings} /> */}
        </Stack.Navigator>
      </NavigationContainer>

    </>
  )
}

export default App

const styles = StyleSheet.create({})