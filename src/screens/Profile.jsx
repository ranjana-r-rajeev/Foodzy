import { View, Text, StatusBar, Image, TouchableOpacity, useWindowDimensions, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'



const Profile = () => {

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'black',
            color: 'white'
        }}>

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
                }}>
                    Rose Peters
                </Text>
                <Text style={{
                    fontSize: 16
                }}>
                    Food Lover
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
                        }}>
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