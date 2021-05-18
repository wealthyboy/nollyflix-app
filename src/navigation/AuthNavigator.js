// import * as React from 'react';
// import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

// // screens
// import LoginScreen from '../screens/Login';
// import RegisterScreen from '../screens/Register';

// // icons

// export default createStackNavigator(
//   {

//     LoginScreen,
//     RegisterScreen

//   },
//   {
//     headerMode: 'none',
//     defaultNavigationOptions: {
//       ...TransitionPresets.SlideFromRightIOS,
//     },
//   }
// );

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SvgSearch from '../components/icons/Svg.Search';

// screens
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
