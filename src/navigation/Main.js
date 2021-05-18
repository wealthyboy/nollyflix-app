// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

// screens
import ModalCastConnect from '../screens/ModalCastConnect';
import ModalAddProfile from '../screens/ModalAddProfile';
import ModalManageProfiles from '../screens/ModalManageProfiles';
import ModalVideo from '../screens/ModalVideo';
import ModalWebView from '../screens/ModalWebView';
import ModalVideoDetails from '../screens/ModalVideoDetails';

// // grab tabbed stacks
// import StackDownloads from './StackDownloads';
// import StackHome  from './StackHome';
// import StackMore  from './StackMore';
// import StackSearch from './StackSearch'

// const StackNavigator = createStackNavigator(
//   {
//     Main: {
//       screen: TabNavigator
//     },
//     Auth: {
//       screen: AuthNavigator
//     },

//     // Modals
//     // /////////////////////////////////////////////////////////////////////////
//     ModalCastConnect,
//     ModalAddProfile,
//     ModalManageProfiles,
//     ModalVideo,
//     ModalWebView,
//     ModalVideoDetails
//   },
//   {
//     headerMode: 'none',
//     initialRouteName: 'Main',
//     mode: 'modal'
//   }
// );

// const App = createAppContainer(StackNavigator);

// export default App;

import React, { useEffect } from 'react';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

// grab tabbed stacks
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import FilmMakersScreen from '../screens/FilmMakers';
import ActorsAndActressScreen from '../screens/ActorsAndActress';
import CastDetailsScreen from '../screens/CastDetails';

import SvgHome from '../components/icons/Svg.Home';
import SvgPlay from '../components/icons/Svg.Play';
import SvgSearch from '../components/icons/Svg.Search';

// screens
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';

const HomeIcon = ({ focused }) => <SvgHome active={focused} />;
const SearchIcon = ({ focused }) => <SvgSearch active={focused} />;

const Stack = createStackNavigator();

function Main() {
  //const navigation = useNavigation();

  // useEffect(() => {
  //    registerForPushNotifications()
  // }, [])
  // const registerForPushNotifications = async () => {
  //     try {
  //         const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  //         if (!permission.granted) return;
  //         const token = await Notifications.getExpoPushTokenAsync()
  //         console.log(token)
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />

      <Stack.Screen name="ModalCastConnect" component={ModalCastConnect} />
      <Stack.Screen name="ModalAddProfile" component={ModalAddProfile} />
      <Stack.Screen name="FilmMakers" component={FilmMakersScreen} />
      <Stack.Screen
        name="ActorsAndActress"
        component={ActorsAndActressScreen}
      />
      <Stack.Screen name="CastDetails" component={CastDetailsScreen} />
      <Stack.Screen
        name="ModalManageProfiles"
        component={ModalManageProfiles}
      />
      <Stack.Screen name="ModalVideo" component={ModalVideo} />
      <Stack.Screen name="ModalWebView" component={ModalWebView} />
    </Stack.Navigator>
  );
}

export default Main;
