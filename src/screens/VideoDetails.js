
/**
 * This is for the info link
 */
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { FlatList, Image, ImageBackground, Platform, StyleSheet, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import ReadMore from 'react-native-read-more-text';
import Constants from "expo-constants";


import { gStyle } from '../constants';
import { colors, fonts} from '../constants';
import useAuth from "../auth/useAuth";





// components
import PromotionPlay from '../components/PromotionPlay';
import VideoDetailsIcon from '../components/VideoDetailsIcon';
import Screen from '../components/Screen';

import Header from '../components/Header';
import SvgRent from '../components/icons/Svg.Rent';
import SvgBuy from '../components/icons/Svg.Buy';
import SvgArrowLeft from '../components/icons/Svg.ArrowLeft';









function VideoDetails({ navigation }) {

    const video = navigation.state.params
    const watchText = video.access_type == 'is_free' ? 'Watch' : 'Preview';
    const checkoutUrl = 'https://nollyflix.tv/checkout';
    const rentText = 'Rent  ₦' + video.converted_rent_price
    const buyText = 'Buy  ₦' +  video.converted_buy_price

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

    const imgH = video.rent_price > 1 && video.buy_price  > 1 ? 500 : 400;
    const genreTop = video.rent_price > 1 && video.buy_price  > 1 ? "63%" : "78%";
    const ButtonTop = video.rent_price > 1 && video.buy_price  > 1 ? "71%" : "88%";
    const link = video.rent_price > 1 && video.buy_price  > 1 ? "link" : "preview_link";


    const marginTop =  Platform.OS === 'ios' ? Constants.statusBarHeight  + 10 : Constants.statusBarHeight  + 25;
    



    return (
        
        <View  style={gStyle.container}>
            <ScrollView>
                <ImageBackground
                    blurRadius={30}
                    source={{ uri: video.tn_poster }}
                    style={[styles.imageBackground,{ height: imgH}]}
                >   

                <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.goBack(null)}
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 50,
                        }}
                    >
                    <SvgArrowLeft size={37} />
                </TouchableOpacity>

                <Image  style={{  height: 250 , width: 200 , marginTop: marginTop }} source={{ uri: video.tn_poster }}/>

                <View style={[gStyle.flexRow, styles.genre, { top: genreTop }]}>
                    <Text style={[styles.text,gStyle.mR16]}>{video.year_release} </Text>
                    <Text style={[styles.text, styles.pg,gStyle.mR16]}>{video.film_rating}</Text>
                    <Text style={[styles.text,gStyle.mR16]}>{video.duration}</Text>
                    <Text style={[styles.text,styles.hd]}>{video.resolution}</Text>
                </View>

                <View style={[styles.previewButton, { top: ButtonTop }]}>
                    <PromotionPlay 
                        text={watchText}  
                        textColor='black' 
                        color = 'white'
                        iconColor="black" 
                        pV={8} 
                        onPress={() => navigation.navigate('ModalVideo',{"video": video,"videoToShow": link})} 
                    />
                    { video.rent_price > 1 && ( 
                        <PromotionPlay 
                            text={rentText} 
                            icon={<SvgRent  size={30} />} 
                            textColor='white' 
                            color = 'main'  
                            iconColor="red" 
                            p={7} 
                            pV={2}
                            onPress={() => {
                                if (user) {
                                    navigation.navigate('ModalWebView', { url: checkoutUrl+'?type=Rent&videoid='+ video.id +'&price='+ video.converted_rent_price +'&userid='+ user.id ,"next" : 'VideoDetails' } );
                                } else {
                                    navigation.navigate('LoginScreen',{"next": "payment","video": video ,"type": "Rent"});
                                }
                            }} 
                        />
                    )}

                    { video.buy_price > 1 && ( 
                        <PromotionPlay 
                            text={buyText} 
                            icon={<SvgBuy size={30} />} 
                            textColor='white' 
                            iconColor="red"  
                            color = 'main'  
                            p={7} 
                            pV={2}
                            onPress={() => {
                                if (user) {
                                    navigation.navigate('ModalWebView', { url: checkoutUrl+'?type=Buy&videoid='+ video.id +'&price='+ video.converted_buy_price +'&userid='+ user.id, "next" : 'VideoDetails' } );
                                } else {
                                    navigation.navigate('LoginScreen',{"next": "payment", "video": video ,"type": "Buy"})
                                }
                            }} 
                        />
                    )}
                </View>
            
            </ImageBackground>
            <View  style={gStyle.mV24}> 
                <VideoDetailsIcon />
                    <View style={gStyle.mV16}>
                        <ReadMore
                            numberOfLines={2}
                            renderTruncatedFooter={_renderTruncatedFooter}
                            renderRevealedFooter={_renderRevealedFooter}>
                            <Text style={styles.text}>{video.description}</Text>
                        </ReadMore>
                    </View>
                    <View style={{ flexDirection: "row", flex: 1, flexWrap: "wrap",marginVertical: 1}}>
                        <Text style={styles.text}>Starring: </Text>
                        {video.casts.map(cast => (
                            <TouchableOpacity 
                                key={cast.id} 
                                activeOpacity={0.7} 
                                onPress={() => navigation.navigate('CastDetails',cast)}
                            >
                            <Text style={[styles.text, gStyle.mH5]}>{cast.name} {cast.last_name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={{ flexDirection: "row", flex: 1, flexWrap: "wrap",marginVertical: 1}}>
                        <Text style={styles.text}>Produced By: </Text>
                        {video.filmers.map(producer => (
                            <TouchableOpacity 
                                key={producer.id} 
                                activeOpacity={0.7} 
                                onPress={() => navigation.navigate('CastDetails',producer)}
                            >
                            <Text style={[styles.text, gStyle.mH5]}>{producer.name} {producer.last_name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {   
                        video.related_videos && video.related_videos.length 
                        ?
                            <View  style={{ marginBottom: 20 }}>
                                <Text style={[gStyle.heading,{textTransform: 'uppercase', fontSize: 16, marginBottom: 20}]}>More Like This</Text>
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
    container: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 4,
        paddingHorizontal: 16,
        paddingTop:  30
      },
    back: {
      alignSelf: 'center',
      flex: 1
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: colors.white,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        padding: 11,
        width: "100%",
        marginVertical:1
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: "bold"
    },
    hd:{
        backgroundColor: colors.bgGrey,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 9,
    },
    pg:{
        padding: 4,
        fontSize: 13,
        color: "red"
    },
    imageBackground: {
        alignItems: "center",
        flex: 1,
        resizeMode: "contain",

    },
    image: {
        alignSelf: 'center',
        height: 69,
        marginBottom: 24,
        width: 291
    },
    genre:{
        position: 'absolute',
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
        position: 'absolute',
        width: '100%',
        zIndex: 1,
        padding: 2,
    },
    text: {
        color: colors.white,
        fontSize: 13,
        fontFamily: fonts.regular,
        textAlign: 'left',
        lineHeight: 25,
        marginVertical:1

    },
    
});

export default VideoDetails;

