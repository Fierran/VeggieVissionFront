import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ErrorModal = ({ visible, onClose, title = "Ocurrió un error", message = "Algo salió mal" }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Ionicons name="alert-circle-outline" size={50} color="red" />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={{ color: 'white' }}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
    elevation: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  message: {
    textAlign: 'center',
    marginTop: 5,
  },
  modalButton: {
    marginTop: 15,
    backgroundColor: '#16A34A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
