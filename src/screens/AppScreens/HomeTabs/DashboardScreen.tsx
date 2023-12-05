import React, { useContext } from "react";
import { Text } from "react-native-paper";
import { FlatList, ListRenderItem, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { currentDayName } from "../../../utils/functions";
import NotificationBellIcon from "../../../../assets/svg/notificationBellIcon.svg";
import SafeAreaWrapper from "../../../components/common/SafeAreaWrapper";
import { StoreContext } from "../../../store/store";
import { brandColors } from "../../../utils/colors";
import PriorityTaskItem from "../../../components/DashboardScreen/PriorityTaskItem";
import { HomeStackScreens } from "../../../navigation/screens";
import DailyTaskItem from "../../../components/DashboardScreen/DailyTaskItem";
import FocusAwareStatusBar from "../../../components/common/FocusAwareStatusBar";

const mockData = [
  {
    daysLeft: 5,
    task: "UI Design",
    progress: 5,
    color: brandColors.blue
  },
  {
    daysLeft: 15,
    task: "Laravel Task",
    progress: 99,
    color: "#311F65"
  },
  {
    daysLeft: 5,
    task: "UI Design",
    progress: 80,
    color: "#D92C2C"
  },
  {
    daysLeft: 20,
    task: "UI Design",
    progress: 80,
    color: brandColors.blue
  },
  {
    daysLeft: 25,
    task: "Laravel Task",
    progress: 30,
    color: "#311F65"
  },
  {
    daysLeft: 50,
    task: "UI Design",
    progress: 80,
    color: "#D92C2C"
  }
];

const mockData2 = [
  {
    title: "Work Out",
    completed: true
  },
  {
    title: "Reading a Book",
    completed: false
  },
  {
    title: "Take a Walk",
    completed: true
  },
  {
    title: "Daily Meeting",
    completed: true
  },
  {
    title: "Watch Video",
    completed: false
  },
  {
    title: "Check Twitter feed",
    completed: false
  },
  {
    title: "Call the Manager",
    completed: true
  }
];

interface IProps {
  navigation: BottomTabNavigationProp<any>;
}

const DashboardScreen: React.FC<IProps> = ({ navigation }) => {
  const {
    fsUser: [firestoreUser]
  } = useContext(StoreContext);

  const notificationsNavigate = (): void => navigation.navigate(HomeStackScreens.Notifications);

  const renderItem: ListRenderItem<any> = ({ item }) => {
    return <PriorityTaskItem item={ item } />;
  };

  return <SafeAreaWrapper>
    <FocusAwareStatusBar barStyle="light-content" />

    <ScrollView
      showsVerticalScrollIndicator={ false }
      contentContainerStyle={ styles.contentContainer }
    >
      <View style={ styles.headerContainer }>
        <Text style={ styles.dateText }>{ currentDayName() }, { dayjs().format("MMM D YYYY") }</Text>

        <TouchableOpacity onPress={ notificationsNavigate } style={ styles.notificationIconWrapper }>
          <NotificationBellIcon />
        </TouchableOpacity>
      </View>

      <View style={ styles.welcomeTextContainer }>
        <Text style={ styles.currentUserText }>{ firestoreUser?.displayName }</Text>
        <Text style={ styles.greetingsText }>Have a nice day !</Text>
      </View>

      <View style={ styles.tasksContainer }>
        <Text style={ styles.tasksListHeader }>My Priority Task</Text>

        <FlatList
          data={ mockData }
          renderItem={ renderItem }
          keyExtractor={ (item, index) => String(index) }
          horizontal
          showsHorizontalScrollIndicator={ false }
          contentContainerStyle={ { paddingLeft: 15 } }
        />
      </View>

      <View style={ styles.tasksContainer }>
        <Text style={ styles.tasksListHeader }>Daily Task</Text>

        { mockData2.map((item, index) => {
          return <DailyTaskItem key={ String(index) } item={ item } />;
        }) }
      </View>
    </ScrollView>
  </SafeAreaWrapper>;
};

const styles = StyleSheet.create({
  tasksContainer: {
    marginBottom: 32
  },
  welcomeTextContainer: {
    marginBottom: 35,
    paddingHorizontal: 15
  },
  tasksListHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    paddingHorizontal: 15
  },
  currentUserText: {
    fontSize: 24,
    fontWeight: "700"
  },
  greetingsText: {
    fontSize: 16,
    fontWeight: "400",
    color: brandColors.lightGrey
  },
  notificationIconWrapper: {
    paddingLeft: 15,
    paddingVertical: 5
  },
  dateText: {
    lineHeight: 18,
    fontSize: 12,
    fontWeight: "400"
  },
  contentContainer: {
    paddingVertical: 20
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 15
  }
});

export default DashboardScreen;
