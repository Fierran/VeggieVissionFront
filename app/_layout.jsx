import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { View, ActivityIndicator } from "react-native";

const RootLayout = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setInitialRoute("(tabs)");   // usuario logueado
      } else {
        setInitialRoute("(auth)");   // usuario no logueado
      }
    });

    return () => unsubscribe();
  }, []);

  if (!initialRoute) {
    return (
      <SafeAreaProvider>
        <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
          <ActivityIndicator size="large" color="#16A34A" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack initialRouteName={initialRoute}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
};

export default RootLayout;
