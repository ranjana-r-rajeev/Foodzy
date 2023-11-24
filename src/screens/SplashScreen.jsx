import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            // Navigate to the login screen after 5 seconds
            navigation.replace('Login');
        }, 5000);

        return () => clearTimeout(timer); // Clear the timeout if the component is unmounted
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/launch_screen.png')}
                style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default SplashScreen;
