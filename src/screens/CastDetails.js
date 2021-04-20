
/**
 * This is for the info link
 */
import * as React from 'react';
import { FlatList, Image, ImageBackground, StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { gStyle, images } from '../constants';
import { withNavigation } from 'react-navigation';
import { colors, fonts} from '../constants';
import mockData from '../mockdata/data';




// components
import Header from '../components/Header';
import AppText from '../components/AppText';


class CastDetails extends React.Component {
    constructor(props) {
       super(props);

       this.state = {
        is_ready: true,
      };
 
    }

  

  render() {
    
    const { navigation } = this.props;    
    const cast = navigation.state.params


    return (
        <View  style={gStyle.container}>
            <Header  showBack />

            <ScrollView
                bounces
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >

                <ImageBackground
                    blurRadius={30}
                    source={{ uri: cast.profile_picture }}
                    style={styles.imageBackground}
                >    
                    <Image  style={{  height: 200 , width: 200  ,marginVertical: 50 }} source={{ uri: cast.profile_picture }}/>
                    <View style={[gStyle.flexRow, styles.genre]}>
                        <Text style={[styles.text,gStyle.mR16]}>{cast.name}  {cast.last_name} </Text>
                    </View>
               </ImageBackground>
                <View style={[gStyle.mH20, gStyle.mV16]}> 
                    <View>
                        <Text style={[styles.text,gStyle.mR16]}>{cast.description}</Text>
                    </View>
                    <View>
                        <FlatList
                          contentContainerStyle={{ paddingHorizontal: 4 }}
                          data={cast.cast_videos}
                          horizontal
                          keyExtractor={( cast ) => cast.id.toString()}
                          renderItem={({ item }) => (
                            <AppText  otherStyle={styles.text} onPress={() => console.log(item)} >  {item.name} {item.last_name}, </AppText>
                           )}
                          showsHorizontalScrollIndicator={false}
                         />
                    </View>
                </View>
            </ScrollView>
        </View>

    );
  }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: colors.white,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        padding: 11,
        width: "100%",
        marginVertical: 5
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: "bold"
    },
    hd:{
        backgroundColor: colors.bgGrey,
        padding: 6,
        fontSize: 13,
    },
    pg:{
        padding: 4,
        fontSize: 13,
        color: "red"
    },
    imageBackground: {
        height: 300,
        alignItems: "center"
    },
    image: {
        alignSelf: 'center',
        height: 69,
        marginBottom: 24,
        width: 291
    },
    genre:{
        position: 'absolute',
        top: "50%",
        marginVertical:16,
    },
    rectangle: {
        backgroundColor: colors.infoGrey,
        height: 131,
        marginRight: 8,
        width: 91
    },
    rectangleImage: {
        height: 131,
        marginRight: 8,
        resizeMode: 'contain',
        width: 91
    },
    previewButton: {
        top: "57%",
        position: 'absolute',
        width: '100%',
        zIndex: 1,
        padding: 20,
    },
    text: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.regular,
        textAlign: 'left',
        lineHeight: 25
    },
    
});

export default withNavigation(CastDetails);

