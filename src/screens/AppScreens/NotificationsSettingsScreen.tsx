import React, { useState } from "react";
import { Switch, Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";
import { brandColors } from "../../utils/colors";
import BackIcon from "../../../assets/svg/arrowLeft.svg";
import { AppStackParamList } from "../../navigation/AppStack";
import { HomeStackScreens } from "../../navigation/screens";

interface IProps {
  navigation: NativeStackNavigationProp<AppStackParamList, HomeStackScreens.NotificationsSettings>
}

const NotificationsSettingsScreen: React.FC<IProps> = ({ navigation }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const goBack = (): void => navigation.goBack();

  return <SafeAreaWrapper forcedColor={ brandColors.blue }>
    <View style={ styles.headerContainer }>
      <TouchableOpacity style={ styles.backButtonContainer } onPress={ goBack }>
        <BackIcon fill={ brandColors.blue } />
      </TouchableOpacity>

      <Text style={ styles.headerText }>Notification</Text>

      {/* Transparent filler View */ }
      <View style={ { width: 36, height: 36 } } />
    </View>

    <View style={ styles.container }>
      <TouchableOpacity style={ styles.settingButtonContainer }>
        <Text style={ styles.settingTitleText }>Notification Tone</Text>
        <Text style={ styles.settingValueText }>Silent</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ styles.settingButtonContainer }>
        <Text style={ styles.settingTitleText }>Vibrate</Text>
        <Text style={ styles.settingValueText }>Off</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ styles.settingButtonContainer }>
        <Text style={ styles.settingTitleText }>Pop up Notification</Text>
        <Text style={ styles.settingValueText }>On</Text>
      </TouchableOpacity>
      <View style={ styles.settingSwitcherContainer }>
        <View style={ styles.switcherValueContainer }>
          <Text style={ styles.settingTitleText }>Use High Priority Notification</Text>
          <Text style={ styles.settingValueText }>
            Show previews of notification at the top of the screen
          </Text>
        </View>

        <Switch
          value={ isSwitchOn }
          onValueChange={ onToggleSwitch }
          color={ brandColors.blue }
        />
      </View>
    </View>
  </SafeAreaWrapper>;
};

const styles = StyleSheet.create({
  settingSwitcherContainer: {
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switcherValueContainer: {
    width: "80%",
  },
  settingValueText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000000",
  },
  settingTitleText: {
    lineHeight: 20,
    fontSize: 14,
    fontWeight: "500",
    color: brandColors.blue,
  },
  settingButtonContainer: {
    marginBottom: 25,
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: 600,
    paddingVertical: 50,
    flex: 1,
    minHeight: "90%",
    paddingHorizontal: 15,
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
  headerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default NotificationsSettingsScreen;
