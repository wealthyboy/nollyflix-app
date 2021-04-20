import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Video } from 'expo';

export default class App extends React.Component {
  render() {

    // Set video dimension based on its width, so the video doesn't stretched on any devices.
    // The video dimension ratio is 11 : 9 for width and height
    let videoWidth = Dimensions.get('window').width;
    let videoHeight = windowWidth / 11 * 9 ;

    return (
      <View style={styles.container}>
        <Video
          source={{ uri: 'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8' }}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          style={{ width: videoWidth, height: videoHeight }}/>

        {/* Replace this with comment section like Youtube */}
        <Text>width * height = {videoWidth} * {videoHeight}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});