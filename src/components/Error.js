import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './AppText';
import AppButton from './AppButton';

function Error({ error = false, onPress, msg }) {
  if (!error) return null;

  return (
    <View style={styles.container}>
      <AppText>{msg}</AppText>
      <AppButton title="Retry" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
});

export default Error;
