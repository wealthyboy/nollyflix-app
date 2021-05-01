/**
 * This is  for the top navigation
 */

import * as React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { colors, device, fonts, images } from '../constants';

// components
import TouchText from './TouchText';

class HeaderHome extends React.Component {
  constructor() {
    super();

    this.state = {
      top: new Animated.Value(0)
    };
  }

  componentDidUpdate(prevProps) {
    const { show } = this.props;
    const { top } = this.state;

    if (prevProps.show !== show) {
      if (show) {
        Animated.timing(top, {
          duration: 200,
          toValue: 0,
          useNativeDriver: false
        }).start();
      } else {
        Animated.timing(top, {
          duration: 200,
          toValue: -100,
          useNativeDriver: false
        }).start();
      }
    }
  }

  render() {
    const { all, navigation } = this.props;
    const { top } = this.state;

    return (
      <Animated.View style={[styles.container, { top }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('HomeMain')}
        >
          <Image  source={require("../assets/icon.png")}  style={styles.logo} />
        </TouchableOpacity>
        <View style={styles.containerMenu}>
          {all && (
            <React.Fragment>
              
              <TouchText
                onPress={() => navigation.navigate('ActorsAndActress')}
                text="Actors\Actress"
                textStyle={styles.text}
              />
              <TouchText
                onPress={() => navigation.navigate('FilmMakers')}
                text="Film Makers"
                textStyle={styles.text}
              />
            </React.Fragment>
          )}
        </View>
      </Animated.View>
    );
  }
}

HeaderHome.defaultProps = {
  all: true
};

HeaderHome.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,

  // optional
  all: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: colors.black20,
    flexDirection: 'row',
    paddingBottom: 14,
    paddingHorizontal: 16,
    paddingTop: device.iPhoneX ? 54 : 30,
    position: 'absolute',
    width: '100%',
    zIndex: 10
  },
  logo: {
    height: 35,
    marginRight: 48,
    width: 20
  },
  containerMenu: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    flex: 1
  },
  text: {
    color: colors.white,
    fontFamily: fonts.medium,
    marginRight: 24
  }
});

export default withNavigation(HeaderHome);
