import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome6'; // o el ícono que uses

const ResumenAnalisisModal = ({ visible, onClose, analisis }) => {
  if (!analisis) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: 'center' }}>
        <View style={{ margin: 20, padding: 20, backgroundColor: '#fff', borderRadius: 10 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ alignSelf: 'flex-start', fontSize: 17,fontWeight: 'bold', marginBottom: 10 }}>Resultados de Análisis</Text>

            <Image
              source={{ uri: analisis.imagen }}
              style={{ width: "90%", height: 200, borderRadius: 10 }}
              resizeMode= "stretch"
            />

            <View style={{ backgroundColor: '#F0FDF4', width: '90%', padding: 10, borderRadius: 10, marginTop: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ color: '#16A34A' }}>Type</Text>
                  <Text style={{ fontWeight: 'bold' }}>{analisis.fruta}</Text>
                </View>
                <View>
                  <Text style={{ color: '#16A34A' }}>Confidence</Text>
                  <Text style={{ fontWeight: 'bold' }}>{analisis.confianza}%</Text>
                </View>
                <View>
                  <Text style={{ color: '#16A34A' }}>Categoría</Text>
                  <Text style={{ fontWeight: 'bold' }}>{analisis.categoria}</Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row', alignContent: "space-between" }}>
              <View style={{ backgroundColor: '#EFF6FF', width: '44%', padding: 10, borderRadius: 10, marginRight: '2%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon2 name="temperature-half" color={"#3B82F6"} size={10} />
                  <Text style={{ color: '#3B82F6' }}> Temperatura</Text>
                </View>
                <Text style={{ fontWeight: 'bold' }}>{analisis.temperatura}°C</Text>
              </View>
              <View style={{ backgroundColor: '#EFF6FF', width: '44%', padding: 10, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon2 name="droplet" color={"#3B82F6"} size={10} />
                  <Text style={{ color: '#3B82F6' }}> Humedad</Text>
                </View>
                <Text style={{ fontWeight: 'bold' }}>{analisis.humedad}%</Text>
              </View>
            </View>

            <View style={{ marginBottom: 5, flexDirection: 'row', alignContent: 'space-around' }}>
              <View style={{ backgroundColor: '#EFF6FF', width: '44%', padding: 10, borderRadius: 10, marginRight: "2%" }}>
                <Text style={{ color: "#3B82F6" }}>Madura en</Text>
                <Text style={{ fontWeight: 'bold' }}>{analisis.dias_para_madurar} días</Text>
              </View>
              <View style={{ backgroundColor: '#FFFBEB', width: '44%', padding: 10, borderRadius: 10 }}>
                <Text style={{ color: "#F59E08" }}>Se pudre en</Text>
                <Text style={{ fontWeight: 'bold' }}>{analisis.dias_para_descomponerse} días</Text>
              </View>
            </View>

            <Text style={{ alignSelf: 'flex-start', marginLeft: '5%' }}>Notas</Text>
            <View style={{ width: '90%', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
              <Text>{analisis.nota || 'Sin notas'}</Text>
            </View>

            <TouchableOpacity onPress={onClose} style={[styles.button, { marginTop: 15 }]}>
              <Text style={{ color: '#000', fontWeight: 'bold' }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
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
    elevation: 2,
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
  textInput: {
    width: '90%',
    backgroundColor: '#fff',
    elevation: 0.5
  }
});
export default ResumenAnalisisModal;
