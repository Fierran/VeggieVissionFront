import React from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Register() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput placeholder="Nombre" style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Apellido:</Text>
          <TextInput placeholder="Apellido" style={styles.input} />
        </View>
      </View>

      <View style={styles.fullWidthInputContainer}>
        <Text style={styles.label}>Correo Electrónico:</Text>
        <TextInput placeholder="Correo Electrónico" style={styles.fullWidthInput} />
      </View>

      <View style={styles.fullWidthInputContainer}>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput placeholder="Contraseña" secureTextEntry style={styles.fullWidthInput} />
      </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
            <Text style={styles.ButtonText}>Registrarse</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  fullWidthInputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  fullWidthInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    width: '100%',
  },
  button:{
    backgroundColor: "#16A34A",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10
  },
  ButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
