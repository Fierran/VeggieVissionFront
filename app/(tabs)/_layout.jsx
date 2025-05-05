import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-vector-icons/Feather";
import { View } from "react-native";
import Weather from "../Components/weather";
import { Ionicons } from '@expo/vector-icons';

const TabLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="home" options={{title: "VeggieVision", headerBackVisible: false, tabBarIcon: ({color, size}) => <Icon name = {'camera'} color={color} size={size}/>,
            headerStyle:{backgroundColor: "#fff" }, headerTitleStyle:{color: "#000", fontWeight: "bold", },
            headerLeft: () => (
                <Ionicons name="leaf-outline" size={24} color="#16A34A" style={{paddingRight: 3}} />
            ),
            headerRight: () => (
                <Weather/>
            )}}/>
            
        </Stack>
    )
}

export default TabLayout