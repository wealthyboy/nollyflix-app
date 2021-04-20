import React, {useContext} from 'react';

import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import preloadFonts from './preloadFonts';
import preloadImages from './preloadImages';
import authStorage from "../auth/storage";

import AuthContext from '../auth/context'


// cache fonts
// /////////////////////////////////////////////////////////////////////////////
const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));






// preload async
// /////////////////////////////////////////////////////////////////////////////
const loadAssetsAsync = async () => {
  // preload assets
  const fontAssets = cacheFonts(preloadFonts);

  // promise load all
  return Promise.all([...fontAssets]);
};

export default {
  cacheFonts,
  loadAssetsAsync,
};
