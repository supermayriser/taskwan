import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import auth from "@react-native-firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";
import TaskwanLogo from "../../components/common/TaskwanLogo";
import IconInput from "../../components/common/IconInput";
import MessageIcon from "../../../assets/svg/InputIcons/messageIcon.svg";
import LockIcon from "../../../assets/svg/InputIcons/lockIcon.svg";
import BrandButton from "../../components/common/BrandButton";
import { SignupFormType } from "../../utils/types";
import PersonIcon from "../../../assets/svg/InputIcons/person.svg";
import SocialLoginButton from "../../components/common/SocialLoginButton";
import { brandColors } from "../../utils/colors";
import { StoreContext } from "../../store/store";
import { AuthStackNavigationList } from "../../navigation/AuthStack";
import { AuthStackScreensList } from "../../navigation/screens";
import FloatingHeader from "../../components/common/FloatingHeader";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Enter email"),
  password: Yup.string().min(2, "Password is too short").max(50, "Password is too long").required("Enter password"),
  username: Yup.string().min(2, "Username is too short").required("Enter username"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Enter confirm password")
});

interface IProps {
  navigation: NativeStackNavigationProp<AuthStackNavigationList, AuthStackScreensList.SignupScreen>;
}

const SignupScreen: React.FC<IProps> = ({ navigation }) => {
  const { appSnackbar: [snackbar, setSnackbar] } = useContext(StoreContext);
  const [isSignupLoading, setIsSignupLoading] = useState<boolean>(false);

  const onSignup = (values: SignupFormType): void => {
    setIsSignupLoading(true);
    auth().createUserWithEmailAndPassword(values.email, values.password).then(userData => {
      userData.user.updateProfile({ displayName: values.username });

      userData.user.sendEmailVerification();

      setSnackbar({
        visible: true,
        color: brandColors.blue,
        text: "Success! We've sent a confirmation link to your email address"
      });

      setIsSignupLoading(false);
      navigation.navigate(AuthStackScreensList.VerifyEmail, { email: values.email });
    }).catch(error => {
      if (error.code === "auth/email-already-in-use") {
        setSnackbar({
          visible: true,
          color: brandColors.red,
          text: "That email address is already in use!"
        });
      }

      if (error.code === "auth/invalid-email") {
        setSnackbar({
          visible: true,
          color: brandColors.red,
          text: "That email address is invalid!"
        });
      }

      setIsSignupLoading(false);
    });
  };

  return <SafeAreaWrapper>
    <FloatingHeader />

    <ScrollView
      contentContainerStyle={ styles.contentContainer }
      showsVerticalScrollIndicator={ false }
    >
      <KeyboardAvoidingView behavior={ Platform.OS === "ios" ? "padding" : "height" }>
        <TaskwanLogo />

        <View style={ styles.loginContainer }>
          <Text style={ styles.headerText }>Create your account</Text>

          <Formik
            initialValues={ { email: "", password: "", username: "", confirmPassword: "" } }
            onSubmit={ values => onSignup(values) }
            validationSchema={ SignupSchema }
          >
            { ({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <IconInput
                  icon={ <PersonIcon /> }
                  placeholder="Username"
                  value={ values.username }
                  handleChange={ handleChange("username") }
                  handleBlur={ handleBlur("username") }
                  errorMessage={ errors.username }
                  touched={ touched.username }
                />

                <IconInput
                  icon={ <MessageIcon /> }
                  placeholder="Email"
                  value={ values.email }
                  handleChange={ handleChange("email") }
                  handleBlur={ handleBlur("email") }
                  errorMessage={ errors.email }
                  touched={ touched.email }
                  keyboardType="email-address"
                />

                <IconInput
                  placeholder="Password"
                  icon={ <LockIcon /> }
                  value={ values.password }
                  handleChange={ handleChange("password") }
                  handleBlur={ handleBlur("password") }
                  errorMessage={ errors.password }
                  touched={ touched.password }
                  secure
                />

                <IconInput
                  placeholder="Confirm password"
                  icon={ <LockIcon /> }
                  value={ values.confirmPassword }
                  handleChange={ handleChange("confirmPassword") }
                  handleBlur={ handleBlur("confirmPassword") }
                  errorMessage={ errors.confirmPassword }
                  touched={ touched.confirmPassword }
                  secure
                />

                <BrandButton onPress={ handleSubmit } text="Register" loading={ isSignupLoading } />
              </>
            ) }
          </Formik>
        </View>

        <View style={ styles.socialLoginContainer }>
          <Text><Text style={ styles.blueDashText }>-</Text> Or Login
            with <Text style={ styles.blueDashText }>-</Text>
          </Text>

          <View style={ styles.socialButtonsContainer }>
            <SocialLoginButton type="google" onPress={ () => null } />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  </SafeAreaWrapper>;
};

const styles = StyleSheet.create({
  socialButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20
  },
  blueDashText: {
    color: brandColors.blue
  },
  socialLoginContainer: {
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 50,
    marginTop: 60
  },
  contentContainer: {
    paddingVertical: 60
  },
  loginContainer: {
    paddingHorizontal: 15
  }
});

export default SignupScreen;
