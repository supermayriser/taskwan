import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeStackScreens, HomeTabsScreens } from "./screens";
import DashboardScreen from "../screens/AppScreens/HomeTabs/DashboardScreen";
import ProfileScreen from "../screens/AppScreens/HomeTabs/ProfileScreen";
import TasksCalendarScreen from "../screens/AppScreens/HomeTabs/TasksCalendarScreen";
import HomeTabBar from "./HomeTabBar";
import NotificationsScreen from "../screens/AppScreens/NotificationsScreen";
import ProfileEditScreen from "../screens/AppScreens/ProfileEditScreen";
import StatisticsScreen from "../screens/AppScreens/StatisticsScreen";
import LocationScreen from "../screens/AppScreens/LocationScreen";
import SettingsScreen from "../screens/AppScreens/SettingsScreen";
import NotificationsSettingsScreen from "../screens/AppScreens/NotificationsSettingsScreen";
import SecurityScreen from "../screens/AppScreens/SecurityScreen";
import CreateTaskScreen from "../screens/AppScreens/CreateTaskScreen";

// General purpose screens
export type AppStackParamList = {
  Notifications: undefined,
  HomeTabs: undefined,
  ProfileEdit: undefined,
  Statistics: undefined,
  Location: undefined,
  Settings: undefined,
  NotificationsSettings: undefined,
  Security: undefined,
  CreateTask: undefined
}

export type HomeTabsParamList = {
  Dashboard: undefined,
  Profile: undefined,
  TasksCalendar: undefined,
}

const Stack = createNativeStackNavigator<AppStackParamList>();
const Home = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabs: React.FC = () => {
  return <>
    <Home.Navigator
      initialRouteName={ HomeTabsScreens.Dashboard }
      screenOptions={ { header: () => null } }
      tabBar={ (props: any) => <HomeTabBar { ...props } /> }
    >
      <Home.Screen name={ HomeTabsScreens.Dashboard } component={ DashboardScreen } />
      <Home.Screen name={ HomeTabsScreens.TasksCalendar } component={ TasksCalendarScreen } />
      <Home.Screen name={ HomeTabsScreens.Profile } component={ ProfileScreen } />
    </Home.Navigator>
  </>;
};

const AppStack: React.FC = () => {
  return <>
    <Stack.Navigator
      initialRouteName={ HomeStackScreens.HomeTabs }
      screenOptions={ { header: () => null, fullScreenGestureEnabled: true } }
    >
      <Stack.Screen name={ HomeStackScreens.HomeTabs } component={ HomeTabs } />

      <Stack.Screen name={ HomeStackScreens.Security } component={ SecurityScreen } />
      <Stack.Screen name={ HomeStackScreens.NotificationsSettings } component={ NotificationsSettingsScreen } />
      <Stack.Screen name={ HomeStackScreens.Settings } component={ SettingsScreen } />
      <Stack.Screen name={ HomeStackScreens.Location } component={ LocationScreen } />
      <Stack.Screen name={ HomeStackScreens.Statistics } component={ StatisticsScreen } />
      <Stack.Screen name={ HomeStackScreens.Notifications } component={ NotificationsScreen } />
      <Stack.Screen name={ HomeStackScreens.ProfileEdit } component={ ProfileEditScreen } />
      <Stack.Screen name={ HomeStackScreens.CreateTask } component={ CreateTaskScreen } />
    </Stack.Navigator>
  </>;
};

export default AppStack;
