import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function FloattingButton({
  onPress,
  icon = "camera",
  iconColor = "#000",
  backgroundColor = "#09E85E",
  size = 60,
  position = { bottom: 30, right: 30 },
  style = {}
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.floatingButton,
          {
            backgroundColor,
            width: size,
            height: size,
            borderRadius: size / 2,
            ...position, 
          },
        ]}
        onPress={onPress}
      >
        <Icon name={icon} size={30} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    pointerEvents: 'box-none',
  },
  floatingButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999
  },
});
