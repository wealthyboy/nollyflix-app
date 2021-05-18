import React, { useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import { colors, gStyle, fonts } from '../constants';
import useAuth from '../auth/useAuth';

import useApi from '../hooks/useApi';
import watchlistApi from '../api/watchlists';
import SvgPlay from '../components/icons/Svg.Play';

// components
import Header from '../components/Header';
import ActivityIndicator from '../components/ActivityIndicator';
import SvgArrowRight from '../components/icons/Svg.ArrowRight';
import Error from '../components/Error';
import Auth from '../components/Auth';
import MyVideos from '../components/MyVideos';

function MoreMyList({ navigation }) {
  const { user } = useAuth();

  const { request: getVideos, data, error, loading } = useApi(
    watchlistApi.watchlists
  );

  useEffect(() => {
    getVideos();
  }, []);

  const videos = data.data;

  if (!user) {
    return (
      <Auth
        navigation={navigation}
        user={user}
        text="Please sign in to access your videos"
      />
    );
  }

  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={gStyle.container}>
        <Header
          bg={colors.headerBarBg}
          navigation={navigation}
          showBack
          title="My Videos"
        />
        <MyVideos
          error={error}
          user={user}
          onPress={getVideos}
          videos={videos}
          navigation={navigation}
        />
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

export default MoreMyList;
