import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomNavigation } from 'react-native-paper';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import CameraScreen from './Camera';

const HomeRoute = () => <Home/>;
const SearchRoute = () => <CameraScreen/>;
const AddRoute = () => <Text>Add</Text>;
const LikeRoute = () => <Text>Like</Text>;
const ProfileRoute = () => <Profile/>;
const BottomBar = () => {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: '', focusedIcon: 'home' },
    { key: 'search', title: '', focusedIcon: 'magnify' },
    { key: 'add', title: '', focusedIcon: 'plus-circle-outline' },
    { key: 'like', title: '', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'profile', title: '', focusedIcon: 'account'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    search: SearchRoute,
    add: AddRoute,
    like: LikeRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{  height: 60 }}
      activeColor="purple"
    />
  )
}

export default BottomBar

const styles = StyleSheet.create({})