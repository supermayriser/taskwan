import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import auth from "@react-native-firebase/auth";

import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";
import TaskwanLogo from "../../components/common/TaskwanLogo";
import FloatingHeader from "../../components/common/FloatingHeader";
import MessageIcon from "../../../assets/svg/InputIcons/messageIcon.svg";
import IconInput from "../../components/common/IconInput";
import BrandButton from "../../components/common/BrandButton";
import { StoreContext } from "../../store/store";
import { brandColors } from "../../utils/colors";

const PasswordForgotSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Enter email"),
});

const ForgotPasswordScreen: React.FC = () => {
  const { appSnackbar: [snackbar, setSnackbar] } = useContext(StoreContext);

  const [isChangePasswordLoading, setChangePasswordLoading] = useState<boolean>(false);

  const onPasswordReset = async (values: { email: string }): Promise<void> => {
    try {
      setChangePasswordLoading(true);
      await auth().sendPasswordResetEmail(values.email);

      setSnackbar({
        visible: true,
        color: brandColors.blue,
        text: "Password reset link has been sent",
      });
    } catch (error) {
      setSnackbar({
        visible: true,
        color: brandColors.red,
        text: "Something went wrong, try again later",
      });
    } finally {
      setChangePasswordLoading(false);
    }
  };

  return <SafeAreaWrapper>
    <FloatingHeader />

    <ScrollView
      contentContainerStyle={ styles.contentContainer }
      showsVerticalScrollIndicator={ false }
    >
      <KeyboardAvoidingView behavior={ Platform.OS === "ios" ? "padding" : "height" }>
        <TaskwanLogo />

        <View style={ styles.formContainer }>
          <Text style={ styles.headerText }>Reset password</Text>

          <Formik
            initialValues={ { email: "", password: "" } }
            onSubmit={ values => onPasswordReset(values) }
            validationSchema={ PasswordForgotSchema }
          >
            { ({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <IconInput
                  icon={ <MessageIcon /> }
                  placeholder="Email"
                  value={ values.email }
                  handleChange={ handleChange("email") }
                  handleBlur={ handleBlur("email") }
                  errorMessage={ errors.email }
                  touched={ touched.email }
                />

                <BrandButton loading={ isChangePasswordLoading } onPress={ handleSubmit } text="Send" />
              </>
            ) }
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  </SafeAreaWrapper>;
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 50,
    marginTop: 60,
  },
  contentContainer: {
    paddingVertical: 60,
  },
});

export default ForgotPasswordScreen;
