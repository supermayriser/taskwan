import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";

import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";
import FocusAwareStatusBar from "../../components/common/FocusAwareStatusBar";
import { brandColors } from "../../utils/colors";
import HeaderBackButton from "../../components/common/HeaderBackButton";
import dayjs from "dayjs";
import CalendarIcon from "../../../assets/svg/smallCalendarIcon.svg";
import ActionInput from "../../components/common/ActionInput";
import RegularInput from "../../components/common/RegularInput";

const CreateTaskScreen: React.FC = () => {
  const [open, setOpen] = useState(false);

  const onDismissSingle = (): void => setOpen(false);

  const onDatePickerOpen = (): void => setOpen(true);

  const onConfirmSingle = ({ date }: any): void => {
    setOpen(false);

    // setFieldValue("birthDate", date);
  };

  const onTaskCreate = (): void => {

  }

  return <SafeAreaWrapper forcedColor={ brandColors.blue }>
    <FocusAwareStatusBar barStyle="dark-content" />

    <ScrollView
      showsVerticalScrollIndicator={ false }
      style={ styles.scrollViewContainer }
    >
      <HeaderBackButton titleText="Add Task" />

      <View style={ styles.container }>
        <View style={ styles.datesContainer }>
          <View style={ { width: "48%" } }>
            <ActionInput
              value={ dayjs(new Date()).format("MMM-D-YYYY") }
              onPress={ onDatePickerOpen }
              label="Start"
              icon={ <CalendarIcon /> }
            />
          </View>

          <View style={ { width: "48%" } }>
            <ActionInput
              value={ dayjs(new Date()).format("MMM-D-YYYY") }
              onPress={ onDatePickerOpen }
              label="End"
              icon={ <CalendarIcon /> }
            />
          </View>
        </View>

        <RegularInput
          value={ "" }
          handleChange={ () => {
          } }
          handleBlur={ () => {
          } }
          label="Title"
          touched={ false }
          errorMessage={ "error" }
          placeholder="Add title"
        />

        <RegularInput
          value={ "" }
          handleChange={ () => {
          } }
          handleBlur={ () => {
          } }
          label="Description"
          touched={ false }
          errorMessage={ "error" }
          placeholder="Add description"
        />

        <DatePickerModal
          locale="en"
          mode="single"
          visible={ open }
          onDismiss={ onDismissSingle }
          date={ new Date() }
          onConfirm={ onConfirmSingle }
        />
      </View>
    </ScrollView>
  </SafeAreaWrapper>;
};

const styles = StyleSheet.create({
  datesContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingBottom: 50,
    minHeight: "90%",
    paddingTop: 32,
    paddingHorizontal: 15
  },
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
