import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { brandColors } from "../../utils/colors";

interface IProps {
  item: any
}

const DailyTaskItem: React.FC<IProps> = ({ item }) => {
  const { blue, darkGrey } = brandColors;

  return <TouchableOpacity style={ styles.container }>
    <Text style={ [styles.titleText, { color: item.completed ? blue : darkGrey }] }>{ item.title }</Text>

    <View style={ styles.outerCircleView }>
      { item.completed ? <View style={ styles.completedView } /> : null }
    </View>
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 14,
    fontWeight: "500",
  },
  completedView: {
    width: 16,
    height: 16,
    backgroundColor: brandColors.blue,
    borderRadius: 50,
  },
  outerCircleView: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: brandColors.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 46,
    marginHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 110, 233, 0.06)",
    marginBottom: 8,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default DailyTaskItem;
