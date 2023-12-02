import React from "react";
import { Dimensions, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { TabNavigationState } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { tabBars } from "../utils/mock";
import { HomeTabsParamList } from "./AppStack";
import { brandColors } from "../utils/colors";
import { HomeTabsScreens } from "./screens";

const { width } = Dimensions.get("window");

interface IProps {
  state: TabNavigationState<HomeTabsParamList>,
  navigation: BottomTabNavigationProp<HomeTabsParamList>
}

const HomeTabBar: React.FC<IProps> = ({ state, navigation }) => {
  const onTabPress = (route: HomeTabsScreens): void => navigation.navigate(route);

  return <View style={ styles.container }>
    { tabBars.map((item, index) => {
      const active = index === state.index;
      const color = active ? brandColors.blue : brandColors.snowBlue;

      return <TouchableOpacity
        onPress={ () => onTabPress(item.path) }
        key={ String(index) }
        style={ styles.iconWrapper }
      >
        <item.icon fill={ color } />
      </TouchableOpacity>;
    }) }
  </View>;
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: width * 0.33,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: (Platform.OS === "ios") ? 25 : 5,
    paddingTop: 5,
    backgroundColor: "white",
    shadowColor: brandColors.snowBlue,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.75,
    shadowRadius: 15,
    elevation: 2
  }
});

export default HomeTabBar;
