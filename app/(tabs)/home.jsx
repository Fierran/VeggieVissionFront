import React, { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity, Button, Image, } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import FloattingButton from "../Components/FloattingButton";
import Search from '../Components/search';
import lotesData from '../../assets/data/ejemplos.json';
import { useRouter } from 'expo-router';
import Weather from '../Components/weather';
import { useIsFocused } from "@react-navigation/native";
import Icon2 from "react-native-vector-icons/FontAwesome6";
import Icon from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import ModalPhoto from '../Components/Modals/ModalFoto';
import ModalFilter from '../Components/Modals/ModalFilter';
import { auth } from '../../firebase-config';




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
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState(null); 
  const [nombre,setNombre] = useState('')

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

    useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setNombre(user.displayName);  // Aquí obtenemos el nombre completo
    }
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
        <Text style={styles.header}>DashBoard de {nombre || 'Usuario'}</Text>
        <Search searchText={searchText} handleSearch={handleSearch} />
        <TouchableOpacity style= {styles.fylter} onPress={() => {
          setTempTipo(filtroTipo);
          setTempEstado(filtroEstado);
          setModalVisible(true);
        }}>
          <Icon name="filter" size={20} color={'#000'}/>
          <Text>Filtros</Text>
        </TouchableOpacity>
      </Animated.View>

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

      <FloattingButton
        onPress={() => {
          setTempTipo(filtroTipo);
          setTempEstado(filtroEstado);
          setPhotoModalVisible(true);
        }}
        icon="plus"
        backgroundColor="#16A34A"
        position={{ bottom: 30, right: 30 }}
      />
      <ModalFilter
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        tempTipo={tempTipo}
        setTempTipo={setTempTipo}
        tempEstado={tempEstado}
        setTempEstado={setTempEstado}
        setFiltroTipo={setFiltroTipo}
        setFiltroEstado={setFiltroEstado}
        aplicarFiltros={aplicarFiltros}
        searchText={searchText}
      />

        <ModalPhoto           
          visible={photoModalVisible}
          setPhotoModalVisible={setPhotoModalVisible}></ModalPhoto>


    </View>
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
