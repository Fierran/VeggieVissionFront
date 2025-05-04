import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const PhotoLayout = () => {
    return(
            <Stack>
                 <Stack.Screen name="PhotoImage" options={{title: "Resultados", headerBackVisible: false, headerShown: true,
                    headerStyle:{backgroundColor: "#292524" }, headerTitleStyle:{color: "#fff", fontWeight: "bold" }, headerTitleAlign: "center"
                   }}/>
                 <Stack.Screen name="prueba2" options={{title: "Fruta", headerBackButtonMenuEnabled: true, headerShown: true, }}/>
            </Stack>
    )
}

export default PhotoLayout