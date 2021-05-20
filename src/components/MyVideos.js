import React, { useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import * as ScreenOrientation from 'expo-screen-orientation';

import { colors, gStyle, fonts } from '../constants';
import SvgPlay from '../components/icons/Svg.Play';

// components
import SvgArrowRight from '../components/icons/Svg.ArrowRight';
import Error from '../components/Error';

function MyVideos({ error, onPress, navigation, user, videos }) {
  const videoUrl = 'https://nollyflix.tv/watch';

  const porTrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  useEffect(() => {
    porTrait();
  }, []);

  return (
    <>
      <Error
        error={error}
        msg="An error while trying to fetch the videos"
        onPress={onPress}
      />

      {typeof videos !== 'undefined' && videos.length === 0 && (
        <View>
          <View style={styles.containerIcon}>
            <SvgPlay fill={colors.bgGrey} size={80} />
          </View>

          <Text style={styles.description}>You have no movies</Text>
        </View>
      )}

      <ScrollView style={{ flex: 1 }}>
        {typeof videos !== 'undefined' && videos.length !== 0 && (
          <View>
            {videos.map((video) => (
              <TouchableWithoutFeedback
                key={video.id}
                style={{ flex: 1, flexDirection: 'column' }}
                onPress={() => {
                  if (
                    video.cart.purchase_type != 'Buy' &&
                    video.is_rent_expired
                  ) {
                    navigation.navigate('VideoDetails', video.video);
                  } else {
                    navigation.navigate('ModalWebView', {
                      url: videoUrl + '/' + video.video.slug,
                      rotate: true
                    });
                  }
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row'
                    }}
                  >
                    <Image
                      style={styles.rectangle}
                      uri={video.video.tn_poster}
                      preview={{ uri: video.video.tn_poster }}
                      tint="light"
                    />

                    <View style={{ justifyContent: 'center' }}>
                      <Text style={styles.text}>{video.video.title}</Text>
                      <Text style={styles.text}>
                        Type: {video.cart.purchase_type}
                      </Text>
                      <Text style={styles.text}>
                        Price: {video.cart.converted_price}
                        {video.is_rent_expired}
                      </Text>

                      {video.cart.purchase_type === 'Rent' && (
                        <Text style={styles.text}>
                          {video.is_rent_expired
                            ? 'Expired'
                            : 'Expires: ' + video.rent_expires_at}
                        </Text>
                      )}
                    </View>
                  </View>

                  <View style={{ justifyContent: 'center' }}>
                    <SvgArrowRight size={30} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  containerIcon: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.downloadsIconBg,
    borderRadius: 96,
    height: 140,
    justifyContent: 'center',
    marginBottom: 32,
    marginTop: 48,
    width: 140
  },
  description: {
    alignSelf: 'center',
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 16,
    marginBottom: 48,
    textAlign: 'center',
    width: 300
  },
  imageContainer: {
    flexDirection: 'row'
  },
  imgContainer: {
    alignItems: 'center',
    marginTop: 20
  },

  rectangle: {
    backgroundColor: colors.infoGrey,
    height: 131,
    width: 91,
    marginRight: 15,
    marginVertical: 5
  },
  rectangleImage: {
    height: 131,
    marginRight: 8,
    resizeMode: 'contain',
    width: 150
  },
  subTile: {
    marginTop: 15
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.regular,
    textAlign: 'left',
    lineHeight: 25
  }
});

export default MyVideos;
