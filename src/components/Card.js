import React from 'react'
import {  StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import AppText from '../components/AppText'
import { Image } from "react-native-expo-image-cache";
import { gStyle , colors } from '../constants';


export default function Card({ title, subTitle,imageUrl ,onPress, thumbnailUrl}) {
    return (
        <TouchableWithoutFeedback  onPress={onPress}>
            <View>
                <Image 
                    style={styles.round} 
                    uri={imageUrl} 
                    preview={{ uri: imageUrl}}
                    tint="light"
                />
                
            </View>
        </TouchableWithoutFeedback>
        
    )
}

const styles = StyleSheet.create({
    
    round: {
        backgroundColor: colors.infoGrey,
        borderRadius: 48,
        height: 96,
        marginRight: 8,
        width: 96
    },
    
})
