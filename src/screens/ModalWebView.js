import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { gStyle } from '../constants';
import * as ScreenOrientation from 'expo-screen-orientation';

// components
import Header from '../components/Header';
import ActivityIndicator from '../components/ActivityIndicator';
import HeaderHome from '../components/HeaderHome';
import HeaderTransparent from '../components/HeaderTransparent';

export default function ModalWebView({ navigation, route }) {
  const [visible, setVisible] = useState(false);

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

  const handleOrientation = (state) => {
    if (typeof state !== 'undefined') {
      if (state.url.split('/')[3] === 'watch') {
        landScape();
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
      <HeaderTransparent navigation={navigation} controlsOpacity={1} />

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
