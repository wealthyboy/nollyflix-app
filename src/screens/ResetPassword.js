import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View
} from 'react-native';

import * as Yup from 'yup';

import AppText from '../components/AppText';
import AppFormField from '../components/AppFormField';
import AppForm from '../components/AppForm';
import ErrorMessage from '../components/AppErrorMessage';
import SubmitButtom from '../components/SubmitButtom';
import Header from '../components/Header';

import { colors, fonts } from '../constants';

import authApi from '../api/auth';
import useAuth from '../auth/useAuth';

import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password')
});

export default function ForgotPassword({ route, navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const checkoutUrl = 'https://nollyflix.tv/checkout';
  const { logIn } = useAuth();
  const router = route.params;
  let routerObj =
    typeof router !== 'undefined' && router.next == 'payment'
      ? { next: 'payment', video: router.video, type: router.type }
      : { next: 'home' };

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    const res = await authApi.login(email, password);

    if (!res.ok) {
      setLoginFailed(true);
      setLoading(false);
      return;
    }
    setLoginFailed(false);
    setLoading(false);

    logIn(res.data.data, res.data.meta.token);
    const user = res.data.data;
    if (typeof router !== 'undefined' && router.next == 'payment') {
      const video = router.video;
      navigation.navigate('ModalWebView', {
        url:
          checkoutUrl +
          '?type=' +
          router.type +
          '&videoid=' +
          video.id +
          '&from=app&price=' +
          video.converted_rent_price +
          '&token=' +
          user.token +
          '&email=' +
          user.email +
          '&user_id=' +
          user.id,
        next: 'VideoDetails'
      });
    } else {
      navigation.navigate('HomeMain');
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />

      <View style={styles.container}>
        <Header navigation={navigation} showBack showLogo />

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center'
          }}
        >
          <View>
            <KeyboardAvoidingView enabled>
              <View style={styles.textContainer}>
                <AppText style={styles.text}>
                  Sign in to buy, Rent movies and more.
                </AppText>
              </View>

              <AppForm
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <AppFormField
                  placeholder="Emails"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyBoardType="email-address"
                  textContentType="emailAddress"
                  name="email"
                />

                <ErrorMessage
                  error="Invalid email or password"
                  visible={loginFailed}
                />
                <SubmitButtom title="Send" />
              </AppForm>

              <View style={styles.textContainer}>
                <AppText style={styles.text}>Forgot your password? </AppText>
                <AppText
                  onPress={() =>
                    navigation.navigate('RegisterScreen', routerObj)
                  }
                  otherStyle={styles.registerLinkText}
                >
                  New to Nollyflix? Sign up now
                </AppText>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  logo: {
    width: 60,
    height: 90,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 20
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginBottom: 24,
    marginTop: 8,
    textAlign: 'center'
  },
  registerLinkText: {
    color: colors.moreBlue,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginBottom: 15,
    marginTop: 8,
    textAlign: 'center'
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10
  }
});
