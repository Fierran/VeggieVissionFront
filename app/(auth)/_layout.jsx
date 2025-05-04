import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native"; // SafeAreaView import

const LoginLayout = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ensures it takes up full screen
    backgroundColor: "#fff", // background color for the layout
  },
});

export default LoginLayout;
