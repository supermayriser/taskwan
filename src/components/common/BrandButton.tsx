import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { brandColors } from "../../utils/colors";

interface IProps {
  onPress: () => void,
  color?: string,
  text: string,
  buttonStyle?: ViewStyle,
  loading?: boolean,
  labelStyle?: TextStyle
}

const BrandButton: React.FC<IProps> = ({ onPress, color, text, buttonStyle, loading, labelStyle }) => {
  return <Button
    mode="contained"
    onPress={ onPress }
    contentStyle={ [styles.buttonContentStyle, { backgroundColor: color ? color : brandColors.blue }] }
    style={ [{ ...buttonStyle }, styles.buttonContainerStyle] }
    uppercase={ false }
    loading={ loading }
    labelStyle={ [labelStyle] }
  >
    { text }
  </Button>;
};

const styles = StyleSheet.create({
  buttonContainerStyle: {
    borderRadius: 10
  },
  buttonContentStyle: {
    alignItems: "center",
    height: 50
  }
});

export default BrandButton;
