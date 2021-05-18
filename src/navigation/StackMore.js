// import * as React from 'react';
// import PropTypes from 'prop-types';
// import {
//   createStackNavigator,
//   TransitionPresets
// } from 'react-navigation-stack';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { colors } from '../constants';

// import navigationOptions from './defaultOptions';

// // screens

// // icons
// import SvgMenu from '../components/icons/Svg.Menu';

// const Icon = ({ focused }) => <SvgMenu active={focused} />;

// const gColors = colors.inactiveGrey;

// Icon.propTypes = {
//   // required
//   focused: PropTypes.bool.isRequired
// };

// export default createStackNavigator(
//   {
//     MoreMain: {
//       screen: MoreScreen,
//       navigationOptions
//     },
//     MoreAppSettingsScreen,
//     MoreNotificationsScreen,
//     MyVideos: {
//       screen: MoreMyListScreen,
//       path: 'myvideos'
//     },
//     MoreMyAddedVideos
//   },
//   {
//     initialRouteName: 'MoreMain',
//     headerMode: 'none',
//     defaultNavigationOptions: {
//       ...TransitionPresets.SlideFromRightIOS
//     },
//     navigationOptions: {
//       tabBarLabel: 'Account',
//       tabBarIcon: ({ focused, color = { gColors }, size = 28 }) => {
//         return (
//           <MaterialCommunityIcons
//             name="account"
//             style
//             active={focused}
//             size={size}
//             color={gColors}
//           />
//         );
//       }
//     }
//   }
// );

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MoreScreen from '../screens/More';
import MoreAppSettingsScreen from '../screens/MoreAppSettings';
import MoreNotificationsScreen from '../screens/MoreNotifications';
import MoreMyListScreen from '../screens/MoreMyList';
import MoreMyAddedVideos from '../screens/MyLists';

const Stack = createStackNavigator();

export default function StackMore() {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="MoreMain" component={MoreScreen} />
      <Stack.Screen
        name="MoreAppSettingsScreen"
        component={MoreAppSettingsScreen}
      />
      <Stack.Screen
        name="MoreNotificationsScreen"
        component={MoreNotificationsScreen}
      />
      <Stack.Screen name="MyVideos" component={MoreMyListScreen} />
      <Stack.Screen name="MoreMyAddedVideos" component={MoreMyAddedVideos} />
    </Stack.Navigator>
  );
}
