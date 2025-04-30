import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import FloattingButton from "../Components/FloattingButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default function home () {
    const [facing, setFacing] = useState();
    const [permission, requestPermission] = useCameraPermissions();
  
    if (!permission) {
      // Camera permissions are still loading.
      return <View />;
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <View style={styles.container}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
  
    function toggleCameraFacing() {
      setFacing(current => (current === 'back' ? 'front' : 'back'));
    }
    return(
        <View style ={styles.container}>
            <CameraView style={styles.camera} facing={facing}>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                    <Icon name='camera-flip-outline' size={30} color={"#fff"}/>
                </TouchableOpacity>
                </View>
            </CameraView>
            <FloattingButton/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0C0A09',
    },
    camera: {
        height: "50%",
        width: "80%",
        alignSelf: "center",
        marginTop: "20%",
        borderRadius: 10
    },
    buttonContainer: {
        margin: 10,
        flex: 1, 
        justifyContent: "flex-end",
        alignSelf: "flex-end"
    }
})