import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ModalFilter({
  modalVisible,
  setModalVisible,
  tempTipo,
  setTempTipo,
  tempEstado,
  setTempEstado,
  setFiltroTipo,
  setFiltroEstado,
  aplicarFiltros,
  searchText
}) {
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Filtros</Text>

          <Text>Tipo:</Text>
          <Picker
            selectedValue={tempTipo}
            onValueChange={(itemValue) => setTempTipo(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Todos" value="" />
            <Picker.Item label="Fruta" value="fruit" />
            <Picker.Item label="Verdura" value="vegetable" />
          </Picker>

          <Text>Estado:</Text>
          <Picker
            selectedValue={tempEstado}
            onValueChange={(itemValue) => setTempEstado(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Todos" value="" />
            <Picker.Item label="Maduro" value="Maduro" />
            <Picker.Item label="Verde" value="Verde" />
            <Picker.Item label="Podrido" value="Pasada" />
          </Picker>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setFiltroTipo(tempTipo);
              setFiltroEstado(tempEstado);
              aplicarFiltros(searchText, tempTipo, tempEstado);
              setModalVisible(false);
            }}
          >
            <Text style={styles.buttonText}>Aplicar Filtro</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#16A34A",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
