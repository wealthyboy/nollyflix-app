import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { gStyle } from '../constants';

// components
import Header from '../components/Header';
import ActivityIndicator  from '../components/ActivityIndicator'


export default function ModalWebView({ navigation }) {
  const [visible, setVisible] = useState(false);
  const route = navigation.state.params


  return (
    <View style={gStyle.container}>
      <Header close closeText="Close"  showLogo />
      <WebView
        bounces={false}
        javaScriptEnabled
        scalesPageToFit
        source={{ uri: navigation.getParam('url', 'https://nollyflix.tv') }}
        startInLoadingState
        onLoadStart={() => setVisible(true)}
        onLoad={() => setVisible(false)}
      />
       <ActivityIndicator visible={visible} />
    </View>
  )

}


ModalWebView.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

