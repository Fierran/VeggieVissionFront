import React, {useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Modal, View, Image, Alert, Animated, Easing } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import data from '../../../assets/data/ejemplos.json';
import { auth,db,storage } from '../../../firebase-config';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImageManipulator from 'expo-image-manipulator';



export default function ModalPhoto({ visible, setPhotoModalVisible }) {
  const [facing, setFacing] = useState("back");
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const rotateValue = useRef(new Animated.Value(0)).current;
  const [resultado, setResultado] = useState(null);



    //Funcion para enviar la imagen al back
    const sendImageToBackend = async () => {
    if (!image || !image.base64) return;

    setIsUploading(true);
    setResultado(null);

    try {
      const user = auth.currentUser;

      if (!user) throw new Error("Usuario no autenticado");

      const formData = new FormData();
      formData.append('file', {
        uri: image.uri,
        name: 'photo.jpg',
        type: 'image/jpeg'
      });
      formData.append('user_id', user.uid); // puedes usar user.uid si prefieres

      const response = await fetch('https://veggie-vision-backend.up.railway.app/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Error al subir imagen");

      const data = await response.json();
      setResultado(data); // Actualiza el estado con los datos recibidos
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo procesar la imagen.");
    } finally {
      setIsUploading(false);
    }
  };

  //Funcion para guardar analisis
const guardarAnalisis = async () => {
  if (!resultado || !image) return;

  try {
    const user = auth.currentUser;
    if (!user) {
      console.log("No hay usuario autenticado");
      return;
    }

    // 🧩 1. Reducir resolución de la imagen
    const manipResult = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize: { width: 300 } }], // Puedes ajustar la resolución
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Comprimir también ayuda
    );

    // 🧩 2. Convertir a base64 (de la imagen ya comprimida)
    const response = await fetch(manipResult.uri);
    const blob = await response.blob();

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64data = reader.result;

      const nuevoAnalisis = {
        uid: user.uid,
        fruta: resultado.prediction,
        confianza: resultado.confidence,
        temperatura: resultado.temperature,
        humedad: resultado.humidity,
        categoria: resultado.category,
        dias_para_madurar: resultado.ripes_in_days,
        dias_para_descomponerse: resultado.spoils_in_days,
        imagen: base64data,
        fecha: new Date().toISOString()
      };

      await addDoc(collection(db, "analisis"), nuevoAnalisis);
      alert("¡Análisis guardado exitosamente!");
    };

  } catch (error) {
    console.error("Error al guardar el análisis:", error);
    alert("Error al guardar el análisis.");
  }
};







  useEffect(() => {
    if (isUploading) {
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateValue.stopAnimation();
      rotateValue.setValue(0);
    }
  }, [isUploading]);
  



  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Se requieren permisos para usar la cámara</Text>
        <Button onPress={requestPermission} title="Dar permisos" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setImage({
        uri: photo.uri,
        base64: photo.base64
      });
      setShowCamera(false);
    }
  };

  const selectImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      base64: true,
      allowsMultipleSelection: false,
      quality: 0.5,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImage({
        uri: asset.uri,
        base64: asset.base64
      });
    }
  };

  const resetImage = () => {
    setImage(null);
    setResultado(null);
  };

  return (
    <Modal 
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setPhotoModalVisible(false)}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          {resultado ? (
            <View style={{ alignItems: 'center' }}>
              <Image source={{ uri: image.uri }} style={{ width: '100%', height: 300, borderRadius: 10 }} resizeMode="contain" />
              <Text style={styles.title}>Resultado</Text>
              <Text>Predicción: {resultado.prediction}</Text>
              <Text>Confianza: {resultado.confidence}%</Text>
              <Text>Temperatura: {resultado.temperature}°C</Text>
              <Text>Humedad: {resultado.humidity}%</Text>
              <Text>Categoría: {resultado.category}</Text>
              <Text>Días para madurar: {resultado.ripes_in_days}</Text>
              <Text>Días para descomponerse: {resultado.spoils_in_days}</Text>

              <TouchableOpacity style={[styles.button, { alignSelf: 'center', backgroundColor: '#16A34A' }]} onPress={resetImage}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Nuevo Análisis</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={guardarAnalisis} style={{ backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, marginTop: 10 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Guardar análisis</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, { alignSelf: 'center' }]} onPress={() => setPhotoModalVisible(false)}>
                <Text>Cerrar</Text>
              </TouchableOpacity>
            </View>
          ) : image ? (
            <>
              <Image source={{ uri: image.uri }} style={{ width: '100%', height: 300, borderRadius: 10 }} resizeMode="contain" />
              <TouchableOpacity style={[styles.button, { alignSelf: 'center', backgroundColor: '#16A34A' }]} onPress={resetImage}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Reintentar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { alignSelf: 'center', backgroundColor: '#16A34A' }]}
                onPress={sendImageToBackend}
              >
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Confirmar</Text>
              </TouchableOpacity>


            </>
          ) : isUploading ? (
            <View style={[styles.uploadingContainer]}>
            <Animated.View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 5,
                borderColor: '#16A34A',
                borderTopColor: 'transparent',
                transform: [{
                  rotate: rotateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg']
                  })
                }]
              }}
            />

            <Text style={{ marginTop: 10 }}>Analizando imagen</Text>
            </View>
          ) : showCamera ? (
            <>
              <View style={{ width: '100%', aspectRatio: 3 / 4, borderRadius: 10, overflow: 'hidden' }}>
                <CameraView style={{ width: '100%', height: '100%' }} facing={facing} ref={cameraRef} />
              </View>
              <TouchableOpacity style={[styles.button, { alignSelf: 'center', backgroundColor: '#16A34A' }]} onPress={takePicture}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Tomar Foto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { alignSelf: 'center' }]} onPress={() => setShowCamera(false)}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>Nuevo Análisis</Text>
              <View style={styles.uploadContainer}>
                <View style={styles.photoIcon}>
                  <Icon name='camera' size={25} color={'gray'} />
                </View>
                <Text style={styles.text}>Toma una foto o sube una imagen</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={styles.button} onPress={() => setShowCamera(true)}>
                    <Icon name='camera' size={15} color={'#000'} />
                    <Text>  Cámara</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={selectImages}>
                    <Icon name='upload' size={15} color={'#000'} />
                    <Text>  Upload</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.button, { alignSelf: 'flex-end', width: 80 }]}
                onPress={() => setPhotoModalVisible(false)}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10
  },
  text: {
    color: '#a6a6a6',
    marginBottom: 10
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  uploadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    borderStyle: 'dashed',
    padding: 30,
    overflow: 'hidden'
  },
  photoIcon: {
    backgroundColor: "#eaeaea",
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 7,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: '#fff',
    height: 40,
    width: "40%",
    margin: 10
  },
  uploadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#16A34A',
    borderTopColor: 'transparent',
    animation: 'spin 1s linear infinite',
  },
});
