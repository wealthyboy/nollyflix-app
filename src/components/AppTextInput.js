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
                placeholderTextColor={colors.infoGrey}
            ></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 55,
        marginTop: 20,
        marginLeft: 3,
        marginRight: 3,
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
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#dadae8',
        backgroundColor: colors.downloadsIconBg,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 18

      },

})
