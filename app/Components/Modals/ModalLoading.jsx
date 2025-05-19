import React from 'react';
import { Modal, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingModal = ({ visible, message = "Cargando..." }) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color="#16A34A" />
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;

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
  text: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});
