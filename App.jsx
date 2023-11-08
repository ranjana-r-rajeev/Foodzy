import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Profile from './src/screens/Profile';
import BottomBar from './src/components/BottomBar';
import MainScreen from './src/screens/MainScreen';
import CameraScreen from './src/components/CameraScreen';
import PhotoDisplay from './src/screens/PhotoDisplay';
import EditProfile from './src/screens/EditProfile';
import NewMessage from './src/screens/NewMessage';
import ContactList from './src/screens/ContactList';

const Stack = createStackNavigator();

const App = () => {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false, }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false, }} />
          <Stack.Screen name="BottomBar" component={BottomBar} options={{ headerShown: false, }} />
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false, }} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false, }} />
          <Stack.Screen name="PhotoDisplay" component={PhotoDisplay} options={{ headerShown: false, }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false, }} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false, }} />
          <Stack.Screen name="ContactList" component={ContactList}/>
          <Stack.Screen name="NewMessage" component={NewMessage} options={{ headerShown: false, }}/>
          {/* <Stack.Screen name="Settings" component={Settings} /> */}
        </Stack.Navigator>
      </NavigationContainer>

    </>
  )
}

export default App

const styles = StyleSheet.create({})