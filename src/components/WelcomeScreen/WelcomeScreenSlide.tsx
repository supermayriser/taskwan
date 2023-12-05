import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { WelcomeSlideType } from "../../utils/types";
import { brandColors } from "../../utils/colors";

const { width, height } = Dimensions.get("window");

interface IProps {
  item: WelcomeSlideType
}

const WelcomeScreenSlide: React.FC<IProps> = ({ item }) => {
  return <View style={ styles.slideContainer }>
    <item.image />

    <Text style={ styles.titleText }>{ item.title }</Text>
    <Text style={ styles.descriptionText }>{ item.text }</Text>
  </View>;
};

const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: width * .08,
    color: brandColors.darkGrey,
    fontWeight: "400",
  },
  titleText: {
    paddingVertical: 24,
    fontSize: 16,
    lineHeight: 19.6,
    fontWeight: "500",
  },
  slideContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.75,
  },
});

export default WelcomeScreenSlide;


