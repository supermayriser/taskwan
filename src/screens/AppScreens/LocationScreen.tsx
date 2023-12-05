import React from "react";
import { Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";
import FocusAwareStatusBar from "../../components/common/FocusAwareStatusBar";
import BackIcon from "../../../assets/svg/arrowLeft.svg";
import { brandColors } from "../../utils/colors";
import { AppStackParamList } from "../../navigation/AppStack";
import { HomeStackScreens } from "../../navigation/screens";

interface IProps {
  navigation: NativeStackNavigationProp<AppStackParamList, HomeStackScreens.Location>
}

const LocationScreen: React.FC<IProps> = ({ navigation }) => {
  const goBack = (): void => navigation.goBack();

  return <SafeAreaWrapper forcedColor={ brandColors.blue }>
    <FocusAwareStatusBar barStyle="light-content" />
    <View style={ styles.headerContainer }>
      <TouchableOpacity style={ styles.backButtonContainer } onPress={ goBack }>
        <BackIcon fill={ brandColors.blue } />
      </TouchableOpacity>

      <Text style={ styles.headerText }>Location</Text>

      {/* Transparent filler View */ }
      <View style={ { width: 36, height: 36 } } />
    </View>

    <View style={ styles.container }>

    </View>
  </SafeAreaWrapper>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    minHeight: "90%",
    paddingBottom: 50,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  scrollViewContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 50,
  },
  backButtonContainer: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
  },
});

export default LocationScreen;
