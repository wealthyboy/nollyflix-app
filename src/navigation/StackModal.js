import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import ModalCastConnect from '../screens/ModalCastConnect';
import ModalAddProfile from '../screens/ModalAddProfile';
import ModalManageProfiles from '../screens/ModalManageProfiles';
import ModalVideo from '../screens/ModalVideo';
import ModalWebView from '../screens/ModalWebView';
import ModalVideoDetails from '../screens/ModalVideoDetails';

const Stack = createStackNavigator();

export default function StackModal() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ModalCastConnect" component={ModalCastConnect} />
      <Stack.Screen name="ModalAddProfile" component={ModalAddProfile} />
      <Stack.Screen
        name="ModalManageProfiles"
        component={ModalManageProfiles}
      />
      <Stack.Screen name="ModalVideo" component={ModalVideo} />
      <Stack.Screen name="ModalWebView" component={ModalWebView} />

      <Stack.Screen name="ModalVideoDetails" component={ModalVideoDetails} />
    </Stack.Navigator>
  );
}
