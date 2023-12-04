import React, { ReactElement } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { brandColors } from "../../utils/colors";

interface IProps {
  icon?: ReactElement,
  value: string,
  onPress: () => void,
  label: string
}

const ActionInput: React.FC<IProps> = ({ icon, value, onPress, label }) => {
  return <View style={ { marginBottom: 20 } }>
    <Text style={ styles.labelText }>{ label }</Text>

    <TouchableOpacity style={ styles.container } onPress={ onPress }>
      { icon ? <View style={ styles.iconWrapper }>{ icon }</View> : null }
      <Text style={ styles.valueText }>{ value }</Text>
    </TouchableOpacity>
  </View>;
};

const styles = StyleSheet.create({
  iconWrapper: {
    marginLeft: 10,
  },
  labelText: {
    color: brandColors.blue,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
  },
  valueText: {
    color: brandColors.darkGrey,
    lineHeight: 18,
    fontSize: 12,
    fontWeight: "400",
    marginLeft: 10,
  },
  container: {
    height: 48,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0, 110, 233, 0.1)",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ActionInput;
