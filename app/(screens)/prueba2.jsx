import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function Prueba2() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hola</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10, // add some top padding if needed
  },
});
