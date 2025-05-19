import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity, Image, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';

export default function SignIn() {
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')

    const handleSignIn = () => {
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        console.log("Sesion iniciada")
        const user = userCredential.user
        router.replace('home')
      })
      .catch(error => {
        console.log(error)
      })
    }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
          <Ionicons name="leaf-outline" size={150} color="#16A34A" />
            <View style={{width: '100%'}}>
              <Text style={styles.homeText}>Bienvenido a Veggie Vision</Text>
              <TextInput onChangeText= {(text) => setEmail(text)} placeholder=' Nombre de Usuario*' style={styles.input}/>
              <TextInput onChangeText= {(text) => setPassword(text)} placeholder=' Contraseña*' style={styles.input}/>
            </View>
            <View style={{width: '100%'}}>
              <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.ButtonText}>Iniciar sesion</Text>
            </TouchableOpacity>
              <View style={{ flexDirection: "row", alignSelf: 'center'}}>
                <Text style={{color: "black"}}>¿Nuevo en Veggie Vision?</Text>
                <TouchableOpacity onPress={() => router.push('register')}>
                    <Text style={{color: "black", fontWeight: "bold"}}> Registrate Aquí</Text>
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
