import React, { useEffect}  from 'react';
 import { Video } from 'expo-av'
 import { Platform, StatusBar, StyleSheet, View, Text, TouchableHighlight } from 'react-native';
 import * as ScreenOrientation from 'expo-screen-orientation';



export default class ModalVideo extends React.Component {

  
  async componentDidMount() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
  }


  async componentWillUnmount() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }


  state = {
    useNativeControls: true,
    toggleOnInstance: false,
    shouldPlay: true,
  };

  handleVideoRef = ref => {
    this.videoInstance = ref;
  };

  handleLoadStart = () => console.log('Loading...');
  handleLoaded = params => console.log('Video loaded:', params);
  handleProgress = params => console.log('Video status change:', params);
  handleError = error => console.error(error);

  toggleOnInstance = async () => {
    if (this.videoInstance) {
      if (this.state.shouldPlay) {
        await this.videoInstance.pauseAsync();
        this.setState({ shouldPlay: false });
      } else {
        await this.videoInstance.playAsync();
        this.setState({ shouldPlay: true });
      }
    }
  };

  toggleShouldPlay = () => this.setState({ shouldPlay: !this.state.shouldPlay });

  renderPlayPauseButton = () =>
    !this.state.useNativeControls ? (
      <TouchableHighlight
        style={styles.button}
        underlayColor="rgba(0,0,0,0.5)"
        onPress={this.state.toggleOnInstance ? this.toggleOnInstance : this.toggleShouldPlay}>
        <Text style={styles.buttonText}>{this.state.shouldPlay ? '⏸' : '▶️'}</Text>
      </TouchableHighlight>
    ) : null;

  render() {

    const { navigation } = this.props;  
    const video = navigation.state.params
    const vTw = navigation.state.params.videoToShow
    const link = video.video[vTw]

    const videoUrl = vTw == 'preview_link' ? {uri: video.video[vTw]} : {uri: video.video.link, overrideFileExtensionAndroid: "m3u8"};
  
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        <Video
          resizeMode="contain"
          style={styles.video}
          onError={this.handleError}
          shouldPlay={this.state.shouldPlay}
          useNativeControls={this.state.useNativeControls}
          source={videoUrl}
        />
        <View style={styles.buttonContainer} pointerEvents="box-none">
          {this.renderPlayPauseButton()}
        </View>
      </View> 
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttonContainer: {
    position: 'absolute',
    height: 100,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 80,
  },
  
});


