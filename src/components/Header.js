import * as React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, device, fonts, images } from '../constants';
import { useNavigation } from '@react-navigation/native';

// icons
import SvgArrowLeft from './icons/Svg.ArrowLeft';

const Header = (props) => {
  const navigation = useNavigation();

  const {
    bg,
    close,
    closeText,
    onPress,
    showBack,
    showLogo,
    title,
    route
  } = props;

  const router = route;
  return (
    <View style={[styles.container]}>
      {showBack && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack(null)}
          style={styles.back}
        >
          <SvgArrowLeft size={37} />
        </TouchableOpacity>
      )}

      {title && (
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}

      {showLogo && (
        <React.Fragment>
          <View style={styles.containerLogoFull}>
            <Image source={images.netflixFull} style={styles.logoFull} />
          </View>
        </React.Fragment>
      )}

      {showBack && !close && <View style={{ flex: 1 }} />}

      {close && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (
              typeof router.params !== 'undefined' &&
              router.params.next === 'VideoDetails'
            ) {
              navigation.navigate('VideoDetails', route.video);
            } else {
              navigation.goBack(null);
            }
          }}
          style={styles.close}
        >
          <Text style={styles.closeText}>{closeText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

Header.defaultProps = {
  bg: colors.black,
  close: false,
  closeText: 'Cancel',
  showBack: false,
  showLogo: false,
  title: null
};

Header.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,

  // optional
  bg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  close: PropTypes.bool,
  closeText: PropTypes.string,
  showBack: PropTypes.bool,
  showLogo: PropTypes.bool,
  title: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    paddingHorizontal: 16,
    paddingTop: device.iPhoneX ? 54 : 30,
    zIndex: 0
  },
  back: {
    alignSelf: 'center',
    flex: 1
  },
  containerTitle: {
    flex: 4,
    height: 35,
    justifyContent: 'flex-end'
  },
  title: {
    color: colors.heading,
    fontSize: 18,
    paddingBottom: 4,
    textAlign: 'center'
  },
  containerLogoFull: {
    alignItems: 'center',
    flex: 2,
    height: 35,
    justifyContent: 'center'
  },
  logoFull: {
    height: 33,
    width: 150
  },
  close: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
    height: 35
  },
  closeText: {
    color: colors.white,
    fontFamily: fonts.light,
    fontSize: 16
  }
});

export default Header;
