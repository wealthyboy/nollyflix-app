import * as React from 'react';
import {
  Animated,
  Easing,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { colors, device, fonts, gStyle } from '../constants';
import { Image } from 'react-native-expo-image-cache';

import searchApi from '../api/search';
import SvgPlay from '../components/icons/Svg.Play';
import Screen from '../components/Screen';

// components

let rotateValueHolder = new Animated.Value(0);

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      focus: false,
      cancelOpacity: new Animated.Value(0),
      inputWidth: new Animated.Value(100),
      text: '',
      videos: [],
      error: '',
      loading: false,
      textIsChanging: true
    };

    this.onBlur = this.onBlur.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.startImageRotateFunction = this.startImageRotateFunction.bind(this);
  }

  startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start(() => this.startImageRotateFunction());
  };

  onBlur() {
    const { cancelOpacity, inputWidth, text } = this.state;

    this.setState({ focus: false });

    // if empty, go back to orignial state
    if (text === '') {
      Animated.timing(inputWidth, {
        duration: 300,
        toValue: 100,
        useNativeDriver: false
      }).start();
      Animated.timing(cancelOpacity, {
        duration: 300,
        toValue: 0,
        useNativeDriver: false
      }).start();
    }
  }

  onCancel() {
    Keyboard.dismiss();

    this.setState({ text: '' }, () => this.onBlur());
  }

  onChangeText = async (text) => {
    this.startImageRotateFunction();

    this.setState({ text: text });
    this.setState({ loading: true });
    const res = await searchApi.search(text);
    if (!res.ok) {
      this.setState({ error: 'We could not get video listings' });
      return;
    }
    this.setState({ videos: res.data.data });
    this.setState({ loading: false });
    this.setState({ textIsChanging: false });
  };

  onFocus() {
    const { cancelOpacity, inputWidth } = this.state;

    this.setState({ focus: true });

    Animated.timing(inputWidth, {
      duration: 300,
      toValue: 80,
      useNativeDriver: false
    }).start();
    Animated.timing(cancelOpacity, {
      duration: 300,
      toValue: 1,
      useNativeDriver: false
    }).start();
  }

  render() {
    const { cancelOpacity, focus, inputWidth, text } = this.state;

    const { navigation } = this.props;

    let rotateData = rotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    // if there is focus or text in input, align left
    const inputOverride = focus || text ? { textAlign: 'left' } : {};
    // convert to percentage
    const percentage = inputWidth.interpolate({
      inputRange: [80, 100],
      outputRange: ['80%', '100%']
    });

    return (
      <View style={gStyle.container}>
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.container}>
              <Animated.View
                style={[styles.containerInput, { width: percentage }]}
              >
                <TextInput
                  autoCapitalize="none"
                  autoFocus
                  keyboardAppearance="dark"
                  onBlur={this.onBlur}
                  onChangeText={this.onChangeText}
                  onFocus={this.onFocus}
                  placeholder="Search for movies, genre, etc."
                  placeholderTextColor={colors.searchIcon}
                  selectionColor={colors.brandPrimary}
                  style={[styles.input, inputOverride]}
                  value={text}
                />
              </Animated.View>

              {this.state.loading && (
                <Animated.Image
                  style={{
                    width: 30,
                    height: 30,
                    transform: [{ rotate: rotateData }],
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  source={require('../assets/animations/spinner.png')}
                />
              )}

              <Animated.View
                style={[styles.containerCancel, { opacity: cancelOpacity }]}
              >
                <TouchableOpacity activeOpacity={0.7} onPress={this.onCancel}>
                  <Text style={styles.cancel}>Cancel</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        {typeof this.state.videos !== 'undefined' &&
          this.state.videos.length === 0 &&
          this.state.textIsChanging === false && (
            <View>
              <View style={styles.containerIcon}>
                <SvgPlay fill={colors.bgGrey} size={80} />
              </View>

              <Text style={styles.description}>You have no found</Text>
            </View>
          )}

        {typeof this.state.videos !== 'undefined' &&
          this.state.videos.length !== 0 && (
            <View style={styles.imageContainer}>
              {this.state.videos.map((video) => (
                <TouchableWithoutFeedback
                  key={video.id}
                  onPress={() => {
                    navigation.navigate('VideoDetails', video);
                  }}
                >
                  <View style={styles.imgContainer}>
                    <Image
                      style={styles.rectangle}
                      uri={video.tn_poster}
                      preview={{ uri: video.tn_poster }}
                      tint="light"
                    />
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flexDirection: 'row',
    paddingBottom: 12,
    paddingHorizontal: 8,
    paddingTop: device.iPhoneX ? 54 : 30,
    width: '100%'
  },
  containerInput: {
    width: '80%'
  },
  input: {
    backgroundColor: colors.searchBarBg,
    borderRadius: 4,
    color: colors.heading,
    fontFamily: fonts.regular,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  containerCancel: {
    width: '20%'
  },
  cancel: {
    color: colors.heading,
    fontFamily: fonts.light,
    fontSize: 16,
    paddingVertical: 4,
    textAlign: 'center'
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  imgContainer: {
    alignItems: 'center',
    marginTop: 20
  },

  rectangle: {
    backgroundColor: colors.infoGrey,
    height: 131,
    marginRight: 5,
    width: 91
  }
});

export default Search;
