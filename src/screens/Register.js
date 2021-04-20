import React, { useState } from 'react'
import { Image, StyleSheet,TouchableOpacity, View } from 'react-native'

import * as Yup from 'yup'

import AppText from '../components/AppText'
import AppFormField from '../components/AppFormField'
import AppForm from '../components/AppForm'
import ActivityIndicator  from '../components/ActivityIndicator'

import ErrorMessage from "../components/AppErrorMessage";
import SubmitButtom from '../components/SubmitButtom'
import Header from '../components/Header';

import useAuth from '../auth/useAuth';

import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import authApi from '../api/auth';

import { colors,fonts } from '../constants';




const validationSchema = Yup.object().shape({
    first_name: Yup.string().required().label("First name"),
    last_name: Yup.string().required().label("Last name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
})

export default function Register({ navigation }) {
   

    const registerApi = useApi(usersApi.register);
    const loginApi = useApi(authApi.login);
    const { logIn } = useAuth()
    const [error, setError] = useState();
    const route =  navigation.state.params;


    const handleSubmit = async (userInfo) => {
        const result = await registerApi.request(userInfo);

        if (!result.ok) {
            if (result.data) setError(result.data.error);
            else {
                setError("An unexpected error occurred.");
                console.log(result);
            }
            return;
        }

        const res = await loginApi.request(
           userInfo.email,
           userInfo.password
        );
        if (!res.ok) return setError(true);
        setError(false);
        logIn(res.data.data, res.data.meta.token)

        if ( typeof route !== "undefined" && route.next == "payment" ) {
            const video= route.video;
            navigation.navigate('ModalWebView', { url: checkoutUrl+'?type='+ route.type +'&videoid='+ video.id +'&price='+ video.converted_rent_price +'&userid='+ user.id } );
        } else {
            navigation.navigate('HomeMain')
        }
    };
    
    return (
    
        <>
        <ActivityIndicator visible={registerApi.loading || loginApi.loading} />

        <Header showBack  />

        <View style={styles.container}>
            <TouchableOpacity
               activeOpacity={0.7}
               onPress={() => navigation.navigate('HomeMain')}
            >
                <Image
                   style={styles.logo}
                    source={require("../assets/icon.png")}
                />
             
            </TouchableOpacity>
            
            <AppForm style={{ marginTop: 60}}
                initialValues={{ first_name: '', last_name: '', email: '', password: '' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >   
                <AppFormField
                    autoFocus
                    icon="account"
                    placeholder="First Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    name="first_name"
                />


                <AppFormField
                    icon="account"
                    placeholder="Last Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    name="last_name"
                />


                <AppFormField
                    icon="email"
                    placeholder="Email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyBoardType="email-address"
                    textContentType="emailAddress"
                    name="email"
                />


                <AppFormField
                    icon="lock"
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="password"
                    secureTextEntry
                    name="password" 
                /> 
                <SubmitButtom title="Sign Up" />
            
            </AppForm>
            <View style={styles.textContainer}>
               <AppText style={styles.text}  onPress={() => navigation.navigate('Login')} >Already have an account? Login</AppText>
            </View>
        </View>
        </>
        
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.black,
        flex: 1,
    },
    logo: {
        width: 60,
        height: 90,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
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
        alignItems: "center",
        marginBottom: 10
    }
      
})


