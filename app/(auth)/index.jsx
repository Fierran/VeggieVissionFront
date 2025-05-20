import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity, Image, TextInput, } from 'react-native';
import LoadingModal from '../Components/Modals/ModalLoading';
import ErrorModal from '../Components/Modals/ModalError';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';

export default function SignIn() {
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Sesión iniciada");
      router.replace('home');
    } catch (error) {
      console.log(error);
      setErrorModalVisible(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <LoadingModal visible={loading} message="Iniciando sesión..." />
      <ErrorModal
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
        title="Error al iniciar sesión"
        message="Verifica tu correo y contraseña."
      />

      <View style={styles.content}>
        <Ionicons name="leaf-outline" size={150} color="#16A34A" />
        <View style={{ width: '100%' }}>
          <Text style={styles.homeText}>Bienvenido a Veggie Vision</Text>
          <TextInput
            onChangeText={setEmail}
            placeholder=" Email*"
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            onChangeText={setPassword}
            placeholder=" Contraseña*"
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View style={{ width: '100%' }}>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.ButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Text style={{ color: 'black' }}>¿Nuevo en Veggie Vision?</Text>
            <TouchableOpacity onPress={() => router.push('register')}>
              <Text style={{ color: 'black', fontWeight: 'bold' }}> Regístrate Aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    
  },
  loginButton: {
    height: 50,
    width: 250,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },
  image: {
    height: 45,
    width: 45,
    marginRight:10
  },
  input: {
    height: 40,
    padding: 5,
    alignSelf: "center",
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  homeText: {
    marginLeft: "10%", 
    marginRight: "10%",
    marginBottom: "10%",
    fontWeight:'bold', 
    fontSize:25,
    alignSelf: "center"
  },
  button:{
    backgroundColor: "#16A34A",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    width: "80%",
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
