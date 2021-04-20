import React  from 'react';
import { View, StyleSheet, TouchableWithoutFeedback ,Text } from 'react-native';


import { colors, fonts, gStyle} from '../constants';

// components
import AppText from '../components/AppText';
import { Image } from "react-native-expo-image-cache";





function Casts({ data, navigation, title, subTitle }) {

    return (
            
        <>
             
            <View style={styles.headingSection}>
                <Text style={[gStyle.heading]}>{title}</Text>
                <Text style={styles.text}>{subTitle}</Text>
            </View>
      
            <View style={styles.imageContainer}>
                {data.map(cast => (
                    <TouchableWithoutFeedback 
                        key={cast.id}  
                        onPress={() => navigation.navigate('CastDetails',cast)}
                        >
                        <View style={styles.imgContainer}>
                            <Image 
                                style={styles.round} 
                                uri={cast.profile_picture} 
                                preview={{ uri: cast.profile_picture}}
                                tint="light"
                            />
                            <AppText otherStyle={styles.subTile} 
                                    onPress={() => navigation.navigate('CastDetails',cast)}
                                >{cast.name} {cast.last_name}</AppText>
                        </View>
                    </TouchableWithoutFeedback>
                ))}  
           </View>
        </>
      
    )
}


const styles = StyleSheet.create({
    headingSection: {
        marginTop: 90,
        alignItems: "center",
        justifyContent: "center"
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        alignItems: "center"
    },
    imgContainer:{
        alignItems: "center", 
        marginTop: 20
    },
    round: {
        backgroundColor: colors.infoGrey,
        borderRadius: 75,
        height: 150,
        marginRight: 8,
        width: 150,
        marginTop: 10,
        resizeMode: 'contain',

    },
    subTile:{
        marginTop: 15
    },
    text: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.regular,
        textAlign: 'center',
        lineHeight: 25,
    },
});

export default Casts;
