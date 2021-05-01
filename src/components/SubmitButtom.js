import React from 'react'
import { StyleSheet } from 'react-native'
import AppButton from './AppButton'

import { useFormikContext } from  'formik'
import { colors } from '../constants';



export default function SubmitButtom({ title }) {
    const {  handleSubmit } = useFormikContext()

    return (
        <AppButton
            onPress={handleSubmit}
            title={title}
            otherStyle={styles.button}
        >
            

        </AppButton>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#000",
        borderColor: colors.white,
        borderWidth: 1,
        borderRadius: 7,
        marginTop: 30
    }
})
