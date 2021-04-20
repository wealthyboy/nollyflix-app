import React, {useState} from 'react';
import { StatusBar } from 'react-native';
import { registerRootComponent } from 'expo';
import AppLoading from 'expo-app-loading';
import { func } from './constants';
import AuthContext from './auth/context'
import OfflineNotice from './components/OfflineNotice';


// main navigation stack
import Stack from './navigation/Stack';

export default function App() {
  const [user,setUser] = useState(false)
  const [isReady, setIsReady] = useState(false)
  if(!isReady) {
    return ( 
      <AppLoading 
        startAsync={func.loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      /> 
    )
  }
  
  return (
    <AuthContext.Provider value={{user, setUser}} >
      <OfflineNotice />
      <StatusBar barStyle="light-content" />
        <Stack />
    </AuthContext.Provider>
  );
}

registerRootComponent(App);

