import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import * as Yup from "yup";

import CurrentLocationIcon from "../../../assets/svg/currentLocationIcon.svg";
import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";
import { brandColors } from "../../utils/colors";
import BackIcon from "../../../assets/svg/arrowLeft.svg";
import { AppStackParamList } from "../../navigation/AppStack";
import { HomeStackScreens } from "../../navigation/screens";
import IconInput from "../../components/common/IconInput";
import LockIcon from "../../../assets/svg/InputIcons/lockIcon.svg";
import BrandButton from "../../components/common/BrandButton";

const PasswordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(2, "Password is too short")
    .max(50, "Password is too long")
    .required("Enter current password"),
  newPassword: Yup.string()
    .min(2, "Password is too short")
    .max(50, "Password is too long")
    .required("Enter new password"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Enter new confirm password")
});

interface IProps {
  navigation: NativeStackNavigationProp<AppStackParamList, HomeStackScreens.Security>;
}

const SecurityScreen: React.FC<IProps> = ({ navigation }) => {
  const goBack = (): void => navigation.goBack();

  const onPasswordChange = (values: any) => {

  };

  return <SafeAreaWrapper forcedColor={ brandColors.blue }>
    <ScrollView
      contentContainerStyle={ styles.contentContainer }
      showsVerticalScrollIndicator={ false }
    >
      <KeyboardAvoidingView behavior={ Platform.OS === "ios" ? "padding" : "height" }>
        <View style={ styles.headerContainer }>
          <TouchableOpacity style={ styles.backButtonContainer } onPress={ goBack }>
            <BackIcon fill={ brandColors.blue } />
          </TouchableOpacity>

          <Text style={ styles.headerText }>Security</Text>

          {/* Transparent filler View */ }
          <View style={ { width: 36, height: 36 } } />
        </View>
      </KeyboardAvoidingView>

      <View style={ styles.container }>
        <Formik
          initialValues={ { currentPassword: "", newPassword: "", confirmNewPassword: "" } }
          onSubmit={ values => onPasswordChange(values) }
          validationSchema={ PasswordChangeSchema }
        >
          { ({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <Text style={ styles.formLabel }>Password</Text>

              <IconInput
                placeholder="Current Password"
                icon={ <LockIcon /> }
                value={ values.currentPassword }
                handleChange={ handleChange("currentPassword") }
                handleBlur={ handleBlur("currentPassword") }
                errorMessage={ errors.currentPassword }
                touched={ touched.currentPassword }
                secure
              />

              <IconInput
                placeholder="New Password"
                icon={ <LockIcon /> }
                value={ values.newPassword }
                handleChange={ handleChange("newPassword") }
                handleBlur={ handleBlur("newPassword") }
                errorMessage={ errors.newPassword }
                touched={ touched.newPassword }
                secure
              />

              <IconInput
                placeholder="Confirm New Password"
                icon={ <LockIcon /> }
                value={ values.confirmNewPassword }
                handleChange={ handleChange("confirmNewPassword") }
                handleBlur={ handleBlur("confirmNewPassword") }
                errorMessage={ errors.confirmNewPassword }
                touched={ touched.confirmNewPassword }
                secure
              />

              <BrandButton onPress={ handleSubmit } text="Submit" loading={ false } />
            </View>
          ) }
        </Formik>

        <View style={ styles.loginActivityContainer }>
          <Text style={ styles.formLabel }>Login Activity</Text>

          <View style={ styles.locationContainer }>
            <CurrentLocationIcon />

            <View style={ styles.locationValueContainer }>
              <Text style={ styles.locationText }>Malang, Indonesia</Text>
              <Text style={ styles.statusText }>Active Now</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  </SafeAreaWrapper>;
};

const styles = StyleSheet.create({
  statusText: {
    color: brandColors.lightGrey,
    fontSize: 10,
    fontWeight: "400"
  },
  locationText: {
    color: "#000000",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 18
  },
  locationValueContainer: {
    marginLeft: 10
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  loginActivityContainer: {
    marginTop: 25
  },
  formLabel: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "500",
    color: brandColors.blue
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: 600,
    paddingVertical: 50,
    flex: 1,
    minHeight: "90%",
    paddingHorizontal: 15
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  },
  backButtonContainer: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 50
  },
  contentContainer: {
    paddingBottom: 60
  }
});

export default SecurityScreen;
