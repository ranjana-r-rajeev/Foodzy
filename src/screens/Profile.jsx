import { View, Text, StatusBar, Image, TouchableOpacity, useWindowDimensions, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EditProfile from './EditProfile'
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'


const Profile = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const handleEditProfile = () => {
        navigation.navigate(EditProfile);
    };

    const [selectedImage, setSelectedImage] = useState('https://png.pngtree.com/background/20230525/original/pngtree-cute-anime-girl-wearing-flowers-picture-image_2735301.jpg');
    const [name, setName] = useState("Rose Peters");
    const [description, setDescription] = useState("Food lover");

    useEffect(() => {
        if (route.params && route.params.updatedImage) {
            setSelectedImage(route.params.updatedImage);
        }

        if (route.params && route.params.updatedName) {
            setName(route.params.updatedName);
        }

        if (route.params && route.params.updatedDescription) {
            setDescription(route.params.updatedDescription);
        }
    }, [route.params]);


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white',
            color: 'black'
        }}>

            <StatusBar backgroundColor="grey" />
            <View style={{ flexDirection: 'row', alignSelf: "flex-end" }}>
                <Icon name="settings" size={25} color="blue" />
            </View>
            <View style={{ width: "100%" }}>
                <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvGLIB5nbm0lkh1qxoj6lhjM_y0Jx_itVW7Q&usqp=CAU' }}
                    style={{ height: 175, width: "100%" }}
                    resizeMode='cover' />
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image
                    source={{ uri: selectedImage }}
                    style={{
                        height: 195,
                        width: 195,
                        borderRadius: 999,
                        borderColor: 'pink',
                        borderWidth: 2,
                        marginTop: -90
                    }}
                />
                <Text style={{
                    fontSize: 18,
                    marginVertical: 8,
                }}>
                    {name}
                </Text>
                <Text style={{
                    fontSize: 16
                }}>
                    {description}
                </Text>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 10
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>
                            11
                    </Text>
                        <Text style={{
                            fontSize: 16
                        }}>
                            Posts
                    </Text>
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 10,
                        marginLeft: 20,
                        marginRight: 20
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>
                            101
                    </Text>
                        <Text style={{
                            fontSize: 16,
                        }}>
                            Following
                    </Text>
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 10
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>
                            111
                    </Text>
                        <Text style={{
                            fontSize: 16
                        }}>
                            Followers
                    </Text>
                    </View>
                </View>


                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            width: 124,
                            height: 36,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'blue',
                            borderRadius: 10,
                            padding: 2,
                            marginTop: 10,
                        }}

                        onPress={handleEditProfile}
                    >
                        <Text style={{ color: 'white' }}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                flex: 1,
                marginHorizontal: 22,
                marginTop: 20
            }}>


            </View>

        </SafeAreaView>

    )





}

export default Profile