import React from "react";
import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Weather from "../Components/weather";

const TabLayout = () => {
    return(
        <Tabs screenOptions={{
            tabBarStyle:{backgroundColor: "#292524", borderTopWidth: 0},
            tabBarInactiveTintColor: "#FFF",
            tabBarActiveTintColor: "#09E85E",
            
        }}>
            <Tabs.Screen name="home" options={{title: "Analisis", tabBarIcon: ({color, size}) => <Icon name = {'camera'} color={color} size={size}/>,
            headerStyle:{backgroundColor: "#292524" }, headerTitleStyle:{color: "#fff", fontWeight: "bold"},
            headerRight: () => (
                <Weather/>
            )}}/>
            <Tabs.Screen name="prueba" options={{title: "Inventario", tabBarIcon: ({color, size}) => <Icon name = {'box'} color={color} size={size}/>,
            headerStyle:{backgroundColor: "#292524" }, headerTitleStyle:{color: "#fff", fontWeight: "bold"},
            headerRight: () => (
                <Weather/>
            )}}/>
        </Tabs>
    )
}

export default TabLayout