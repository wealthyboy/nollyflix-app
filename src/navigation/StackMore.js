import * as React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from '../constants';




import navigationOptions from './defaultOptions';

// screens
import MoreScreen from '../screens/More';
import MoreAppSettingsScreen from '../screens/MoreAppSettings';
import MoreNotificationsScreen from '../screens/MoreNotifications';
import MoreMyListScreen from '../screens/MoreMyList';



// icons
import SvgMenu from '../components/icons/Svg.Menu';

const Icon = ({ focused }) => <SvgMenu active={focused} />;

const gColors = colors.inactiveGrey

Icon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};


export default createStackNavigator(
  {
    MoreMain: {
      screen: MoreScreen,
      navigationOptions
    },
    MoreAppSettingsScreen,
    MoreNotificationsScreen,
    MoreMyListScreen,
    
  },
  {
    initialRouteName: 'MoreMain',
    headerMode: 'none',
    navigationOptions: {
      tabBarLabel:  'Account',
      tabBarIcon: ({ focused, color={gColors}, size=28 }) => {
        return <MaterialCommunityIcons name="account" style active={focused}  size={size} color={gColors} />;
      },

    }
  }
);
