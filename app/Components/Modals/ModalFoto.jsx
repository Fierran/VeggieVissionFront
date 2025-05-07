import React, {useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Modal, View, Image, Alert, Animated, Easing } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import data from '../../../assets/data/ejemplos.json';

export default function ModalPhoto({ visible, setPhotoModalVisible }) {
  const [facing, setFacing] = useState("back");
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const rotateValue = useRef(new Animated.Value(0)).current;
  const [resultado, setResultado] = useState(null);



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
          {image ? (
            <>
              <Image source={{ uri: image.uri }} style={{ width: '100%', height: 300, borderRadius: 10 }} resizeMode="contain" />
              <TouchableOpacity style={[styles.button, { alignSelf: 'center', backgroundColor: '#16A34A' }]} onPress={resetImage}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Reintentar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { alignSelf: 'center' }]} onPress={() => setPhotoModalVisible(false)}>
                <Text>Confirmar</Text>
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
