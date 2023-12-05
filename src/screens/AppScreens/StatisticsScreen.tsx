import React, { useMemo, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ProgressCircle from "react-native-progress-circle";

import CaretBack from "../../../assets/svg/Statistics/caretBack.svg";
import CaretForward from "../../../assets/svg/Statistics/catetForward.svg";
import { brandColors } from "../../utils/colors";
import FocusAwareStatusBar from "../../components/common/FocusAwareStatusBar";
import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";
import BackIcon from "../../../assets/svg/arrowLeft.svg";
import { AppStackParamList } from "../../navigation/AppStack";
import { HomeStackScreens } from "../../navigation/screens";

const { width } = Dimensions.get("window");

interface IProps {
  navigation: NativeStackNavigationProp<AppStackParamList, HomeStackScreens.Statistics>
}

const StatisticsScreen: React.FC<IProps> = ({ navigation }) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const changeFilterYear = (value: "add" | "subtract"): void => {
    if (value === "add") {
      setYear(year + 1);
    } else {
      setYear(year - 1);
    }
  };

  const goBack = (): void => navigation.goBack();

  const currentYear = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  return <SafeAreaWrapper forcedColor={ brandColors.blue }>
    <FocusAwareStatusBar barStyle="light-content" />

    <ScrollView
      showsVerticalScrollIndicator={ false }
      style={ styles.scrollViewContainer }
    >
      <View style={ styles.headerContainer }>
        <TouchableOpacity style={ styles.backButtonContainer } onPress={ goBack }>
          <BackIcon fill={ brandColors.blue } />
        </TouchableOpacity>

        <Text style={ styles.headerText }>Statistics</Text>

        {/* Transparent filler View */ }
        <View style={ { width: 36, height: 36 } } />
      </View>

      <View style={ styles.container }>
        <View style={ styles.dateRangeContainer }>
          <TouchableOpacity
            style={ styles.caretButton }
            onPress={ () => changeFilterYear("subtract") }
          >
            <CaretBack />
          </TouchableOpacity>

          <Text style={ styles.currentYearText }>{ year }</Text>

          <TouchableOpacity
            style={ [styles.caretButton, { marginLeft: 5 }] }
            onPress={ () => changeFilterYear("add") }
            disabled={ year === currentYear }
          >
            <CaretForward fill={ year === currentYear ? brandColors.grey : "#000000" } />
          </TouchableOpacity>
        </View>

        <View style={ styles.topStatisticsContainer }>
          <View style={ styles.valueContainer }>
            <Text style={ styles.subheaderText }>Total Tasks</Text>

            <Text style={ styles.tasksValue }>500</Text>
          </View>

          <View style={ styles.valueContainer }>
            <Text style={ styles.subheaderText }>Completed Tasks</Text>
            <Text style={ styles.tasksValue }>400</Text>
          </View>
        </View>

        <View style={ styles.datesStatisticsContainer }>
          <View style={ styles.dateStatisticsContainer }>
            <Text style={ styles.monthText }>January</Text>
            <ProgressCircle
              percent={ 30 }
              radius={ 50 }
              borderWidth={ 10 }
              color={ brandColors.blue }
              shadowColor="#e8e8e8"
              bgColor="#fff"
            >
              <Text style={ styles.progressText }>30%</Text>
            </ProgressCircle>
          </View>

          <View style={ styles.dateStatisticsContainer }>
            <Text style={ styles.monthText }>February</Text>
            <ProgressCircle
              percent={ 95 }
              radius={ 50 }
              borderWidth={ 10 }
              color={ brandColors.blue }
              shadowColor="#e8e8e8"
              bgColor="#fff"
            >
              <Text style={ styles.progressText }>95%</Text>
            </ProgressCircle>
          </View>

          <View style={ styles.dateStatisticsContainer }>
            <Text style={ styles.monthText }>December</Text>
            <ProgressCircle
              percent={ 15 }
              radius={ 50 }
              borderWidth={ 10 }
              color={ brandColors.blue }
              shadowColor="#e8e8e8"
              bgColor="#fff"
            >
              <Text style={ styles.progressText }>15%</Text>
            </ProgressCircle>
          </View>
        </View>
      </View>
    </ScrollView>
  </SafeAreaWrapper>;
};

const styles = StyleSheet.create({
  progressText: {
    color: brandColors.darkGrey,
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 15,
  },
  monthText: {
    color: brandColors.darkGrey,
    fontSize: 10,
    fontWeight: "500",
    marginBottom: 10,
  },
  dateStatisticsContainer: {
    alignItems: "center",
    width: "45%",
    marginBottom: 30,
  },
  datesStatisticsContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tasksValue: {
    fontSize: 40,
    fontWeight: "500",
  },
  subheaderText: {
    color: brandColors.darkGrey,
    fontSize: 10,
    fontWeight: "500",
    marginBottom: 11,
  },
  valueContainer: {
    alignItems: "center",
    height: 100,
    shadowColor: brandColors.snowBlue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: width * .42,
    paddingVertical: 10,
  },
  topStatisticsContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    marginBottom: 30,
  },
  caretButton: {
    paddingHorizontal: 30,
  },
  currentYearText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "400",
  },
  dateRangeContainer: {
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 47,
  },
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
  backButtonContainer: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 50,
  },
  scrollViewContainer: {
    flex: 1,
  },
});

export default StatisticsScreen;
