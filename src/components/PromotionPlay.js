import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../constants';

// icons
import SvgPlay from './icons/Svg.Play';

const PromotionPlay = ({
  iconColor,
  icon,
  onPress,
  text,
  textColor = 'white',
  color = 'brandPrimary',
  p,
  pV
}) => (
  <TouchableOpacity
    activeOpacity={0.3}
    onPress={onPress}
    style={[
      styles.container,
      { backgroundColor: colors[color], paddingVertical: pV }
    ]}
  >
    <View style={[styles.icon, { color: colors[textColor], paddingTop: p }]}>
      {React.cloneElement(icon, { fill: iconColor })}
    </View>
    <Text style={[styles.text, { color: colors[textColor] }]}>{text}</Text>
  </TouchableOpacity>
);

PromotionPlay.defaultProps = {
  icon: <SvgPlay />,
  text: 'Buy'
};

PromotionPlay.propTypes = {
  // required
  onPress: PropTypes.func.isRequired

  // optional
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 2
  },
  text: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 18
  },
  icon: {
    justifyContent: 'center',
    color: '#fff',
    marginTop: 3
  }
});

export default PromotionPlay;
