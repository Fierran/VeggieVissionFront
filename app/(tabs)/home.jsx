import React, { useState, useRef, useEffect } from 'react';
import {FlatList, View, Text, StyleSheet, Animated, TouchableOpacity, Button, Image, Modal, TextInput } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import FloattingButton from "../Components/FloattingButton";
import Search from '../Components/search';
import lotesData from '../../assets/data/ejemplos.json';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from 'expo-router';
import Weather from '../Components/weather';
import { useIsFocused } from "@react-navigation/native";
import Icon2 from "react-native-vector-icons/FontAwesome6";
import { Picker } from '@react-native-picker/picker';




export default function Home() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(lotesData);
  const [hideHeader, setHideHeader] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState(null); // "fruta" | "verdura" | null
  const [filtroEstado, setFiltroEstado] = useState(null); // "maduro", "verde", etc.

  const [tempTipo, setTempTipo] = useState('');
  const [tempEstado, setTempEstado] = useState('');

  const aplicarFiltros = (texto, tipo, estado) => {
    const filtered = lotesData.filter(item => {
      const coincideTexto =
        item.name?.toLowerCase().includes(texto.toLowerCase()) ||
        item.id?.toString().includes(texto);
  
      const coincideTipo = !tipo || item.tipo === tipo;
      const coincideEstado = !estado || item.estado === estado;
  
      return coincideTexto && coincideTipo && coincideEstado;
    });
  
    setFilteredData(filtered);
  };
  

  const handleSearch = (text) => {
    setSearchText(text);
    aplicarFiltros(text, filtroTipo, filtroEstado,);
  };
  

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
            <View style= {{ backgroundColor: "#bfdeff", width: "45%", borderRadius: 5, padding: 7}}>
              <Text>Madura en:</Text>
              <Text>{item.diasRestantes} dias</Text>
            </View>
            <View style= {{width: "10%"}}></View>
            <View style= {{ backgroundColor: "#ffc3ba", width: "45%", borderRadius: 5, padding: 7}}>
              <Text>Se pudre en:</Text>
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
        <Text>{item.estado}</Text>
      </View>
    </View>
  );

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>we need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      let finalUri = encodeURIComponent(photo.uri);
      router.replace({
        pathname: "PhotoImage",
        params: { photoUri: finalUri },
      });
    }
  };

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 100],        
    outputRange: [0, -150],       
    extrapolate: 'clamp',
  });
  

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerTranslate }] }]}>
        <Text style={styles.header}>DashBoard</Text>
        <Search searchText={searchText} handleSearch={handleSearch} />
        <TouchableOpacity onPress={() => {
          setTempTipo(filtroTipo);
          setTempEstado(filtroEstado);
          setModalVisible(true);
        }}>
          <Text>🔍 Filtros</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 100, paddingBottom: 30 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />

      <FloattingButton
        onPress={() => {
          setTempTipo(filtroTipo);
          setTempEstado(filtroEstado);
          setModalVisible(true);
        }}
        icon="plus"
        backgroundColor="#09E85E"
        position={{ bottom: 30, right: 30 }}
      />
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 }}>
            <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Filtros</Text>

              <Text>Tipo:</Text>
              <Picker
                selectedValue={tempTipo}
                onValueChange={(itemValue) => setTempTipo(itemValue)}
                style={{ marginBottom: 10 }}
              >
                <Picker.Item label="Todos" value="" />
                <Picker.Item label="Fruta" value="fruta" />
                <Picker.Item label="Verdura" value="verdura" />
              </Picker>

              <Text>Estado:</Text>
              <Picker
                selectedValue={tempEstado}
                onValueChange={(itemValue) => setTempEstado(itemValue)}
                style={{ marginBottom: 10 }}
              >
                <Picker.Item label="Todos" value="" />
                <Picker.Item label="Maduro" value="Maduro" />
                <Picker.Item label="Verde" value="Verde" />
                <Picker.Item label="Podrido" value="Pasada" />
              </Picker>

              <Button
                title="Aplicar Filtros"
                onPress={() => {
                  setFiltroTipo(tempTipo);
                  setFiltroEstado(tempEstado);
                  aplicarFiltros(searchText,tempTipo, tempEstado);
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </Modal>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
      backgroundColor: "#f2ffb0", 
      height: 25,
      width: 60, 
      borderRadius: 5, 
      justifyContent: "center", 
      alignItems: "center"
  }
  
});
