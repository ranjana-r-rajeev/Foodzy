import { View, Text, ScrollView, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { useNavigation, useRoute } from '@react-navigation/native';


const EditProfile = () => {
    const route = useRoute();
    const { updatedImage, updatedName, updatedDescription } = route.params || {};
    const navigation = useNavigation();
    const updateProfile = () => {
        // Pass the updated profile data as parameters to the 'Profile' screen
        navigation.navigate('MainScreen', {screen: 'Profile', params: {
            updatedImage: selectedImage,
            updatedName: name,
            updatedDescription: description,
          },});
    };


    const [name, setName] = useState("Rose Peter");
    const [description, setDescription] = useState("Food lover");
    const [email, setEmail] = useState("rose@gmail.com");
    const [country, setCountry] = useState("India");


    const minDate = "1975/01/01";
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(
        today.setDate(today.getDate() + 1),
        "YYYY/MM/DD"
    );
    const [selectedStartDate, setSelectedStartDate] = useState("2001/08/21");
    const [startedDate, setStartedDate] = useState("2023/12/12");

    const handleChangeStartDate = (propDate) => {
        setStartedDate(propDate);
    };

    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    };

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

    function renderDatePicker() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={openStartDatePicker}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            margin: 20,
                            backgroundColor: 'skyblue',
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 20,
                            padding: 35,
                            width: "90%",
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    >
                        <DatePicker
                            mode="calendar"
                            minimumDate={minDate}
                            selected={startedDate}
                            onDateChanged={handleChangeStartDate}
                            onSelectedChange={(date) => setSelectedStartDate(date)}
                            options={{
                                backgroundColor: 'skyblue',
                                textHeaderColor: 'black',
                                textDefaultColor: 'white',
                                selectedTextColor: 'white',
                                mainColor: "#469ab6",
                                textSecondaryColor: 'white',
                                borderColor: "rgba(122,146,165,0.1)",
                            }}
                            style={{
                                height: 300,
                                width: 300,
                            }}
                        />

                        <TouchableOpacity onPress={handleOnPressStartDate}>
                            <Text style={{ fontSize: 17, color: 'white' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white',
            color: 'black',
            paddingHorizontal: 22
        }}>
            <Text style={{ color: 'black', alignSelf: 'center' }}>Edit Profile</Text>

            <ScrollView>
                <View style={{
                    alignItems: 'center',
                    marginVertical: 22
                }}>
                    <TouchableOpacity
                        onPress={upload}
                    >
                        <Image
                            source={{ uri: selectedImage }}
                            style={{
                                height: 170,
                                width: 170,
                                borderRadius: 85,
                                borderWidth: 2,
                                borderColor: 'blue'
                            }}
                        />

                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 10,
                            zIndex: 9999
                        }}>
                            <Icon name="camera" size={35} color="blue" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'column',
                    marginBottom: 6
                }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Name</Text>
                    <View style={styles.text}>
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
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Description</Text>
                    <View style={styles.text}>
                        <TextInput
                            style={{ backgroundColor: 'white', color: 'black', height: 40 }}
                            value={description}
                            onChangeText={value => setDescription(value)}
                            editable={true}
                        />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'column',
                    marginBottom: 6
                }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Email</Text>
                    <View style={styles.text}>
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
                    <View style={styles.text}>
                        <TextInput
                            style={{ backgroundColor: 'white', color: 'black', height: 40 }}
                            value={country}
                            onChangeText={value => setCountry(value)}
                            editable={true}
                        />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'column',
                    marginBottom: 6
                }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Date of Birth</Text>
                    <TouchableOpacity
                        onPress={handleOnPressStartDate}
                        style={styles.text}>
                        <Text style={{ backgroundColor: 'white', color: 'black', height: 40, paddingLeft: 15, paddingTop: 10 }}>{selectedStartDate}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: 'blue',
                    width: 124,
                    height: 36,
                    borderRadius: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    alignSelf: 'center'
                }}
                    onPress={updateProfile}
                >
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Save Changes</Text>
                </TouchableOpacity>

                {renderDatePicker()}

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {
        height: 44,
        width: "100%",
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 6,
        justifyContent: 'center',
        paddingLeft: 0,
        backgroundColor: 'blue',
    }
})

export default EditProfile