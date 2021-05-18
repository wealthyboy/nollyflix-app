import React, { useEffect } from 'react';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

// grab tabbed stacks
import StackDownloads from './StackDownloads';
import StackHome from './StackHome';
import StackMore from './StackMore';
import StackSearch from './StackSearch';

import SvgHome from '../components/icons/Svg.Home';
import SvgPlay from '../components/icons/Svg.Play';
import SvgSearch from '../components/icons/Svg.Search';

// screens
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import { colors } from '../constants';
import useAuth from '../auth/useAuth';

const HomeIcon = ({ focused }) => <SvgHome active={focused} />;
const SearchIcon = ({ focused }) => <SvgSearch active={focused} />;

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function TabNavigator() {
  const { user } = useAuth();

  let videoCount = user ? user.videos : 0;

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
    <>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: colors.white,
          inactiveTintColor: colors.inactiveGrey,
          style: {
            backgroundColor: colors.bgGrey,
            borderTopColor: '#000'
          }
        }}
      >
        <Tab.Screen
          name="Home"
          component={StackHome}
          options={{
            tabBarIcon: HomeIcon
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Search"
          component={StackSearch}
          options={() => ({
            tabBarIcon: SearchIcon
          })}
        ></Tab.Screen>
        <Tab.Screen
          name="Videos"
          component={StackDownloads}
          options={{
            tabBarLabel: 'My Videos',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="play" color={color} size={35} />
            ),
            tabBarBadge: videoCount
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Account"
          component={StackMore}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            )
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

export default TabNavigator;
