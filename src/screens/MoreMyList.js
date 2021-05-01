import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import { colors, gStyle, fonts } from '../constants';
import useAuth from '../auth/useAuth';

import useApi from '../hooks/useApi';
import watchlistApi from '../api/watchlists';
import SvgPlay from '../components/icons/Svg.Play';

// components
import Header from '../components/Header';
import ActivityIndicator from '../components/ActivityIndicator';

function MoreMyList({ navigation }) {
  const { user } = useAuth();

  const { request: getVideos, data, error, loading } = useApi(
    watchlistApi.watchlists
  );

  useEffect(() => {
    getVideos();
  }, []);

  const videos = data.data;

  const handlePress = (video) => {
    if (video.is_rent_expired) {
      navigation.navigate('VideoDetails', video.video);
    } else {
      navigation.navigate('ModalVideo', {
        video: video.video,
        videoToShow: 'link'
      });
    }
    return;
  };

  if (null == user || typeof user !== 'object') {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          To access your profile, watch videos e.t.c
        </Text>
        <AppButton
          onPress={() => navigation.navigate('LoginScreen')}
          title="Login"
        ></AppButton>
        <Text style={styles.buttonText}>or</Text>
        <View>
          <AppText
            onPress={() => navigation.navigate('RegisterScreen')}
            style={styles.buttonText}
          >
            {' '}
            Sign up
          </AppText>
        </View>
      </View>
    );
  }

  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={gStyle.container}>
        <Header bg={colors.headerBarBg} showBack title="My Videos" />
        {typeof videos !== 'undefined' && videos.length === 0 && (
          <View>
            <View style={styles.containerIcon}>
              <SvgPlay fill={colors.bgGrey} size={80} />
            </View>

            <Text style={styles.description}>You have no movies</Text>
          </View>
        )}

        {typeof videos !== 'undefined' && videos.length !== 0 && (
          <View style={styles.imageContainer}>
            {videos.map((video) => (
              <TouchableWithoutFeedback
                key={video.id}
                onPress={() => {
                  if (video.is_rent_expired) {
                    navigation.navigate('VideoDetails', video.video);
                  } else {
                    navigation.navigate('ModalVideo', {
                      video: video.video,
                      videoToShow: 'link'
                    });
                  }
                }}
              >
                <View style={styles.imgContainer}>
                  <Image
                    style={styles.rectangle}
                    uri={video.video.tn_poster}
                    preview={{ uri: video.video.tn_poster }}
                    tint="light"
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        )}
      </View>
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  imgContainer: {
    alignItems: 'center',
    marginTop: 20
  },

  rectangle: {
    backgroundColor: colors.infoGrey,
    height: 131,
    marginRight: 5,
    width: 91
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
    textAlign: 'center',
    lineHeight: 25
  }
});

export default MoreMyList;
