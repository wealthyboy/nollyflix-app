/**
 * This is for the info link
 */
import React, { useState, useRef, useEffect } from 'react';
import { Video } from 'expo-av';
import Slider from '@react-native-community/slider';
import {
  FullscreenEnterIcon,
  FullscreenExitIcon,
  PauseIcon,
  PlayIcon,
  ReplayIcon,
  Spinner
} from '../components/icons/Icons';

import {
  Animated,
  Dimensions,
  StyleSheet,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import { gStyle } from '../constants';
import { colors, fonts } from '../constants';
import useAuth from '../auth/useAuth';

// components

import SvgPlay from '../components/icons/Svg.Play';

import * as ScreenOrientation from 'expo-screen-orientation';

function ModalVideo({ navigation }) {
  const video = navigation.state.params;

  let videoWidth = Dimensions.get('window').width;
  let videoHeight = videoWidth / (16 / 9);
  const BUFFERING_SHOW_DELAY = 200;

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

  useEffect(() => {
    landScape();
    return () => {
      porTrait();
    };
  }, []);

  const videoRef = useRef(null);
  const [lastPlaybackStateUpdate, setLastPlaybackStateUpdate] = useState(
    Date.now()
  );

  let ControlStates = {
    Shown: 'Show',
    Showing: 'Showing',
    Hidden: 'Hidden',
    Hiding: 'Hiding'
  };

  let PlaybackStates;
  (function (PlaybackStates) {
    PlaybackStates['Loading'] = 'Loading';
    PlaybackStates['Playing'] = 'Playing';
    PlaybackStates['Paused'] = 'Paused';
    PlaybackStates['Buffering'] = 'Buffering';
    PlaybackStates['Error'] = 'Error';
    PlaybackStates['Ended'] = 'Ended';
  })(PlaybackStates || (PlaybackStates = {}));

  let SeekStates;
  (function (SeekStates) {
    SeekStates['NotSeeking'] = 'NotSeeking';
    SeekStates['Seeking'] = 'Seeking';
    SeekStates['Seeked'] = 'Seeked';
  })(SeekStates || (SeekStates = {}));
  let rotateValueHolder = new Animated.Value(0);

  const [playbackState, setPlaybackState] = useState(PlaybackStates.Loading);
  const [playbackInstancePosition, setPlaybackInstancePosition] = useState(0);
  const [playbackInstanceDuration, setPlaybackInstanceDuration] = useState(0);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [error, setError] = useState('');
  const [sliderWidth, setSliderWidth] = useState(0);
  const [controlsOpacity] = useState(new Animated.Value(0));
  const [controlsState, setControlsState] = useState(ControlStates.Hidden);
  const [seekState, setSeekState] = useState(SeekStates.NotSeeking);

  let controlsTimer = null;
  let showingAnimation = null;
  let hideAnimation = null;
  let shouldPlayAtEndOfSeek = false;
  let playbackInstance = null;

  const defaultProps = {
    videoRef: null,
    children: null,
    debug: false,
    inFullscreen: false,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // Animations
    fadeInDuration: 200,
    fadeOutDuration: 1000,
    quickFadeOutDuration: 200,
    hideControlsTimerDuration: 4000,
    // // Icons
    playIcon: PlayIcon,
    replayIcon: ReplayIcon,
    pauseIcon: PauseIcon,
    spinner: Spinner,
    fullscreenEnterIcon: FullscreenEnterIcon,
    fullscreenExitIcon: FullscreenExitIcon,
    showFullscreenButton: true,
    thumbImage: null,
    iosTrackImage: null,
    textStyle: {
      color: '#FFF',
      fontSize: 12
    }
  };

  const { user } = useAuth();

  const {
    playIcon: VideoPlayIcon,
    pauseIcon: VideoPauseIcon,
    spinner: VideoSpinner,
    fullscreenEnterIcon: VideoFullscreenEnterIcon,
    fullscreenExitIcon: VideoFullscreenExitIcon,
    replayIcon: VideoReplayIcon
  } = defaultProps;

  const _handleLoad = (meta) => {};

  const getMMSSFromMillis = (millis) => {
    const totalSeconds = millis / 1000;
    const seconds = String(Math.floor(totalSeconds % 60));
    const minutes = String(Math.floor(totalSeconds / 60));
    return minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');
  };

  const _handleEnd = (handlePress) => {};

  const updatePlaybackState = (newPlaybackState) => {
    if (playbackState !== newPlaybackState) {
      setPlaybackState(newPlaybackState);
      setLastPlaybackStateUpdate(Date.now());
    }
  };

  const updateSeekState = (newSeekState) => {
    setSeekState(newSeekState);
    // Don't keep the controls timer running when the state is seeking
    if (newSeekState === SeekStates.Seeking) {
      controlsTimer && clearTimeout(controlsTimer);
    } else {
      // Start the controlFs timer anew
      resetControlsTimer();
    }
  };

  const onSeekSliderValueChange = async (v) => {
    if (playbackInstance !== null && seekState !== SeekStates.Seeking) {
      updateSeekState(SeekStates.Seeking);
      // A seek might have finished (Seeked) but since we are not in NotSeeking yet, the `shouldPlay` flag is still false,
      // but we really want it be the stored value from before the previous seek
      shouldPlayAtEndOfSeek =
        seekState === SeekStates.Seeked ? shouldPlayAtEndOfSeek : shouldPlay;
      // Pause the video
      await playbackInstance.setStatusAsync({ shouldPlay: false });
    }
  };
  const onSeekSliderSlidingComplete = async (value) => {
    if (playbackInstance !== null) {
      // Seeking is done, so go to Seeked, and set playbackState to Buffering
      updateSeekState(SeekStates.Seeked);

      console.log(shouldPlayAtEndOfSeek);
      // If the video is going to play after seek, the user expects a spinner.
      // Otherwise, the user expects the play button
      updatePlaybackState(
        shouldPlayAtEndOfSeek ? PlaybackStates.Buffering : PlaybackStates.Paused
      );
      try {
        const playback = await playbackInstance.setStatusAsync({
          positionMillis: value * playbackInstanceDuration,
          shouldPlay: true
        });
        console.log(shouldPlayAtEndOfSeek);
        // The underlying <Video> has successfully updated playback position
        // TODO: If `shouldPlayAtEndOfSeek` is false, should we still set the playbackState to Paused?
        // But because we setStatusAsync(shouldPlay: false), so the AVPlaybackStatus return value will be Paused.
        updateSeekState(SeekStates.NotSeeking);
        updatePlaybackState(isPlayingOrBufferingOrPaused(playback));
      } catch (e) {
        console.error('Seek error: ', e);
      }
    }
  };

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start(() => startImageRotateFunction());
  };

  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const onSeekBarTap = (e) => {
    if (
      !(
        playbackState === PlaybackStates.Loading ||
        playbackState === PlaybackStates.Ended ||
        playbackState === PlaybackStates.Error ||
        controlsState !== ControlStates.Shown
      )
    ) {
      const value = e.nativeEvent.locationX / sliderWidth;
      onSeekSliderValueChange();
      onSeekSliderSlidingComplete(value);
    }
  };
  // Capture the width of the seekbar slider for use in `_onSeekbarTap`
  const onSliderLayout = (e) => {
    setSliderWidth(e.nativeEvent.layout.width);
  };

  const isPlayingOrBufferingOrPaused = (status) => {
    if (!status.isLoaded) {
      return PlaybackStates.Error;
    }
    if (status.isPlaying) {
      return PlaybackStates.Playing;
    }
    if (status.isBuffering) {
      return PlaybackStates.Buffering;
    }
    return PlaybackStates.Paused;
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (!status.isLoaded) {
      if (status.error) {
        updatePlaybackState(PlaybackStates.Error);
      }
    } else {
      setPlaybackInstancePosition(status.positionMillis || 0);
      setPlaybackInstanceDuration(status.durationMillis || 0);
      setShouldPlay(status.shouldPlay);
      // Figure out what state should be next (only if we are not seeking,
      // other the seek action handlers control the playback state, not this callback)
      if (
        seekState === SeekStates.NotSeeking &&
        playbackState !== PlaybackStates.Ended
      ) {
        if (status.didJustFinish && !status.isLooping) {
          updatePlaybackState(PlaybackStates.Ended);
        } else if (status.isBuffering) {
          // If the video is buffering but there is no Internet, you go to the Error state
          updatePlaybackState(PlaybackStates.Buffering);
        } else if (status.isPlaying) {
          updatePlaybackState(PlaybackStates.Playing);
        } else {
          updatePlaybackState(PlaybackStates.Paused);
        }
      }
    }
    //console.log(playbackState);

    //console.log(status.positionMillis / status.durationMillis);
  };

  const getSeekSliderPosition = () =>
    playbackState == 'Ended'
      ? 0
      : playbackInstancePosition / playbackInstanceDuration || 0;

  //console.log(getSeekSliderPosition);

  const togglePlay = async () => {
    if (controlsState === ControlStates.Hidden) {
      return;
    }
    const shouldPlay = playbackState !== PlaybackStates.Playing;
    if (playbackInstance !== null) {
      await playbackInstance.setStatusAsync({ shouldPlay });
    }
  };
  const toggleControls = () => {
    switch (controlsState) {
      case ControlStates.Shown:
        // If the controls are currently Shown, a tap should hide controls quickly
        setControlsState(ControlStates.Hiding);
        hideControls(true);
        break;
      case ControlStates.Hidden:
        // If the controls are currently, show controls with fade-in animation
        showControls();
        setControlsState(ControlStates.Showing);
        break;
      case ControlStates.Hiding:
        // If controls are fading out, a tap should reverse, and show controls
        setControlsState(ControlStates.Showing);
        showControls();
        break;
      case ControlStates.Showing:
        // A tap when the controls are fading in should do nothing
        break;
    }
  };

  const resetControlsTimer = () => {
    const { hideControlsTimerDuration } = defaultProps;
    if (controlsTimer) {
      clearTimeout(controlsTimer);
    }
    controlsTimer = setTimeout(() => onTimerDone(), hideControlsTimerDuration);
  };

  const onTimerDone = () => {
    // After the controls timer runs out, fade away the controls slowly
    setControlsState(ControlStates.Hiding);
    hideControls();
  };

  const showControls = () => {
    const { fadeInDuration } = defaultProps;
    showingAnimation = Animated.timing(controlsOpacity, {
      toValue: 1,
      duration: fadeInDuration,
      useNativeDriver: true
    });
    showingAnimation.start(({ finished }) => {
      if (finished) {
        setControlsState(ControlStates.Shown);
        resetControlsTimer();
      }
    });
  };
  const hideControls = (immediately = false) => {
    const { quickFadeOutDuration, fadeOutDuration } = defaultProps;
    if (controlsTimer) {
      clearTimeout(controlsTimer);
    }
    hideAnimation = Animated.timing(controlsOpacity, {
      toValue: 0,
      duration: immediately ? quickFadeOutDuration : fadeOutDuration,
      useNativeDriver: true
    });
    hideAnimation.start(({ finished }) => {
      if (finished) {
        setControlsState(ControlStates.Hidden);
      }
    });
  };

  startImageRotateFunction();

  const icon = <SvgPlay size={70} />;

  const videoUrl = {
    uri: video.video.link,
    overrideFileExtensionAndroid: 'm3u8'
  };

  //console.log(video);

  //console.log(videoHeight);

  return (
    <View>
      <TouchableWithoutFeedback onPress={toggleControls}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            height: '100%',
            width: '100%'
          }}
        >
          <View
            style={{
              zIndex: 1,
              position: 'absolute'
            }}
          >
            {seekState !== SeekStates.Seeking &&
              (playbackState === PlaybackStates.Playing ||
                playbackState === PlaybackStates.Paused) && (
                <Animated.View
                  style={[
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignContent: 'center',
                      opacity: controlsOpacity
                    }
                  ]}
                >
                  <TouchableOpacity
                    hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                    onPress={() => {
                      resetControlsTimer();
                      togglePlay();
                    }}
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
                      {playbackState === PlaybackStates.Playing && (
                        <VideoPauseIcon />
                      )}
                      {playbackState === PlaybackStates.Paused && (
                        <VideoPlayIcon />
                      )}
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              )}
          </View>
          <View
            style={{
              zIndex: 1,
              position: 'absolute'
            }}
          >
            {((playbackState === PlaybackStates.Buffering &&
              Date.now() - lastPlaybackStateUpdate > BUFFERING_SHOW_DELAY) ||
              playbackState === PlaybackStates.Loading ||
              playbackState === 'Error') && (
              <Animated.Image
                style={{
                  width: 50,
                  height: 50,
                  transform: [{ rotate: rotateData }],
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                source={require('../assets/animations/spinner.png')}
              />
            )}
          </View>

          <Video
            source={videoUrl}
            rate={1.0}
            volume={1.0}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            shouldPlay
            style={{
              width: videoWidth,
              height: '100%'
            }}
            onLoad={_handleLoad}
            onEnd={_handleEnd}
            ref={(component) => {
              playbackInstance = component;
              videoRef;
            }}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          ></Video>
          {playbackState === PlaybackStates.Ended && (
            <TouchableOpacity
              hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
              onPress={() => {
                resetControlsTimer();
                togglePlay();
              }}
            >
              <View
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  justifyContent: 'center',
                  width: 70,
                  height: 70,
                  borderRadius: 35
                }}
              >
                {playbackState === PlaybackStates.Ended && <VideoPlayIcon />}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>

      <Animated.View
        pointerEvents="auto"
        style={[
          styles.controls,
          {
            opacity: controlsOpacity
          }
        ]}
      >
        <TouchableWithoutFeedback
          onLayout={onSliderLayout}
          onPress={onSeekBarTap}
        >
          <Slider
            style={{ marginRight: 10, marginLeft: 10, flex: 1 }}
            thumbTintColor="red"
            minimumTrackTintColor="red"
            value={getSeekSliderPosition()}
            onValueChange={onSeekSliderValueChange}
            onSlidingComplete={onSeekSliderSlidingComplete}
          />
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 48,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10
  },
  mainButton: {
    marginRight: 15
  },
  duration: {
    color: '#fff',
    marginLeft: 15
  }
});

export default ModalVideo;
