/**
 * This is  for the top navigation
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { colors, device, fonts, images } from '../constants';

// components
import SvgArrowLeft from './icons/Svg.ArrowLeft';

const HeaderTransparent = (props) => {
  const { controlsOpacity, navigation } = props;
  return (
    <Animated.View style={[styles.container, { opacity: controlsOpacity }]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.goBack(null)}
        style={styles.back}
      >
        <SvgArrowLeft size={37} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingBottom: 14,
    paddingHorizontal: 16,
    paddingTop: device.iPhoneX ? 54 : 30,
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    top: 0
  },
  logo: {
    height: 55,
    marginRight: 48,
    width: 50
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
    marginRight: 24,
    fontSize: 17
  }
});

export default HeaderTransparent;
