/**
 * This is for the info link
 */
import React, { useState, useRef } from 'react';
import * as WebBrowser from 'expo-web-browser';
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
  FlatList,
  Image,
  Dimensions,
  Platform,
  StyleSheet,
  ScrollView,
  Easing,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import ReadMore from 'react-native-read-more-text';
import Constants from 'expo-constants';

import { gStyle } from '../constants';
import { colors, fonts } from '../constants';
import useAuth from '../auth/useAuth';
import useVideos from '../hooks/useVideos';

// components
import PromotionPlay from '../components/PromotionPlay';
import VideoDetailsIcon from '../components/VideoDetailsIcon';
import TouchTextIcon from '../components/TouchTextIcon';

import SvgPlay from '../components/icons/Svg.Play';

function VideoPlayer({ video, showFullscreen, height = 300, preview }) {
  let videoWidth = Dimensions.get('window').width;
  let videoHeight = videoWidth / (16 / 9);

  const { user } = useAuth();
  const {
    BUFFERING_SHOW_DELAY,
    controlsOpacity,
    getSeekSliderPosition,
    handlePlaybackStatusUpdate,
    landScape,
    lastPlaybackStateUpdate,
    onSliderLayout,
    onSeekBarTap,
    onSeekSliderValueChange,
    onSeekSliderSlidingComplete,
    porTrait,
    PlaybackStates,
    playbackState,
    resetControlsTimer,
    rotateData,
    seekState,
    SeekStates,
    startImageRotateFunction,
    togglePlay,
    toggleControls,
    videoRef,
    videoInstance,
    VideoPlayIcon,
    VideoPauseIcon
  } = useVideos();

  startImageRotateFunction();

  const icon = <SvgPlay size={70} />;

  return (
    <View>
      <TouchableWithoutFeedback onPress={toggleControls}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            height: 300
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
            source={{
              uri: video.preview_link
            }}
            rate={1.0}
            volume={1.0}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            shouldPlay
            style={{
              width: videoWidth,
              height: 300
            }}
            ref={(component) => {
              videoRef;
              videoInstance(component);
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

export default VideoPlayer;
