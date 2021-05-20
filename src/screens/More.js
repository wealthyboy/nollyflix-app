import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import Constants from 'expo-constants';
import { colors, fonts, gStyle } from '../constants';
import useAuth from '../auth/useAuth';

// components
import Cast from '../components/Cast';
import HeaderAccounts from '../components/HeaderAccounts';
import TouchLineItem from '../components/TouchLineItem';

// icons
import SvgBell from '../components/icons/Svg.Bell';
import SvgPlay from '../components/icons/Svg.Play';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import Auth from '../components/Auth';

const privacyUrl = 'https://nollyflix.tv/pages/privacy-policy?mobile=true';
const faqUrl = 'https://nollyflix.tv/pages/faq?mobile=true';
const cookieUrl = 'https://nollyflix.tv/pages/cookie-policy?mobile=true';
const termsUrl = 'https://nollyflix.tv/pages/terms-conditions?mobile=true';

function More({ navigation }) {
  const { user, logOut } = useAuth();
  console.log(user);
  const handleLogout = () => {
    logOut();
    navigation.navigate('HomeMain');
  };

  const alertSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure that you want to sign out?',
      [{ text: 'No' }, { text: 'Yes', onPress: () => handleLogout() }],
      { cancelable: false }
    );
  };

  if (user === null) {
    return (
      <Auth
        navigation={navigation}
        user={user}
        text="Please sign in to access your profile, videos and more"
      />
    );
  }

  return (
    <>
      <View style={gStyle.container}>
        <HeaderAccounts navigation={navigation} user={user} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchLineItem
            icon={<SvgBell />}
            showBorder
            showArrow={false}
            showSwitch={true}
            notificationStatus={user.notificationStatus ? true : false}
            text="Notifications"
            onPress={() => null}
          />
          <TouchLineItem
            icon={<SvgPlay />}
            onPress={() => navigation.navigate('MyVideos')}
            showBorder
            showSwitch={false}
            text="My Videos"
          />

          {/* <TouchLineItem
                onPress={() => navigation.navigate('MoreAppSettingsScreen')}
                showArrow={false}
                showBorder
                text="App Settings"
              /> */}
          <TouchLineItem
            onPress={() => {
              navigation.navigate('ModalWebView', { url: privacyUrl });
            }}
            showArrow={true}
            text="Privacy"
          />
          <TouchLineItem
            onPress={() => {
              navigation.navigate('ModalWebView', { url: faqUrl });
            }}
            showArrow={true}
            text="FAQ"
          />

          <TouchLineItem
            onPress={() => {
              navigation.navigate('ModalWebView', { url: cookieUrl });
            }}
            showArrow={true}
            text="Cookie Policy"
          />

          <TouchLineItem
            onPress={() => {
              navigation.navigate('ModalWebView', { url: termsUrl });
            }}
            showArrow={true}
            text="Terms of Use"
          />

          <TouchLineItem
            onPress={() => alertSignOut()}
            showArrow={false}
            text="Sign Out"
          />
          <Text style={styles.versionText}>
            {`Version: ${Constants.manifest.version}`}
          </Text>
        </ScrollView>
      </View>
    </>
  );
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

export default More;
