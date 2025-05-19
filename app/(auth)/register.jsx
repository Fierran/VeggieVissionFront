import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../../firebase-config";

import LoadingModal from '../Components/Modals/ModalLoading';
import ErrorModal from '../Components/Modals/ModalError';
import SuccessModal from "../Components/Modals/ModalSucces";

export default function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleCreateAccount = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const fullName = `${name} ${lastName}`;
      await updateProfile(user, { displayName: fullName });
      console.log("Usuario registrado", user);
      setSuccessModalVisible(true);
    } catch (error) {
      console.log(error);
      setErrorModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar el modal de éxito y navegar a la pantalla de inicio
  const handleSuccessClose = () => {
    setSuccessModalVisible(false);
    router.replace('/');  // Navega a index (pantalla principal)
  };

  return (
    <View style={styles.container}>
      {/* Modales */}
      <LoadingModal visible={loading} message="Registrando usuario..." />
      <ErrorModal
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
        title="Error al registrar"
        message="Verifica tus datos e inténtalo de nuevo."
      />
      <SuccessModal
        visible={successModalVisible}
        onClose={handleSuccessClose}
        title="¡Registro exitoso!"
        message="Bienvenido a Veggie Vision."
      />

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            onChangeText={setName}
            placeholder="Nombre"
            style={styles.input}
            autoCapitalize="words"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Apellido:</Text>
          <TextInput
            onChangeText={setLastName}
            placeholder="Apellido"
            style={styles.input}
            autoCapitalize="words"
          />
        </View>
      </View>

      <View style={styles.fullWidthInputContainer}>
        <Text style={styles.label}>Correo Electrónico:</Text>
        <TextInput
          onChangeText={setEmail}
          placeholder="Correo Electrónico"
          style={styles.fullWidthInput}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.fullWidthInputContainer}>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          onChangeText={setPassword}
          placeholder="Contraseña"
          secureTextEntry
          style={styles.fullWidthInput}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
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
  button: {
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
