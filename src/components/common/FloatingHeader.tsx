import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import * as NavigationMethods from "../../navigation/NavigationMethods";
import ArrowLeftIcon from "../../../assets/svg/arrowLeft.svg";
import { brandColors } from "../../utils/colors";

const top = (Platform.OS === "ios") ? getStatusBarHeight(true) : 5;

const FloatingHeader: React.FC = () => {
  const onNavigateBack = (): void => NavigationMethods.goBack();

  return <View style={ [styles.container, { marginTop: top }] }>
    <TouchableOpacity style={ styles.buttonWrapper } onPress={ onNavigateBack }>
      <ArrowLeftIcon fill="yellow" />
    </TouchableOpacity>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingHorizontal: 16,
    zIndex: 5
  },
  buttonWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: brandColors.blue,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default FloatingHeader;
