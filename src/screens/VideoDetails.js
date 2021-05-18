/**
 * This is for the info link
 */
import React, { useState } from 'react';

import {
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ImageBackground
} from 'react-native';

import ReadMore from 'react-native-read-more-text';

import { colors, gStyle, fonts } from '../constants';
import useAuth from '../auth/useAuth';

// components
import HeaderTransparent from '../components/HeaderTransparent';

import PromotionPlay from '../components/PromotionPlay';
import VideoDetailsIcon from '../components/VideoDetailsIcon';

import SvgRent from '../components/icons/Svg.Rent';
import SvgBuy from '../components/icons/Svg.Buy';
import SvgPlay from '../components/icons/Svg.Play';

import VideoPlayer from './VideoPlayer';

function VideoDetails({ route, navigation }) {
  const { user } = useAuth();
  const video = route.params.video;

  const checkoutUrl = 'https://nollyflix.tv/carts';
  const videoUrl = 'https://nollyflix.tv/watch/' + video.slug + '?watch=free';
  const rentText = 'Rent  ₦' + video.converted_rent_price;
  const buyText = 'Buy  ₦' + video.converted_buy_price;
  const [playPreview, setPlayPreview] = useState(false);

  const _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{ color: 'pink', marginTop: 5 }} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  const _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{ color: 'pink', marginTop: 5 }} onPress={handlePress}>
        Show less
      </Text>
    );
  };

  const icon = <SvgPlay size={70} />;

  return (
    <View style={gStyle.container}>
      <HeaderTransparent navigation={navigation} controlsOpacity={1} />
      {playPreview && <VideoPlayer video={video} />}

      {!playPreview && (
        <ImageBackground
          source={{ uri: video.tn_poster }}
          style={styles.imageBackground}
        >
          <TouchableOpacity
            hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
            onPress={() => setPlayPreview(true)}
            style={{ position: 'absolute' }}
          >
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                width: 70,
                height: 70,
                borderRadius: 35,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center'
              }}
            >
              <SvgPlay />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      )}

      <ScrollView>
        <View>
          {video.rent_price > 1 && (
            <PromotionPlay
              text={rentText}
              icon={<SvgRent size={30} />}
              textColor="black"
              color="white"
              iconColor="black"
              p={7}
              pV={2}
              onPress={() => {
                if (user) {
                  navigation.navigate('ModalWebView', {
                    url:
                      checkoutUrl +
                      '?type=Rent&video_id=' +
                      video.id +
                      '&from=app&price=' +
                      video.converted_rent_price +
                      '&token=' +
                      user.token +
                      '&email=' +
                      user.email +
                      '&userid=' +
                      user.id,
                    next: 'VideoDetails'
                  });
                } else {
                  navigation.navigate('LoginScreen', {
                    next: 'payment',
                    video: video,
                    type: 'Rent'
                  });
                }
              }}
            />
          )}

          {video.buy_price > 1 && (
            <PromotionPlay
              text={buyText}
              icon={<SvgBuy size={30} />}
              textColor="white"
              iconColor="red"
              color="castGrey"
              p={7}
              pV={2}
              onPress={() => {
                if (user) {
                  navigation.navigate('ModalWebView', {
                    url:
                      checkoutUrl +
                      '?type=Buy&video_id=' +
                      video.id +
                      '&from=app&price=' +
                      video.converted_buy_price +
                      '&token=' +
                      user.token +
                      '&userid=' +
                      user.id +
                      '&email=' +
                      user.email +
                      user.id,
                    next: 'VideoDetails',
                    rotate: false
                  });
                } else {
                  navigation.navigate('LoginScreen', {
                    next: 'payment',
                    video: video,
                    type: 'Buy'
                  });
                }
              }}
            />
          )}

          {video.buy_price < 1 && video.rent_price < 1 && (
            <PromotionPlay
              text="Watch"
              icon={<SvgPlay size={30} />}
              textColor="white"
              iconColor="red"
              color="castGrey"
              p={7}
              pV={2}
              onPress={() => {
                navigation.navigate('ModalWebView', {
                  url: videoUrl,
                  rotate: true
                });
              }}
            />
          )}
        </View>
        <View style={gStyle.mV16}>
          <Text
            style={[
              styles.heading,
              { textTransform: 'uppercase', marginBottom: 1 }
            ]}
          >
            {video.title}
          </Text>
          <View style={[gStyle.flexRow]}>
            <Text style={[styles.text, gStyle.mR16]}>
              {video.year_release}{' '}
            </Text>
            <Text style={[styles.text, styles.pg, gStyle.mR16]}>
              {video.film_rating}
            </Text>
            <Text style={[styles.text, gStyle.mR16]}>{video.duration}</Text>
            <Text style={[styles.text, styles.hd]}>{video.resolution}</Text>
          </View>
          <View>
            <ReadMore
              numberOfLines={2}
              renderTruncatedFooter={_renderTruncatedFooter}
              renderRevealedFooter={_renderRevealedFooter}
            >
              <Text style={[styles.text, { fontSize: 15 }]}>
                {video.description}
              </Text>
            </ReadMore>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              marginVertical: 7
            }}
          >
            <Text style={styles.text}>Starring: </Text>
            {video.casts.map((cast) => (
              <TouchableOpacity
                key={cast.id}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('CastDetails', cast)}
              >
                <Text style={[styles.text, gStyle.mH5]}>
                  {cast.name} {cast.last_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              marginBottom: 20
            }}
          >
            <Text style={[styles.text, { color: colors.textGrey }]}>
              Produced By:
            </Text>
            {video.filmers.map((producer) => (
              <TouchableOpacity
                key={producer.id}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('CastDetails', producer)}
              >
                <Text
                  style={[styles.text, gStyle.mH5, { color: colors.textGrey }]}
                >
                  {producer.name} {producer.last_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <VideoDetailsIcon />

          {video.related_videos && video.related_videos.length ? (
            <View style={{ marginBottom: 20 }}>
              <Text
                style={[
                  gStyle.heading,
                  { textTransform: 'uppercase', fontSize: 16, marginBottom: 20 }
                ]}
              >
                More Like This
              </Text>
              <FlatList
                contentContainerStyle={{ paddingHorizontal: 4 }}
                data={video.related_videos}
                horizontal
                keyExtractor={(video) => video.id.toString()}
                renderItem={({ item }) => {
                  let renderItem = <View style={styles.rectangle} />;
                  if (item.video.tn_poster) {
                    renderItem = (
                      <TouchableWithoutFeedback
                        onPress={() =>
                          navigation.navigate('VideoDetails', {
                            video: item.video
                          })
                        }
                      >
                        <Image
                          source={{ uri: item.video.tn_poster }}
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
          ) : (
            <View></View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
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
    width: '100%',
    marginVertical: 1
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  hd: {
    backgroundColor: colors.bgGrey,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 9
  },
  pg: {
    padding: 4,
    fontSize: 13,
    color: 'red'
  },
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    width: '100%',
    height: 300,
    zIndex: 1
  },
  image: {
    alignSelf: 'center',
    height: 69,
    marginBottom: 24,
    width: 291
  },
  genre: {
    position: 'absolute'
  },
  heading: {
    color: colors.heading,
    fontFamily: fonts.bold,
    fontSize: 22,
    marginBottom: 4,
    marginLeft: 4,
    fontWeight: 'bold'
  },
  rectangle: {
    backgroundColor: colors.infoGrey,
    height: 161,
    marginRight: 8,
    width: 121
  },

  rectangleImage: {
    height: 161,
    marginRight: 8,
    resizeMode: 'cover',
    width: 121
  },
  previewButton: {
    zIndex: 1,
    padding: 2,
    position: 'absolute'
  },
  text: {
    color: colors.white,
    fontSize: 13,
    fontFamily: fonts.regular,
    textAlign: 'left',
    lineHeight: 25,
    marginVertical: 1
  }
});

export default VideoDetails;
