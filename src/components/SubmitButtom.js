import React from 'react'
import { StyleSheet } from 'react-native'
import AppButton from './AppButton'

import { useFormikContext } from  'formik'


export default function SubmitButtom({ title }) {
    const {  handleSubmit } = useFormikContext()

    return (
        <AppButton
            onPress={handleSubmit}
            title={title}>

        </AppButton>
    )
}

const styles = StyleSheet.create({})
