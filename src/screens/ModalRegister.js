import React, { useState } from 'react'
import { Image, StyleSheet,TouchableOpacity, View } from 'react-native'

import * as Yup from 'yup'

import AppText from '../components/AppText'
import AppFormField from '../components/AppFormField'
import AppForm from '../components/AppForm'
import ErrorMessage from "../components/AppErrorMessage";
import SubmitButtom from '../components/AppButton'
import Header from '../components/Header';

import useAuth from '../auth/useAuth';
import { colors,fonts } from '../constants';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'




const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
})

export default function ModalRegister() {
    const [loginFailed, setLoginFailed] = useState(false)
    //const { logIn } = useAuth()

    const handleSubmit =  async ({ email, password }) => {
        // const res  = await authApi.login(email,password)
        // if (!res.ok) return setLoginFailed(true);
        // setLoginFailed(false)
        // logIn(res.data)   
        console.log(email,password)
    }
    
    return (
    
        <>
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
                initialValues={{ email: '', password: '' }}
                onSubmit={() => console.log(true)}
                validationSchema={validationSchema}
            >   
                <AppFormField
                    autoFocus
                    icon="account"
                    placeholder="Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                    name="email"
                />


                <AppFormField
                    icon="account"
                    placeholder="Last Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                    name="email"
                />


                <AppFormField
                    autoFocus
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
        
            <AppText style={styles.text}>Already have an account? Login</AppText>
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
      
})


