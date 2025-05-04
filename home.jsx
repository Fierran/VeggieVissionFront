// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Button } from "react-native";
// import { CameraView, useCameraPermissions } from 'expo-camera';
// import FloattingButton from "../Components/FloattingButton";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { useRouter } from 'expo-router';
// import { useIsFocused } from "@react-navigation/native";



// export default function Home() {
//   const [facing, setFacing] = useState("back");
//   const [permission, requestPermission] = useCameraPermissions();
//   const cameraRef = useRef(null);
//   const router = useRouter();
//   const isFocused = useIsFocused();

//   if (!permission) return <View />;
//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>we need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="Grant permission" />
//       </View>
//     );
//   }

//   function toggleCameraFacing() {
//     setFacing(current => (current === 'back' ? 'front' : 'back'));
//   }

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const photo = await cameraRef.current.takePictureAsync();
//       let finalUri = encodeURIComponent(photo.uri);
//       router.replace({
//         pathname: "PhotoImage",
//         params: { photoUri: finalUri },
//       });
//     }
//   };
  

//   return (
//     <View style={styles.container}>
//       {isFocused && (
//         <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.button} onPress={() => setFacing(f => (f === "back" ? "front" : "back"))}>
//               <Icon name='camera-flip-outline' size={30} color={"#fff"} />
//             </TouchableOpacity>
//           </View>
//         </CameraView>
//       )}
//     <FloattingButton
//       onPress={takePicture}
//       icon="camera"
//       backgroundColor="#09E85E"
//       position={{bottom: 30, right: 30}}
//     />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   camera: {
//     height: "50%",
//     width: "80%",
//     alignSelf: "center",
//     marginTop: "20%",
//     borderRadius: 10
//   },
//   buttonContainer: {
//     margin: 10,
//     flex: 1,
//     justifyContent: "flex-end",
//     alignSelf: "flex-end"
//   }
// });
