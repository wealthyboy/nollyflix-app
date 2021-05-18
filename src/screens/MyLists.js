import * as React from 'react';
import { Text, View } from 'react-native';
import { gStyle } from '../constants';

// components
import Cast from '../components/Cast';
import HeaderHome from '../components/HeaderHome';

const MyLists = () => (
  <View style={gStyle.container}>
    <HeaderHome show />

    <View style={gStyle.spacer96} />

    <View style={gStyle.pH4}>
      <Text style={gStyle.heading}>My List</Text>
    </View>

    <Cast />
  </View>
);

export default MyLists;
