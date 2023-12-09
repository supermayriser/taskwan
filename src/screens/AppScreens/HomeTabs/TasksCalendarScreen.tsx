import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import dayjs from "dayjs";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import CalendarIcon from "../../../../assets/svg/TabBarIcons/calendarIcon.svg";
import SafeAreaWrapper from "../../../components/common/SafeAreaWrapper";
import FocusAwareStatusBar from "../../../components/common/FocusAwareStatusBar";
import { brandColors } from "../../../utils/colors";
import PlusIcon from "../../../../assets/svg/plusIcon.svg";
import { HomeStackScreens } from "../../../navigation/screens";

interface IProps {
  navigation: BottomTabNavigationProp<any>;
}

const TasksCalendarScreen: React.FC<IProps> = ({ navigation }) => {
  const onCreateTaskPress = (): void => navigation.navigate(HomeStackScreens.CreateTask);

  return <SafeAreaWrapper>
    <FocusAwareStatusBar barStyle="dark-content" />

    <View style={ styles.dateHeaderContainer }>
      <View style={ styles.leftTitleContainer }>
        <CalendarIcon width={ 25 } height={ 25 } fill={ brandColors.blue } />
        <Text style={ styles.currentDayText }>{ dayjs().format("MMM, YYYY") }</Text>
      </View>

      <TouchableOpacity
        style={ styles.createTaskButton }
        onPress={ onCreateTaskPress }
      >
        <PlusIcon fill="#FFF" />
        <Text style={ styles.createTaskButtonText }>Add Task</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaWrapper>;
};

const styles = StyleSheet.create({
  createTaskButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    marginLeft: 7.5
  },
  createTaskButton: {
    backgroundColor: brandColors.blue,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12.5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row"
  },
  leftTitleContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  dateHeaderContainer: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10
  },
  currentDayText: {
    fontSize: 24,
    fontWeight: "700",
    paddingLeft: 10
  }
});

export default TasksCalendarScreen;
