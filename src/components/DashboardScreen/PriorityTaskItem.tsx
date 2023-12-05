import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import SmallEllipse from "../../../assets/svg/SlideCardSvg/smallEliple.svg";
import EllipseRight from "../../../assets/svg/SlideCardSvg/ellipseRight.svg";
import { brandColors } from "../../utils/colors";
import EllipsePart from "../../../assets/svg/SlideCardSvg/ellipsePart.svg";

interface IProps {
  item: any
}

const PriorityTaskItem: React.FC<IProps> = ({ item }) => {
  return <TouchableOpacity>
    <View style={ styles.absolutePositionContainer }>
      <SmallEllipse style={ { top: 12, left: 12 } } />
      <SmallEllipse style={ { top: 50, left: 40 } } />
      <EllipseRight style={ { right: -85, bottom: 10 } } />
      <EllipsePart style={ { left: 0, bottom: 35 } } />
    </View>

    <View style={ [styles.container, { backgroundColor: item.color }] }>
      <View style={ styles.daysLeftContainer }>
        <Text style={ styles.daysLeftText }>{ item.daysLeft } days</Text>
      </View>

      <Text style={ styles.taskText }>{ item.task }</Text>

      <View style={ styles.progressContainer }>
        <Text style={ styles.progressText }>Progress</Text>

        <View style={ styles.progressBarContainer }>
          <View style={ styles.progressBackground } />
          <View style={ [styles.progressBar, { width: `${ item.progress }%` }] } />
        </View>

        <Text style={ [styles.progressText, { textAlign: "right" }] }>{ item.progress }%</Text>
      </View>
    </View>
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  progressBar: {
    height: 4,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    position: "absolute",
  },
  progressBarContainer: {
    marginVertical: 2,
  },
  progressBackground: {
    width: "100%",
    height: 4,
    borderRadius: 5,
    backgroundColor: "#000000",
    opacity: 0.25,
  },
  progressText: {
    color: "#FFFFFF",
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "500",
  },
  progressContainer: {},
  taskText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  daysLeftText: {
    lineHeight: 15,
    fontSize: 10,
    color: "#444444",
  },
  daysLeftContainer: {
    paddingVertical: 2.5,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-end",
    paddingHorizontal: 10,
  },
  absolutePositionContainer: {
    position: "absolute",
    zIndex: 1,
    width: 129,
    height: 188,
  },
  container: {
    width: 129,
    height: 188,
    backgroundColor: brandColors.blue,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 12,
  },
});

export default PriorityTaskItem;
