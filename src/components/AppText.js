import React from 'react'
import {  StyleSheet, Platform,TouchableOpacity, Text, View } from 'react-native'


export default function AppText({children, otherStyle, onPress, ...otherProps}) {
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
            >
                <Text {...otherProps} style={[styles.text, otherStyle]}>{children}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    
    text: {
        color: "#ffffff",
        fontSize: 18,
        marginBottom: 5
    }
    
})