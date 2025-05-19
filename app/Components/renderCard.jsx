import React, { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity, Button, Image, } from "react-native";
import Icon2 from "react-native-vector-icons/FontAwesome6";
import Icon from 'react-native-vector-icons/AntDesign';
import { auth, db } from '../../firebase-config';
import { collection, query, where, getDocs } from "firebase/firestore";

const obtenerAnalisis = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(collection(db, "analisis"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    const analisis = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.fruta,
        uri: data.imagen, // base64
        diasRestantes: data.ripes_in_days,
        estado: data.category,
        temperatura: data.temperatura,
        humedad: data.humedad
      };
    });

    return analisis;

  } catch (error) {
    console.error("Error al obtener análisis:", error);
    return [];
  }
};


export default function RenderCard() {
    const [analisisGuardados, setAnalisisGuardados] = useState([]);

      //Obtiene los
    useEffect(() => {
    const cargarDatos = async () => {
      const datos = await obtenerAnalisis();
      setAnalisisGuardados(datos);
    };
    cargarDatos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View style={{padding: 10}}>
        <Text style={styles.title}>{item.name}</Text>
        <TouchableOpacity>
          <View style={{flexDirection: "row", marginTop: 5, marginBottom: 5}}>
              <View style={{flexDirection:"row", marginRight: 10, alignItems: "center"}}>
                  <Icon2 name="temperature-half" color={"gray"} size={20}/>
                  <Text style= {[styles.text, {color: "gray"}]}> 0°C</Text>
              </View>
              <View style={{flexDirection:"row", alignItems: "center"}}>
                  <Icon2 name="droplet" color={"gray"} size={20}/>
                  <Text style= {[styles.text, {color: "gray"}]}> 0%</Text>
              </View>
          </View>
          <View style= {{flexDirection: "row"}}>
            <View style= {{ backgroundColor: "#EFF6FF", width: "45%", borderRadius: 5, padding: 7}}>
              <Text style={{color: "#3B82F6"}}>Madura en:</Text>
              <Text>{item.diasRestantes} dias</Text>
            </View>
            <View style= {{width: "10%"}}></View>
            <View style= {{ backgroundColor: "#FFFBEB", width: "45%", borderRadius: 5, padding: 7}}>
              <Text style={{color: "#F59E08"}}>Se pudre en:</Text>
              <Text>{item.diasRestantes} dias</Text>
            </View>
          </View>
          </TouchableOpacity>
      </View>
      
      <View style={{backgroundColor: "#f5f5f5", padding: 10, justifyContent: "center"}}>
        <Text style= {{opacity: 60}}>Escaneado por Ferran</Text>
      </View>
      <View style={styles.id}>
        <Text>{item.id}</Text>
      </View>
      <View style={styles.estado}>
        <Text style = {{color: '166534'}}>{item.estado}</Text>
      </View>
    </View>
  );

  return (
    <>
      <Animated.FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 130, paddingBottom: 30 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: 100,
  },
  textContainer: {
    flex: 1,

    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 10,
    elevation: 4,
    overflow: 'hidden',
    paddingBottom: 20
  },
  id: {
    position: 'absolute', 
      left: 10, 
      top: 10,
      backgroundColor: "#f1f1f1", 
      height: 25,
      width: 50, 
      borderRadius: 5, 
      justifyContent: "center", 
      alignItems: "center"
  },
  estado: {
      position: 'absolute', 
      flexGrow: 1,
      right: 10, 
      top: 10,
      backgroundColor: "#DCFCE7", 
      height: 25,
      width: 60, 
      borderRadius: 5, 
      justifyContent: "center", 
      alignItems: "center"
  },
  fylter: {
    height: "30%", 
    backgroundColor: "#fff", 
    elevation: 5,
    width: "20%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  button: {
    height: "15%",
    width: "80%",
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#16A34A",
    alignSelf: 'center',
    borderRadius: 5,
  }
  
});
