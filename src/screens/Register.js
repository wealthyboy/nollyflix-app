import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';

import * as Yup from 'yup';

import AppText from '../components/AppText';
import AppFormField from '../components/AppFormField';
import AppForm from '../components/AppForm';
import ActivityIndicator from '../components/ActivityIndicator';
import AppErrorMessage from '../components/AppErrorMessage';

import SubmitButtom from '../components/SubmitButtom';
import Header from '../components/Header';

import useAuth from '../auth/useAuth';

import usersApi from '../api/users';
import useApi from '../hooks/useApi';
import authApi from '../api/auth';

import { colors, fonts } from '../constants';

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required().label('First name'),
  last_name: Yup.string().required().label('Last name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password')
});

export default function Register({ navigation }) {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const { logIn } = useAuth();
  const [error, setError] = useState();
  const checkoutUrl = 'https://nollyflix.tv/checkout';

  const [errorsObj, setErrorsObj] = useState();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const keyboard = useKeyboard();

  const route = navigation.state.params;

  const onFocus = () => {
    console.log('keyboard isKeyboardShow: ', keyboard.keyboardShown);
    console.log('keyboard keyboardHeight: ', keyboard.keyboardHeight);
  };

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);
    if (!result.ok) {
      setErrorsObj(result.data.errors);
      console.log(errorsObj);
      return;
    }

    const res = await loginApi.request(userInfo.email, userInfo.password);
    if (!res.ok) return setError(true);
    setError(false);
    logIn(res.data.data, res.data.meta.token);

    if (typeof route !== 'undefined' && route.next == 'payment') {
      const video = route.video;
      navigation.navigate('ModalWebView', {
        url:
          checkoutUrl +
          '?type=' +
          route.type +
          '&videoid=' +
          video.id +
          '&price=' +
          video.converted_rent_price +
          '&userid=' +
          user.id
      });
    } else {
      navigation.navigate('HomeMain');
    }
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Header showBack />
      <View style={styles.container}>
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
              <AppForm
                style={{ marginTop: 60 }}
                initialValues={{
                  first_name: '',
                  last_name: '',
                  email: '',
                  password: ''
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <AppFormField
                  placeholder="First Name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  name="first_name"
                  onFocus={onFocus}
                />

                <AppFormField
                  placeholder="Last Name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  name="last_name"
                />

                <AppFormField
                  placeholder="Email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyBoardType="email-address"
                  textContentType="emailAddress"
                  name="email"
                />
                <AppErrorMessage
                  visible={registerApi.error}
                  error={
                    typeof errorsObj !== 'undefined' &&
                    typeof errorsObj.email !== 'undefined'
                      ? errorsObj.email[0]
                      : null
                  }
                ></AppErrorMessage>

                <AppFormField
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                  secureTextEntry
                  name="password"
                />
                <AppErrorMessage
                  visible={registerApi.error}
                  error={
                    typeof errorsObj !== 'undefined' &&
                    typeof errorsObj.password !== 'undefined'
                      ? errorsObj.password[0]
                      : null
                  }
                ></AppErrorMessage>

                <SubmitButtom title="Sign Up" />
              </AppForm>
              <View style={styles.textContainer}>
                <AppText
                  style={styles.text}
                  onPress={() => navigation.navigate('LoginScreen')}
                >
                  Already have an account? Login
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
    padding: 10,
    backgroundColor: colors.black,
    flex: 1
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
  textContainer: {
    alignItems: 'center',
    marginBottom: 10
  }
});
