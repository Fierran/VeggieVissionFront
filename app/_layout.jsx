import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
    return(
            <SafeAreaProvider>
                <Stack initialRouteName="(auth)">
                    <Stack.Screen name="(auth)"options={{headerShown: false}}/>
                    <Stack.Screen name="(tabs)"options={{headerShown: false}}/>
                    <Stack.Screen name="(screens)"options={{headerShown: false}}/>
                </Stack>
            </SafeAreaProvider>
    )
}

export default RootLayout