import { StyleSheet, Text,TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue', // Change the background color to your desired color
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '60%',
        alignSelf:'center',
        borderRadius:30,
        marginTop:10
      },
      buttonText: {
        color: 'white', // Change the text color to your desired color
        fontSize: 16,
        fontWeight: 'bold',
      },
})