import React from 'react'
import { StyleSheet, Text,TouchableOpacity } from 'react-native'

import { colors } from '../constants';

export default function AppButton({title, onPress, color = 'primary'}) {
    return (
        <TouchableOpacity style={[styles.button]}  onPress={onPress}>
           <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
       backgroundColor: "red",
       borderRadius: 25,
       justifyContent: 'center',
       alignItems: 'center',
       padding: 15,
       width: '100%',
       marginVertical: 10
    },
    text : {
        color: colors.white,
        fontSize: 18,
        textTransform: "capitalize",
        fontWeight: 'bold'
    }

})
