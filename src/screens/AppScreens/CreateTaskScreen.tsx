import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";
import FocusAwareStatusBar from "../../components/common/FocusAwareStatusBar";
import { brandColors } from "../../utils/colors";
import HeaderBackButton from "../../components/common/HeaderBackButton";

const CreateTaskScreen: React.FC = () => {
  return <SafeAreaWrapper forcedColor={ brandColors.blue }>
    <FocusAwareStatusBar barStyle="dark-content" />

    <ScrollView
      showsVerticalScrollIndicator={ false }
      style={ styles.scrollViewContainer }
    >
      <HeaderBackButton titleText="Add Task" />

    </ScrollView>
  </SafeAreaWrapper>;
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 50
  }
});

export default CreateTaskScreen;
