import React from 'react'
import { StyleSheet } from 'react-native'

import { useFormikContext } from  'formik'

import AppErrorMessage from './AppErrorMessage'
import AppPicker from './AppPicker'

export default function AppFormPicker({ name, items , numberOfColumns, PickerItemComponent,placeholder }) {
    const {  errors, setFieldValue, touched ,values} = useFormikContext()
    return (
        <>
            <AppPicker
                items={items}
                numberOfColumns={numberOfColumns}
                placeholder={placeholder}
                selectedItem={values[name]}
                onSelectItem={(item) => setFieldValue(name, item)}
                PickerItemComponent={PickerItemComponent}
            />
            <AppErrorMessage visible={touched[name]} error={errors[name]}></AppErrorMessage>           
        </>
        
    )
}

const styles = StyleSheet.create({})
