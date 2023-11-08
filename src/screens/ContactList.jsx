import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContactList = ({navigation}) => {
  const [contacts, setContacts] = useState([
    {id: 1, name: 'Contact 1'},
    {id: 2, name: 'Contact 2'},
    {id: 3, name: 'Contact 3'},
    // Add more contacts as needed
  ]);

  // const navigation = useNavigation();

  const onClick = (contact) => navigation.navigate('NewMessage');

  const onClickclick = () => navigation.navigate('CameraScreen');

  const renderContactItem = ({item}) => (
    <TouchableOpacity onPress={() => onClick(item)}>
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}>
        <Text style={{fontSize: 18}}>{item.name}</Text>
        <TouchableOpacity onPress={() => onClickclick(item)}>
          <Icon
            name="camera"
            size={25}
            color="purple"
            style={{marginLeft: 200}}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderContactItem}
      />
    </View>
  );
};

export default ContactList;
