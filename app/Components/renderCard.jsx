import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import lotesData from '../../assets/data/ejemplos.json'

export default function RenderCard() {
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    setLotes(lotesData);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.producto}</Text>
        <Text>ID: {item.id}</Text>
        <Text>Estado: {item.estado}</Text>
        <Text>Días restantes: {item.diasRestantes}</Text>
        <Text>Pudrición: {item.fechaPudricion}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={lotes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  card: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#d9d9d9',
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
