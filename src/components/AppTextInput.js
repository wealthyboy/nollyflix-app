import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { MaterialCommunityIcons }  from '@expo/vector-icons'
import { colors } from '../constants';


export default function AppTextInput({icon,...otherProps}) {
    return (
        <View style={styles.container}>
            { icon && <MaterialCommunityIcons name={icon} size={20}  style={styles.icon} />}
            <TextInput
                style={styles.inputStyle}
                {...otherProps}
                placeholderTextColor={colors.medium}
            ></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        marginTop: 20,
        marginLeft: 1,
        marginRight: 1,
    },
    icon: {
       marginRight: 10,
    },
    text: {
        color: colors.dark,
        fontSize: 18,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 1,
        paddingRight: 1,
        borderWidth: 1,
        borderRadius: 1,
        borderColor: '#dadae8',
      },

})
