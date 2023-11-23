import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Settings = () => {

    const navigateToReportProblem = () => {
        console.log("Report a problem");
    };

    const addAccount = () => {
        console.log("Add account ");
    };

    const logout = () => {
        console.log("Logout");
    };


    return (
        <ScrollView>
            <View>
                <Text style={styles.text}>Account</Text>
                <View style={styles.superview}>
                    <View style={styles.view}>
                        <Icon name="security" size={25} color="blue" />
                        <Text style={styles.text}>Security</Text>
                    </View>
                    <View style={styles.view}>
                        <Icon name="notifications" size={25} color="blue" />
                        <Text style={styles.text}>Notifications</Text>
                    </View>
                    <View style={styles.view}>
                        <Icon name="lock" size={25} color="blue" />
                        <Text style={styles.text}>Privacy</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.text}>Support & About</Text>
                <View style={styles.superview}>
                    <View style={styles.view}>
                        <Icon name="help" size={25} color="blue" />
                        <Text style={styles.text}>Help & Support</Text>
                    </View>
                    <View style={styles.view}>
                        <Icon name="info" size={25} color="blue" />
                        <Text style={styles.text}>Terms & Policies</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.text}>Your App & media</Text>
                <View style={styles.superview}>
                    <View style={styles.view}>
                        <Icon name="language" size={25} color="blue" />
                        <Text style={styles.text}>Language</Text>
                    </View>
                    <View style={styles.view}>
                        <Icon name="man" size={25} color="blue" />
                        <Text style={styles.text}>Accessibility</Text>
                    </View>
                    <View style={styles.view}>
                        <Icon name="save-alt" size={25} color="blue" />
                        <Text style={styles.text}>Archiving & downloading</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.text}>Actions</Text>
                <View style={styles.superview}>
                    <View style={styles.view}>
                        <Icon name="flag" size={25} color="blue" onPress={navigateToReportProblem} />
                        <Text style={styles.text}>Report a problem</Text>
                    </View>
                    <View style={styles.view}>
                        <Icon name="people" size={25} color="blue" onPress={addAccount} />
                        <Text style={styles.text}>Add Account</Text>
                    </View>
                    <View style={styles.view}>
                        <Icon name="logout" size={25} color="blue" onPress={logout} />
                        <Text style={styles.text}>Log out</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Settings

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        padding: 3,
    },
    superview: {
        flexDirection: 'column',
        padding: 3,
        backgroundColor: 'rgba(230, 230, 230, 1)',
        borderRadius: 20,
        paddingLeft: 10,
        marginBottom: 15,
        marginTop: 10,
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'black'
    }
})