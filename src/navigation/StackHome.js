import * as React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { gStyle ,colors} from '../constants';


// screens
import ActorsAndActressScreen from '../screens/ActorsAndActress';
import CastDetailsScreen from '../screens/CastDetails';


import HomeScreen from '../screens/Home';
import TvShowsScreen from '../screens/TvShows';
import MyListScreen from '../screens/MyList';
import FilmMakersScreen from '../screens/FilmMakers';


import VideoDetailsScreen from '../screens/VideoDetails';



// icons
import SvgHome from '../components/icons/Svg.Home';

const Icon = ({ focused }) => <SvgHome active={focused} />;

Icon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};

export default createStackNavigator(
  {
    
    HomeMain: {
      screen: HomeScreen,
      navigationOptions: {
        headerStyle: gStyle.navHeaderStyle
      }
    },
    HomeTvShows: {
      screen: TvShowsScreen,
      navigationOptions: {
        headerStyle: gStyle.navHeaderStyle
      }
    },
    ActorsAndActress: {
      screen: ActorsAndActressScreen,
      navigationOptions: {
        headerStyle: gStyle.navHeaderStyle
      }
    },
    FilmMakers: {
      screen: FilmMakersScreen,
      navigationOptions: {
        headerStyle: gStyle.navHeaderStyle
      }
    },
    
    VideoDetails: {
      screen: VideoDetailsScreen,
      navigationOptions: {
        headerStyle: gStyle.navHeaderStyle,
        cardStyle: {
          backgroundColor: 'black',
          opacity: 1
        }
      }
    },
    CastDetails: {
      screen: CastDetailsScreen,
      navigationOptions: {
        headerStyle: gStyle.navHeaderStyle
      }
    },
    HomeMyList: {
      screen: MyListScreen,
      navigationOptions: {
        headerStyle: gStyle.navHeaderStyle
      }
    }
  },
  {
    headerMode: 'none',
    InitialRouteName : 'HomeMain',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: Icon,
      
    },
    
  }
);
