import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";
import BackIcon from "../../../assets/svg/arrowLeft.svg";
import { brandColors } from "../../utils/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../navigation/AppStack";
import { HomeStackScreens } from "../../navigation/screens";
import { settingsActionButtons } from "../../utils/mock";
import NavigationButton from "../../components/common/NavigationButton";
import * as NavigationMethods from "../../navigation/NavigationMethods";

interface IProps {
  navigation: NativeStackNavigationProp<AppStackParamList, HomeStackScreens.Settings>
}

const SettingsScreen: React.FC<IProps> = ({ navigation }) => {
  const onPress = async (path: HomeStackScreens | null): Promise<void> => {
    if (path) {
      return NavigationMethods.navigate(path);
    }
  };

  const goBack = (): void => navigation.goBack();

  return <SafeAreaWrapper forcedColor={ brandColors.blue }>
    <ScrollView
      showsVerticalScrollIndicator={ false }
      style={ styles.scrollViewContainer }
    >
      <View style={ styles.headerContainer }>
        <TouchableOpacity style={ styles.backButtonContainer } onPress={ goBack }>
          <BackIcon fill={ brandColors.blue } />
        </TouchableOpacity>

        <Text style={ styles.headerText }>Settings</Text>

        {/* Transparent filler View */ }
        <View style={ { width: 36, height: 36 } } />
      </View>

      <View style={ styles.container }>
        { settingsActionButtons.map((item, index) => {
          return <NavigationButton
            onPress={ () => onPress(item.path) }
            label={ item.label }
            icon={ <item.icon /> }
            key={ index }
          />;
        }) }
      </View>
    </ScrollView>
  </SafeAreaWrapper>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: 600,
    paddingVertical: 50,
    flex: 1,
    minHeight: "90%",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  backButtonContainer: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
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
});

export default SettingsScreen;
