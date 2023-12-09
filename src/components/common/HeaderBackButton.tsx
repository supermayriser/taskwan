import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import BackIcon from "../../../assets/svg/arrowLeft.svg";
import { brandColors } from "../../utils/colors";
import { goBack } from "../../navigation/NavigationMethods";

interface IProps {
  titleText?: string;
}

const HeaderBackButton: React.FC<IProps> = ({ titleText }) => {
  const onGoBack = (): void => goBack();

  return <View style={ styles.headerContainer }>
    <TouchableOpacity style={ styles.backButtonContainer } onPress={ onGoBack }>
      <BackIcon fill={ brandColors.blue } />
    </TouchableOpacity>

    <Text style={ styles.headerText }>{ titleText ? titleText : "" }</Text>

    {/* Transparent filler View */ }
    <View style={ { width: 36, height: 36 } } />
  </View>;
};

const styles = StyleSheet.create({
  headerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold"
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 50
  },
  backButtonContainer: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36
  }
});

export default HeaderBackButton;
