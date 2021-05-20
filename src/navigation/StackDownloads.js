// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { createStackNavigator } from 'react-navigation-stack';

// import navigationOptions from './defaultOptions';

// // screens
// import DownloadsScreen from '../screens/Downloads';

// // icons
// import SvgPlay from '../components/icons/Svg.Play';

// import { colors } from '../constants';
// import { Text, View } from 'react-native';
// import VideoCount from '../components/VideoCount';

// import authStorage from '../auth/storage';

// const userObj = async () => {
//   return await authStorage.getUserOb();
// };

// let noOfVideos;
// userObj().then((data) => {
//   let user = JSON.parse(data);
//   if (user) {
//     noOfVideos = user.videos;
//   } else {
//     noOfVideos = 0;
//   }
// });
// const Icon = ({ focused, count = 9 }) => (
//   <VideoCount focused={focused} count={noOfVideos} />
// );

// Icon.propTypes = {
//   // required
//   focused: PropTypes.bool.isRequired
// };

// export default createStackNavigator(
//   {
//     DownloadsMain: {
//       screen: DownloadsScreen,
//       navigationOptions
//     }
//   },
//   {
//     headerMode: 'none',
//     navigationOptions: {
//       tabBarLabel: 'My Videos',
//       tabBarBadge: 45,
//       tabBarIcon: Icon
//     }
//   }
// );

import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DownloadsScreen from '../screens/Downloads';

const Stack = createStackNavigator();

export default function StackDownloads() {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="DownloadsMain" component={DownloadsScreen} />
    </Stack.Navigator>
  );
}
