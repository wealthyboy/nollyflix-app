import * as React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';

import navigationOptions from './defaultOptions';

// screens
import DownloadsScreen from '../screens/Downloads';

// icons
import SvgPlay from '../components/icons/Svg.Play';

const Icon = ({ focused }) => (
  <View>
    <Text
      style={{ backgroundColor: 'red', width: 20, height: 20, color: '#fff' }}
    >
      90
    </Text>
    <SvgPlay active={focused} />
  </View>
);

import { colors } from '../constants';
import { Text, View } from 'react-native';

Icon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};

export default createStackNavigator(
  {
    DownloadsMain: {
      screen: DownloadsScreen,
      navigationOptions
    }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      tabBarLabel: 'My Videos',
      tabBarIcon: Icon
    }
  }
);
