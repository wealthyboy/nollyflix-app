/**
 * This is for the info link
 */
import React, { useState, useRef } from 'react';
import {
  FullscreenEnterIcon,
  FullscreenExitIcon,
  PauseIcon,
  PlayIcon,
  ReplayIcon,
  Spinner
} from '../components/icons/Icons';

import { Animated, Dimensions, Easing } from 'react-native';

import useAuth from '../auth/useAuth';

let videoWidth = Dimensions.get('window').width;
const BUFFERING_SHOW_DELAY = 200;
const videoRef = useRef(null);
export const switchToLandScape = async () => {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  );
};

export const switchToPortrait = async () => {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.PORTRAIT_UP
  );
};

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
  fullscreenExitIcon: FullscreenExitIcon
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

export const _handleLoad = (meta) => {};

export const getMMSSFromMillis = (millis) => {
  const totalSeconds = millis / 1000;
  const seconds = String(Math.floor(totalSeconds % 60));
  const minutes = String(Math.floor(totalSeconds / 60));
  return minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');
};

export const _handleEnd = (handlePress) => {
  console.log(true);
};

export const updatePlaybackState = (newPlaybackState) => {
  if (playbackState !== newPlaybackState) {
    setPlaybackState(newPlaybackState);
    setLastPlaybackStateUpdate(Date.now());
  }
};

export const updateSeekState = (newSeekState) => {
  setSeekState(newSeekState);
  // Don't keep the controls timer running when the state is seeking
  if (newSeekState === SeekStates.Seeking) {
    controlsTimer && clearTimeout(controlsTimer);
  } else {
    // Start the controlFs timer anew
    resetControlsTimer();
  }
};

export const onSeekSliderValueChange = async (v) => {
  console.log(v);
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
export const onSeekSliderSlidingComplete = async (value) => {
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

export const startImageRotateFunction = () => {
  rotateValueHolder.setValue(0);
  Animated.timing(rotateValueHolder, {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear,
    useNativeDriver: false
  }).start(() => startImageRotateFunction());
};

export const rotateData = rotateValueHolder.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
});

export const onSeekBarTap = (e) => {
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
export const onSliderLayout = (e) => {
  setSliderWidth(e.nativeEvent.layout.width);
};

export const isPlayingOrBufferingOrPaused = (status) => {
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

export const handlePlaybackStatusUpdate = (status) => {
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
  console.log(playbackState);

  //console.log(status.positionMillis / status.durationMillis);
};

export const getSeekSliderPosition = () =>
  playbackState == 'Ended'
    ? 0
    : playbackInstancePosition / playbackInstanceDuration || 0;

//console.log(getSeekSliderPosition);

export const togglePlay = async () => {
  if (controlsState === ControlStates.Hidden) {
    return;
  }
  const shouldPlay = playbackState !== PlaybackStates.Playing;
  if (playbackInstance !== null) {
    await playbackInstance.setStatusAsync({ shouldPlay });
  }
};
export const toggleControls = () => {
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

export const resetControlsTimer = () => {
  const { hideControlsTimerDuration } = defaultProps;
  if (controlsTimer) {
    clearTimeout(controlsTimer);
  }
  controlsTimer = setTimeout(() => onTimerDone(), hideControlsTimerDuration);
};

export const onTimerDone = () => {
  // After the controls timer runs out, fade away the controls slowly
  setControlsState(ControlStates.Hiding);
  hideControls();
};

export const showControls = () => {
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
export const hideControls = (immediately = false) => {
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
