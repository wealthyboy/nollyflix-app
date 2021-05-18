import React, { useState, useContext } from 'react';
import { StatusBar } from 'react-native';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import AppLoading from 'expo-app-loading';
import { func } from './constants';
import * as Linking from 'expo-linking';

import AuthContext from './auth/context';
import OfflineNotice from './components/OfflineNotice';
import authStorage from './auth/storage';

import navTheme from './navigation/NavigationTheme';

// main navigation stack
import Stack from './navigation/Main';

const prefix = Linking.createURL('/');

export default function App() {
  const [user, setUser] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const linking = {
    prefixes: [prefix]
  };

  const restoreUser = async () => {
    const user = await authStorage.getUserOb();
    if (user) {
      setUser(JSON.parse(user));
    } else {
      setUser(null);
    }
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <StatusBar barStyle="light-content" />

      <OfflineNotice />

      <NavigationContainer linking={linking} theme={navTheme}>
        <Stack />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

registerRootComponent(App);
