import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, gStyle } from '../constants';
import useAuth from '../auth/useAuth';

import useApi from '../hooks/useApi';
import watchlistApi from '../api/watchlists';

// components
import ActivityIndicator from '../components/ActivityIndicator';

import Header from '../components/Header';

// icons
import Auth from '../components/Auth';
import MyVideos from '../components/MyVideos';

function Downloads({ route, navigation }) {
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
        <Header bg={colors.headerBarBg} title="My Videos" />

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
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    padding: 16
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center'
  }
});

export default Downloads;
