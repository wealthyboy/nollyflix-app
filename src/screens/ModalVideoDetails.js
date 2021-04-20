
/**
 * This is for the info link
 */
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { FlatList, Image, ImageBackground, StyleSheet, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import ReadMore from 'react-native-read-more-text';


import { gStyle } from '../constants';
import { colors, fonts} from '../constants';
import useAuth from "../auth/useAuth";





// components
import PromotionPlay from '../components/PromotionPlay';
import Header from '../components/Header';
import AppText from '../components/AppText';
import TouchText from '../components/TouchText';
import SvgRent from '../components/icons/Svg.Rent';
import SvgBuy from '../components/icons/Svg.Buy';








function ModalVideoDetails({ navigation }) {

    const video = navigation.state.params
    const watchText = video.access_type == 'is_free' ? 'Watch' : 'Preview';
    const checkoutUrl = 'https://nollyflix.tv/checkout';
    const { user } = useAuth()
    const handleOpenWithWebBrowser = () => {
        WebBrowser.openBrowserAsync(checkoutUrl);
    };

    

    const _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{color: "pink", marginTop: 5}} onPress={handlePress}>
            Read more
          </Text>
        );
      }
    
    const _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{color: "pink", marginTop: 5}} onPress={handlePress}>
            Show less
          </Text>
        );
      }

    return (
        <View  style={gStyle.container}>
            <ScrollView
                bounces
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                <Header  showBack />
                <ImageBackground
                    blurRadius={30}
                    source={{ uri: video.tn_poster }}
                    style={styles.imageBackground}
                >    
                    <Image  style={{  height: 200 , width: 200 , marginVertical: 50 }} source={{ uri: video.tn_poster }}/>
                    <View style={[gStyle.flexRow, styles.genre]}>
                        <Text style={[styles.text,gStyle.mR16]}>{video.year_release} </Text>
                        <Text style={[styles.text, styles.pg,gStyle.mR16]}>{video.film_rating}</Text>
                        <Text style={[styles.text,gStyle.mR16]}>{video.duration}</Text>
                        <Text style={[styles.text,styles.hd]}>{video.resolution}</Text>
                    </View>
                    <View style={styles.previewButton}>
                        <View style={gStyle.flexRowSpace}>
                            <PromotionPlay text={watchText}  textColor='black' color = 'white'  onPress={() => navigation.navigate('ModalVideo',{"video": video.video,"videoToShow": "preview_link"})} />
                        </View>
                
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    if (user) {
                                        navigation.navigate('ModalWebView', { url: checkoutUrl+'?type=Rent&videoid='+ video.id +'&price='+ video.converted_rent_price +'&userid='+ user.id ,"next" : 'VideoDetails' } );
                                    } else {
                                        navigation.navigate('LoginScreen',{"next": "payment","video": video ,"type": "Rent"});
                                    }
                                }}
                            >  
        
                                <View style={styles.button}>
                                    <View>
                                        <SvgRent size={40} />
                                    </View>
                                    <Text style={styles.buttonText}>Rent {video.converted_rent_price}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    if (user) {
                                        navigation.navigate('ModalWebView', { url: checkoutUrl+'?type=Buy&videoid='+ video.id +'&price='+ video.converted_buy_price +'&userid='+ user.id, "next" : 'VideoDetails' } );
                                    } else {
                                        navigation.navigate('LoginScreen',{"next": "payment", "video": video ,"type": "Buy"})
                                    }
                                }}
                
                            >
                                <View style={styles.button}>
                                    <View>
                                        <SvgBuy size={40} />
                                    </View>
                                    
                                    <Text style={styles.buttonText}>Buy {video.converted_buy_price}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                                        
                    </View>
               
               </ImageBackground>
                <View style={[gStyle.mH20, gStyle.mV16]}> 
                    <View>
                        <ReadMore
                            numberOfLines={2}
                            renderTruncatedFooter={_renderTruncatedFooter}
                            renderRevealedFooter={_renderRevealedFooter}>
                            <Text style={styles.text}>{video.description}</Text>
                        </ReadMore>

                    </View>
                    <View style={{ flexDirection: "row", flex: 1, flexWrap: "wrap",marginVertical: 10}}>
                        <Text style={styles.text}>Starring: </Text>
                        {video.casts.map(cast => (
                            <TouchableOpacity key={cast.id} activeOpacity={0.7} onPress={() => console.log(cast)}>
                               <Text style={[styles.text, gStyle.mH5]}>{cast.name} {cast.last_name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {   
                        video.related_videos && video.related_videos.length 
                        ?
                            <View  style={{ marginBottom: 20 }}>
                                <Text style={[gStyle.heading,gStyle.mR16,{textTransform: 'uppercase', fontSize: 16, marginBottom: 20}]}>More Like This</Text>
                                <FlatList
                                    contentContainerStyle={{ paddingHorizontal: 4 }}
                                    data={video.related_videos}
                                    horizontal
                                    keyExtractor={( video ) => video.id.toString()}
                                    renderItem={({ item }) => {
                                        let renderItem = <View  style={styles.rectangle} />;
                                        if (item.video.tn_poster) {
                                            renderItem = (
                                                <TouchableWithoutFeedback 
                                                    onPress={() => navigation.navigate('VideoDetails',item.video)} 
                                                >
                                                    <Image
                                                        source={{uri: item.video.tn_poster}}
                                                        style={styles.rectangleImage} 
                                                    />
                                                </TouchableWithoutFeedback>
                                            );
                                        }
                                        return renderItem;
                                    }}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        : <View></View>
                    } 
                    
                </View>
                
            </ScrollView>
        </View>

    );
  }


const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
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
        height: 500,
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
        lineHeight: 25,
    },
    
});

export default ModalVideoDetails;

