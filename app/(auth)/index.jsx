import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';

export default function SignIn() {
  const color = styles.container.color
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar  translucent={false} style='light' />
      <View style= {{alignItems: "center"}}>
        <Text style= {[styles.title, {marginBottom: 30}]}>Bienvenido a VeggieVision</Text>
        <TouchableOpacity style= {styles.loginButton} onPress={() => {router.push("home")}}>
          <Image source={require('../../assets/google-logo.png')} style={styles.image}/>
          <Text style={styles.textButton}>Iniciar Sesion</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0A09',
    alignItems: 'center',
    justifyContent: "center",
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
  }
  
});
