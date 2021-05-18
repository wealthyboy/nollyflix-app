import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SvgPlay from '../components/icons/Svg.Play';
import useAuth from '../auth/useAuth';

export default function VideoCount({ focused, count }) {
  const { user, logOut } = useAuth();
  return (
    <View>
      <Text
        style={{
          backgroundColor: 'red',
          width: 18,
          height: 18,
          color: '#fff',
          fontSize: 12,
          borderRadius: 9
        }}
      >
        {!user ? 0 : user.videos}
      </Text>
      <SvgPlay active={focused} />
    </View>
  );
}

const styles = StyleSheet.create({
  er: {
    color: 'red',
    fontSize: 13
  }
});
