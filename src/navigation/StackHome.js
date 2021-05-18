// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
// import { gStyle ,colors} from '../constants';

// // screens
// import ActorsAndActressScreen from '../screens/ActorsAndActress';
// import CastDetailsScreen from '../screens/CastDetails';

// import HomeScreen from '../screens/Home';
// import TvShowsScreen from '../screens/TvShows';
// import MyListScreen from '../screens/MyList';
// import FilmMakersScreen from '../screens/FilmMakers';

// import VideoDetailsScreen from '../screens/VideoDetails';

// // icons
// import SvgHome from '../components/icons/Svg.Home';

// const Icon = ({ focused }) => <SvgHome active={focused} />;

// Icon.propTypes = {
//   // required
//   focused: PropTypes.bool.isRequired
// };

// export default createStackNavigator(
//   {

//     HomeMain: {
//       screen: HomeScreen,
//       navigationOptions: {
//         headerStyle: gStyle.navHeaderStyle
//       }
//     },
//     HomeTvShows: {
//       screen: TvShowsScreen,
//       navigationOptions: {
//         headerStyle: gStyle.navHeaderStyle
//       }
//     },
//     ActorsAndActress: {
//       screen: ActorsAndActressScreen,
//       navigationOptions: {
//         headerStyle: gStyle.navHeaderStyle
//       }
//     },
//     FilmMakers: {
//       screen: FilmMakersScreen,
//       navigationOptions: {
//         headerStyle: gStyle.navHeaderStyle
//       }
//     },

//     VideoDetails: {
//       screen: VideoDetailsScreen,
//       navigationOptions: {
//         headerStyle: gStyle.navHeaderStyle,
//         cardStyle: {
//           backgroundColor: 'black',
//           opacity: 1
//         }
//       }
//     },
//     CastDetails: {
//       screen: CastDetailsScreen,
//       navigationOptions: {
//         headerStyle: gStyle.navHeaderStyle
//       }
//     },
//     HomeMyList: {
//       screen: MyListScreen,
//       navigationOptions: {
//         headerStyle: gStyle.navHeaderStyle
//       }
//     }
//   },
//   {
//     headerMode: 'none',
//     InitialRouteName : 'HomeMain',
//     defaultNavigationOptions: {
//       ...TransitionPresets.SlideFromRightIOS,
//     },
//     navigationOptions: {
//       tabBarLabel: 'Home',
//       tabBarIcon: Icon,

//     },

//   }
// );

import React from 'react';
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import TvShowsScreen from '../screens/TvShows';
import MyListScreen from '../screens/MyList';

import VideoDetailsScreen from '../screens/VideoDetails';

const Stack = createStackNavigator();

export default function StackHome() {
  const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS // This is where the transition happens
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({
          index,
          current,
          next,
          layouts: { screen }
        }) => {
          const translateX = current.progress.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [screen.width, 0, 0]
          });

          const opacity = next?.progress.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [1, 0, 0]
          });

          return { cardStyle: { opacity, transform: [{ translateX }] } };
        }
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="HomeTvShows" component={TvShowsScreen} />

      <Stack.Screen name="VideoDetails" component={VideoDetailsScreen} />
      <Stack.Screen name="HomeMyList" component={MyListScreen} />
    </Stack.Navigator>
  );
}
