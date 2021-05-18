import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, gStyle } from '../constants';

// icons
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';

function Auth({ navigation, user, text }) {
  if (user) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{text}</Text>
      <AppButton
        onPress={() => navigation.navigate('LoginScreen')}
        title="Login"
      ></AppButton>
      <Text style={styles.buttonText}>or</Text>
      <View>
        <AppText
          onPress={() => navigation.navigate('RegisterScreen')}
          style={styles.buttonText}
        >
          {' '}
          Sign up
        </AppText>
      </View>
    </View>
  );

  return null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgGrey,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  description: {
    alignSelf: 'center',
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    width: 300
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    padding: 16,
    width: '100%'
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center'
  }
});

export default Auth;
