import * as React from 'react';
import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  
  View
} from 'react-native';
import { colors, device, fonts } from '../constants';
import searchApi from '../api/search';


class HeaderSearch extends React.Component {
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
    this.onChangeText = this.onChangeText.bind(this)
  }

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
    this.setState({ text: text})
    this.setState({ loading: true })


    const res  = await searchApi.search(text)
    if (!res.ok){ this.setState({ error: "We could not get video listings"}); return; }
    this.setState({ videos: res.data.data })
    this.setState({ loading: false })
    this.setState({ textIsChanging: false })



  }

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

    // if there is focus or text in input, align left
    const inputOverride = focus || text ? { textAlign: 'left' } : {};
    // convert to percentage
    const percentage = inputWidth.interpolate({
      inputRange: [80, 100],
      outputRange: ['80%', '100%']
    });

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.containerInput, { width: percentage }]}>
          <TextInput
            autoCapitalize="none"
            autoFocus
            keyboardAppearance="dark"
            onBlur={this.onBlur}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            placeholder="Search"
            placeholderTextColor={colors.searchIcon}
            selectionColor={colors.brandPrimary}
            style={[styles.input, inputOverride]}
            value={text}
          />
        </Animated.View>
        <Animated.View
          style={[styles.containerCancel, { opacity: cancelOpacity }]}
        >
          <TouchableOpacity activeOpacity={0.7} onPress={this.onCancel}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>

        {this.state.videos.length  === 0  && this.textIsChanging  === false && (
            <View>
              <View style={styles.containerIcon}>
                <SvgPlay fill={colors.bgGrey} size={80} />
              </View>
      
              <Text style={styles.description}>
                You have no found
              </Text>
            </View>
        )}
        
        {this.state.videos.length   && this.loading  === false && (
          <View style={styles.imageContainer}>
              {this.state.videos.map(video => (
                  <TouchableWithoutFeedback 
                    key={video.id} 
                        onPress={() => {
                          if (video.is_rent_expired) {
                            navigation.navigate('VideoDetails',video.video)
                          } else {
                            navigation.navigate('ModalVideo',{"video": video.video,"videoToShow": "link"})
                          }
                        }} 
                    >
                    <View style={styles.imgContainer}>
                      <Image 
                          style={styles.rectangle} 
                          uri={video.video.tn_poster} 
                          preview={{ uri: video.video.tn_poster}}
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
    paddingHorizontal: 8,
    paddingVertical: 4
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
  }
});

export default HeaderSearch;
