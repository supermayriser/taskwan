import React from "react";
import { Text } from "react-native-paper";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import Triangle from "react-native-triangle";

import SafeAreaWrapper from "../../../components/common/SafeAreaWrapper";
import { brandColors } from "../../../utils/colors";
import FocusAwareStatusBar from "../../../components/common/FocusAwareStatusBar";
import UserInfo from "../../../components/ProfileScreen/UserInfo";
import ProfileActions from "../../../components/ProfileScreen/ProfileActions";

const { width } = Dimensions.get("window");

const ProfileScreen: React.FC = () => {
  return <SafeAreaWrapper forcedColor={ brandColors.blue }>
    <FocusAwareStatusBar barStyle="light-content" />

    <View style={ styles.container }>
      <ScrollView
        style={ styles.scrollViewContainer }
        showsVerticalScrollIndicator={ false }
      >
        <View style={ styles.headerContainer }>
          <Text style={ styles.titleText }>Profile</Text>
        </View>

        <View style={ { position: "absolute", top: 95 } }>
          <Triangle
            width={ width }
            height={ 160 }
            color={ brandColors.blue }
            direction={ "down" }
          />
        </View>

        <UserInfo />

        <ProfileActions />
      </ScrollView>
    </View>
  </SafeAreaWrapper>;
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 95,
    backgroundColor: brandColors.blue,
    zIndex: 1
  },
  titleText: {
    color: "#FFFFFF",
    paddingHorizontal: 15,
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600"
  },
  scrollViewContainer: {
    flex: 1,
    zIndex: 5,
    backgroundColor: "#FFFFFF"
  },
  container: {
    flex: 1,
    justifyContent: "space-between"
  }
});

export default ProfileScreen;
