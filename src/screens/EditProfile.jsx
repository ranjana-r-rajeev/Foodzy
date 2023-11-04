import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';



const EditProfile = () => {

    const [name, setName] = useState("Rose Peters");
    const [email, setEmail] = useState("rose@gmail.com");
    const [country, setCountry] = useState("India");

    const [selectedImage, setSelectedImage] = useState('https://png.pngtree.com/background/20230525/original/pngtree-cute-anime-girl-wearing-flowers-picture-image_2735301.jpg');

    const upload = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then(image => {
                if (image) {
                    setSelectedImage(image.path);
                }
            })
            .catch(err => console.log(err));
    };




    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'black',
            color: 'white',
            paddingHorizontal: 22
        }}>
            <Text style={{ color: 'black', alignSelf: 'center' }}>Edit Profile</Text>

            <ScrollView>
                <View style={{
                    alignItems: 'center',
                    marginVertical: 22
                }}>
                    <Image
                        source={{ uri: selectedImage }}
                        style={{
                            height: 170,
                            width: 170,
                            borderRadius: 85,
                            borderWidth: 2,
                            borderColor: 'deeppink'
                        }}
                    />
                    <TouchableOpacity
                        onPress={upload}
                    >
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            right: -70,
                            zIndex: 9999
                        }}>
                            <Icon name="camera" size={30} color="deeppink" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'column',
                    marginBottom: 6
                }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Name</Text>
                    <View style={{
                        height: 44,
                        width: "100%",
                        borderColor: 'grey',
                        borderWidth: 1,
                        borderRadius: 4,
                        marginVertical: 6,
                        justifyContent: 'center',
                        paddingLeft: 0
                    }}>
                        <TextInput
                            style={{ backgroundColor: 'white', color: 'black', height: 40 }}
                            value={name}
                            onChangeText={value => setName(value)}
                            editable={true}
                        />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'column',
                    marginBottom: 6
                }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Email</Text>
                    <View style={{
                        height: 44,
                        width: "100%",
                        borderColor: 'grey',
                        borderWidth: 1,
                        borderRadius: 4,
                        marginVertical: 6,
                        justifyContent: 'center',
                        paddingLeft: 0
                    }}>
                        <TextInput
                            style={{ backgroundColor: 'white', color: 'black', height: 40 }}
                            value={email}
                            onChangeText={value => setEmail(value)}
                            editable={true}
                        />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'column',
                    marginBottom: 6
                }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Country</Text>
                    <View style={{
                        height: 44,
                        width: "100%",
                        borderColor: 'grey',
                        borderWidth: 1,
                        borderRadius: 4,
                        marginVertical: 6,
                        justifyContent: 'center',
                        paddingLeft: 0
                    }}>
                        <TextInput
                            style={{ backgroundColor: 'white', color: 'black', height: 40 }}
                            value={country}
                            onChangeText={value => setCountry(value)}
                            editable={true}
                        />
                    </View>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: 'deeppink',
                    height: 44,
                    borderRadius: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 90
                }}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfile