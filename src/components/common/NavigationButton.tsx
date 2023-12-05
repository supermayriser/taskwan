import React, { ReactElement } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

interface IProps {
  onPress: () => void,
  label: string,
  icon: ReactElement
}

const NavigationButton: React.FC<IProps> = ({ onPress, label, icon }) => {
  return <TouchableOpacity
    style={ styles.actionContainer }
    onPress={ onPress }
  >
    <View style={ styles.iconWrapper }>{ icon }</View>
    <Text style={ styles.labelText }>{ label }</Text>
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  labelText: {
    marginLeft: 30,
    fontSize: 12,
    fontWeight: "400",
  },
  actionContainer: {
    flexDirection: "row",
    height: 44,
    paddingHorizontal: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  iconWrapper: {
    width: 20,
  },
});

export default NavigationButton;
