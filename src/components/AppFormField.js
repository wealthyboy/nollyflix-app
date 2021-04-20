import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useFormikContext } from  'formik'

import AppTextInput from './AppTextInput'
import AppErrorMessage from './AppErrorMessage'

export default function AppFormField({ name,...otherProps }) {
    const {  setFieldTouched, setFieldValue, handleChange, errors ,touched ,values } = useFormikContext()
    return (
        <>
            <AppTextInput
                {...otherProps}
                onChangeText={(text) => setFieldValue(name , text)}
                onBlur={() => setFieldTouched(name)}
                value={values[name]}
            />
            <AppErrorMessage visible={touched[name]} error={errors[name]}></AppErrorMessage>           
        </>
        
    )
}

const styles = StyleSheet.create({})
