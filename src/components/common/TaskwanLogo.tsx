import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import TaskwanLogoSVG from "../../../assets/svg/logoText.svg";
import { brandColors } from "../../utils/colors";

const TaskwanLogo: React.FC = () => {
  return <View style={ styles.container }>
    <TaskwanLogoSVG />
    <Text style={ styles.subtitleText }>Management App</Text>
  </View>;
};

const styles = StyleSheet.create({
  subtitleText: {
    marginTop: 15,
    color: brandColors.grey,
    fontSize: 16,
    fontWeight: "500",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TaskwanLogo;
