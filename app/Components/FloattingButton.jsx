import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions, Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { router } from "expo-router";

const onButtonPress = () => {
    Alert.alert('botonflotante elevergue')
}
export default function FloattingButton() {
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.floatingButton} onPress={onButtonPress}>
                <Icon name ="camera" size={30} color={"#000"}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    floatingButton: {
        position: "absolute",
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        bottom: 30,
        right: 30,
        backgroundColor: "#09E85E",
        borderRadius: 50
    }
})