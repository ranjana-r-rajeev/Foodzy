import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            {/* <Text style={{ color: 'black', alignSelf: 'center' }}>MyProfile</Text> */}
            <StatusBar backgroundColor="grey" />
            <View style={{ width: "100%" }}>
                <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvGLIB5nbm0lkh1qxoj6lhjM_y0Jx_itVW7Q&usqp=CAU' }}
                    style={{ height: 175, width: "100%" }}
                    resizeMode='cover' />
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image
                    source={{ uri: 'https://png.pngtree.com/background/20230525/original/pngtree-cute-anime-girl-wearing-flowers-picture-image_2735301.jpg' }}
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
                    color: 'black'
                }}>
                    Rose Peters
                </Text>
                <Text style={{
                    fontSize: 16,
                    color: 'black'
                }}>
                    Food Lover
                </Text>
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
                        }}>
                        <Text style={{ color: 'white' }}>Edit Profile</Text>
                    </TouchableOpacity>

                </View>
            </View>


        </SafeAreaView>

    )
}

export default Profile