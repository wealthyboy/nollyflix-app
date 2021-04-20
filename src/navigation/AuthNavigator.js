import * as React from 'react';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';


// screens
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';



// icons

export default createStackNavigator(
  {
    
    LoginScreen,
    RegisterScreen
    
  },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromLeftIOS,
    },
  }
);
