import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { gStyle } from '../constants';
import * as ScreenOrientation from 'expo-screen-orientation';

// components
import Header from '../components/Header';
import ActivityIndicator from '../components/ActivityIndicator';
import HeaderTransparent from '../components/HeaderTransparent';

import meApi from '../api/me';
import useAuth from '../auth/useAuth';

export default function ModalWebView({ navigation, route }) {
  const [visible, setVisible] = useState(false);
  const [backScreen, setBackScreen] = useState(false);
  const [transparentHeader, setTransparentHeader] = useState(false);
  const { logIn } = useAuth();

  let router = typeof route.params !== 'undefined' ? route.params : null;

  const [controlsOpacity] = useState(new Animated.Value(0));
  const [shouldRotate, setShouldRotate] = useState(router.rotate || false);

  const landScape = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  };

  const porTrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  const reLogin = async () => {
    const res = await meApi.me();
    if (!res.ok) {
      console.log(res);
      return;
    }

    console.log(res);
    logIn(res.data.data, res.data.token);
  };

  const handleOrientation = (state) => {
    console.log(state);
    if (typeof state !== 'undefined') {
      if (state.url.split('/')[3] === 'watch') {
        landScape();
        setTransparentHeader(true);
        reLogin();
      }
    }
  };

  if (shouldRotate) {
    useEffect(() => {
      landScape();
      return () => {
        porTrait();
      };
    }, []);
  }

  return (
    <View style={gStyle.container}>
      {transparentHeader && (
        <HeaderTransparent navigation={navigation} controlsOpacity={1} />
      )}
      {!transparentHeader && (
        <Header
          navigation={navigation}
          close
          closeText="Close"
          showBack
          showLogo
        />
      )}

      <WebView
        bounces={false}
        javaScriptEnabled
        scalesPageToFit
        source={{ uri: router.url || 'https://nollyflix.tv' }}
        startInLoadingState
        onLoadStart={() => setVisible(true)}
        onLoad={() => setVisible(false)}
        onNavigationStateChange={handleOrientation}
      />
      <ActivityIndicator visible={visible} />
    </View>
  );
}

ModalWebView.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};
