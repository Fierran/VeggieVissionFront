import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
export default function Weather () {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);

    useEffect(() => {
        //Endpoint que va aregresar temperatura y humedad
    fetch("https://veggie-vision-backend.up.railway.app/ambient")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => {
        setTemperature(data.temperature);
        setHumidity(data.humidity);
      })
      .catch((error) => {
        console.error("Error al obtener datos del clima:", error);
      });
    }, []);
    return(
        <View style={styles.container}>
            <View style={{flexDirection:"row", marginRight: "20%", alignItems: "center"}}>
                <Icon name="temperature-half" color={"gray"} size={20}/>
                <Text style= {[styles.text, {color: "gray"}]}> {temperature}°C</Text>
            </View>
            <View style={{flexDirection:"row", alignItems: "center"}}>
                <Icon name="droplet" color={"gray"} size={20}/>
                <Text style= {[styles.text, {color: "gray"}]}> {humidity}%</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        flexDirection: 'row',
    },
    text : {
        fontSize: 20, 
        fontWeight: "bold"
    }


})