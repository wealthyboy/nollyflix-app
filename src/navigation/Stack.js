import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// screens
import ModalCastConnect from '../screens/ModalCastConnect';
import ModalAddProfile from '../screens/ModalAddProfile';
import ModalManageProfiles from '../screens/ModalManageProfiles';
import ModalVideo from '../screens/ModalVideo';
import ModalWebView from '../screens/ModalWebView';
import ModalVideoDetails from '../screens/ModalVideoDetails';






// grab tabbed stacks
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';


const StackNavigator = createStackNavigator(
  {
    Main: {
      screen: TabNavigator
    },
    Auth: {
      screen: AuthNavigator
    },

    // Modals
    // /////////////////////////////////////////////////////////////////////////
    ModalCastConnect,
    ModalAddProfile,
    ModalManageProfiles,
    ModalVideo,
    ModalWebView,
    ModalVideoDetails
  },
  {
    headerMode: 'none',
    initialRouteName: 'Main',
    mode: 'modal'
  }
);

const App = createAppContainer(StackNavigator);

export default App;
