import React from 'react';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Add from '../screens/Add';
import SearchData from '../screens/SearchData';
import Icon from 'react-native-vector-icons/Ionicons';
import LikeScreen from '../screens/LikeScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

function BottomBar() {
  return (
    <Tab.Navigator
      activeColor="blue" // Set the active color for the tabs
      barStyle={{backgroundColor: 'white', height: 70}}
      shifting={true}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="SearchData"
        component={SearchData}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={26} />
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="add-circle-outline" color={color} size={26} />
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="LikeScreen"
        component={LikeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="heart-outline" color={color} size={26} />
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={26} />
          ),
          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomBar;