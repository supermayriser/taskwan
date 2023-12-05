import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { welcomeScreenSlides } from "../../utils/mock";
import { brandColors } from "../../utils/colors";

interface IProps {
  currentIndex: number,
  onSkipButtonPress: () => void
}

const SliderHeader: React.FC<IProps> = ({ currentIndex, onSkipButtonPress }) => {
  return <View style={ styles.scrollIndicatorContainer }>
    <View style={ styles.scrollIndicatorsContainer }>
      { welcomeScreenSlides.map((item, index) => {
        return <View
          key={ String(index) }
          style={ [
            styles.scrollIndicatorShape,
            { backgroundColor: (currentIndex === index) ? brandColors.blue : brandColors.lightBlue },
          ] }
        />;
      }) }
    </View>

    <TouchableOpacity onPress={ onSkipButtonPress }>
      <Text style={ styles.skipButton }>skip</Text>
    </TouchableOpacity>
  </View>;
};

const styles = StyleSheet.create({
  skipButton: {
    color: brandColors.blue,
    fontWeight: "500",
    fontSize: 12,
    paddingVertical: 5,
    paddingLeft: 12,
    paddingRight: 6,
  },
  scrollIndicatorContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingTop: 10,
  },
  scrollIndicatorsContainer: {
    flexDirection: "row",
  },
  scrollIndicatorShape: {
    width: 10,
    height: 10,
    borderRadius: 25,
    marginRight: 6,
  },
});

export default SliderHeader;
