// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { createStackNavigator } from 'react-navigation-stack';

// import navigationOptions from './defaultOptions';

// // screens
// import SearchScreen from '../screens/Search';

// // icons
// import SvgSearch from '../components/icons/Svg.Search';

// const Icon = ({ focused }) => <SvgSearch active={focused} />;

// Icon.propTypes = {
//   // required
//   focused: PropTypes.bool.isRequired
// };

// export default createStackNavigator(
//   {
//     SearchMain: {
//       screen: SearchScreen,
//       navigationOptions
//     }
//   },
//   {
//     headerMode: 'none',
//     navigationOptions: {
//       tabBarLabel: 'Search',
//       tabBarIcon: Icon
//     }
//   }
// );

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SvgSearch from '../components/icons/Svg.Search';
import Search from '../screens/Search';

const Stack = createStackNavigator();

export default function StackSearch() {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="SearchMain" component={Search} />
    </Stack.Navigator>
  );
}
