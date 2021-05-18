import React, { useState } from 'react';
import {
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

import forgotApi from '../api/forgotPassword';

import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email')
});

export default function ForgotPassword({ route, navigation }) {
  const [forgotFailed, setforgotFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [title, setTitle] = useState('Email your to reset your password.');

  const router = route.params;

  const handleSubmit = async ({ email }) => {
    setLoading(true);
    const res = await forgotApi.ForgotPassword(email);
    if (!res.ok) {
      setforgotFailed(true);
      setLoading(false);
      console.log(res.data.message);
      return;
    }
    setTitle('A code has been sent to youe email');
    setShowResetForm(true);
    setforgotFailed(false);
    setLoading(false);
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
                <AppText style={styles.text}>{title}.</AppText>
              </View>

              {showResetForm && (
                <AppForm
                  initialValues={{ email: '', password: '' }}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  <AppFormField
                    placeholder="Code"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyBoardType="email-address"
                    textContentType="emailAddress"
                    name="email"
                  />

                  <AppFormField
                    placeholder="New Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyBoardType="email-address"
                    textContentType="emailAddress"
                    name="email"
                  />

                  <ErrorMessage
                    error="Invalid email or password"
                    visible={forgotFailed}
                  />
                  <SubmitButtom title="Send" />
                </AppForm>
              )}

              {!showResetForm && (
                <AppForm
                  initialValues={{ email: '', password: '' }}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  <AppFormField
                    placeholder="Email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyBoardType="email-address"
                    textContentType="emailAddress"
                    name="email"
                  />

                  <ErrorMessage
                    error="Invalid email or password"
                    visible={forgotFailed}
                  />
                  <SubmitButtom title="Send" />
                </AppForm>
              )}
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
