import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Button, Alert, Touchable, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function PhotoImage() {
  const { photoUri } = useLocalSearchParams();
  const [analysisResult, setAnalysisResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Simular un análisis de red neuronal (en producción, sería un fetch al backend)
    setTimeout(() => {
      setAnalysisResult({
        producto: "Mango",
        estado: "Maduro",
        diasRestantes: 4,
        fechaPudricion: "2025-05-05"
      });
    }, 1500); // Simula tiempo de procesamiento
  }, []);

  const handleTrackLot = () => {
    Alert.alert(
      "Lote rastreado",
      "Se ha generado un ID y agregado al inventario (simulado)."
    );
    // En el futuro: guardar lote en backend o contexto
    router.push("Inventory"); // Navega al inventario
  };

  if (!analysisResult) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Analizando imagen...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.image} />
      <View style={styles.resultContainer}>
        <Text style={styles.label}>Producto: <Text style={styles.value}>{analysisResult.producto}</Text></Text>
        <Text style={styles.label}>Estado: <Text style={styles.value}>{analysisResult.estado}</Text></Text>
        <Text style={styles.label}>Días restantes: <Text style={styles.value}>{analysisResult.diasRestantes}</Text></Text>
        <Text style={styles.label}>Fecha de pudrición: <Text style={styles.value}>{analysisResult.fechaPudricion}</Text></Text>
      </View>
        <TouchableOpacity style={[styles.buttonContainer, {marginBottom: 10}]} onPress={handleTrackLot} >
          <Text style= {styles.textbutton}>Rastrear lote</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: "white"}]} onPress={() => router.push('home')} >
          <Text style= {[styles.textbutton, {color: "#000"}]}>Volver a Analizar</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#0C0A09",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  resultContainer: {
    width: "90%",
    marginBottom: 20,
    backgroundColor: "#212121",
    borderRadius: 100,
    padding: 16,
    borderRadius: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
    color: '#fff'
  },
  value: {
    fontWeight: "normal",
  },
  text: {
    marginTop: 50,
    fontSize: 18,
    color: '#fff'
  },
  textbutton: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#fff'
  },
  buttonContainer: {
    width: 320,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#09E85E",
    alignItems: "center",
    justifyContent: "center",
  },
});
