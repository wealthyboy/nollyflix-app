import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

export default function OfflineNotice() {

    const netInfo =  useNetInfo()

    if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>No Internet Connection</Text>
        </View>
    )

    return null;
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "red",
        height: 50,
        justifyContent: "center",
        position: "absolute",
        width: "100%",
        zIndex: 1,
        top: Constants.statusBarHeight
    },
    text: {
        color: "#fff"
    }
})
