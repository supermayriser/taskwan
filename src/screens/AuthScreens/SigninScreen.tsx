import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";
import TaskwanLogo from "../../components/common/TaskwanLogo";
import IconInput from "../../components/common/IconInput";
import MessageIcon from "../../../assets/svg/InputIcons/messageIcon.svg";
import LockIcon from "../../../assets/svg/InputIcons/lockIcon.svg";
import { brandColors } from "../../utils/colors";
import BrandButton from "../../components/common/BrandButton";
import SocialLoginButton from "../../components/common/SocialLoginButton";
import { AuthStackNavigationList } from "../../navigation/AuthStack";
import { AuthStackScreensList } from "../../navigation/screens";
import { StoreContext } from "../../store/store";
import env from "../../../env.json";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Enter email"),
  password: Yup.string().min(2, "Password is too short").max(50, "Password is too long").required("Enter password")
});

interface IProps {
  navigation: NativeStackNavigationProp<AuthStackNavigationList, AuthStackScreensList.SigninScreen>;
}

const SigninScreen: React.FC<IProps> = ({ navigation }) => {
  const [isSignupLoading, setIsSignupLoading] = useState<boolean>(false);
  const {
    appSnackbar: [snackbar, setSnackbar],
    user: [user, setUser]
  } = useContext(StoreContext);

  const checkForToken = async (): Promise<void> => {
    const token = await AsyncStorage.getItem("welcome");
    if (token && token !== "visited") {
      navigation.navigate(AuthStackScreensList.WelcomeScreen);
    }
  };

  useEffect(() => {
    checkForToken();
  }, []);

  const onPasswordForgot = (): void => navigation.navigate(AuthStackScreensList.ForgotPassword);

  const onLogin = async (values: { email: string, password: string }): Promise<void> => {
    try {
      setIsSignupLoading(true);
      const currentUser = await auth().signInWithEmailAndPassword(values.email, values.password);
      if (currentUser.user.emailVerified) {
        setUser(currentUser.user);
      }
      if (!currentUser.user.emailVerified) {
        setSnackbar({
          visible: true,
          color: brandColors.red,
          text: "Your email hasn't been verified yet"
        });
        return setIsSignupLoading(false);
      }
    } catch (error: any) {
      if (error.code) {
        setSnackbar({
          visible: true,
          color: brandColors.red,
          text: error.nativeErrorMessage
        });
      } else {
        setSnackbar({
          visible: true,
          color: brandColors.red,
          text: "Something went wrong, try again later"
        });
      }

      setIsSignupLoading(false);
    }
  };

  const onSignupPress = (): void => navigation.navigate(AuthStackScreensList.SignupScreen);

  const onGoogleSignin = async (): Promise<void> => {
    const configure = { webClientId: env.webClientId };

    try {
      GoogleSignin.configure(configure);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      if (error.code && error.code !== "-5") {
        console.log("Error:", error);

        setSnackbar({
          visible: true,
          color: brandColors.red,
          text: "Something went wrong"
        });
      }
    }
  };

  // const onFacebookSignin = async (): Promise<void> => {
  //   try {
  //     // Attempt login with permissions
  //     const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
  //
  //     if (result.isCancelled) {
  //       setSnackbar({
  //         visible: true,
  //         color: brandColors.yellow,
  //         text: "User cancelled the login process",
  //       });
  //     }
  //
  //     // Once signed in, get the users AccessToken
  //     const data = await AccessToken.getCurrentAccessToken();
  //
  //     if (!data) {
  //       setSnackbar({
  //         visible: true,
  //         color: brandColors.red,
  //         text: "Something went wrong obtaining access token",
  //       });
  //     } else {
  //       // Create a Firebase credential with the AccessToken
  //       const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  //
  //       // Sign-in the user with the credential
  //       await auth().signInWithCredential(facebookCredential);
  //     }
  //   } catch (error: any) {
  //     if (error.code && error.code === "auth/account-exists-with-different-credential") {
  //       return setSnackbar({
  {/*        visible: true,*/
  }
  {/*        color: brandColors.red,*/
  }
  {/*        text: "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address",*/
  }
  {/*      });*/
  }
  {/*    }*/
  }

  //     setSnackbar({
  //       visible: true,
  //       color: brandColors.red,
  //       text: "Something went wrong during Facebook social sign in",
  //     });
  //   }
  // };

  return <SafeAreaWrapper>
    <ScrollView
      contentContainerStyle={ styles.contentContainer }
      showsVerticalScrollIndicator={ false }
    >
      <KeyboardAvoidingView behavior={ Platform.OS === "ios" ? "padding" : "height" }>
        <TaskwanLogo />

        <View style={ styles.loginContainer }>
          <Text style={ styles.headerText }>Login to your account</Text>

          <Formik
            initialValues={ { email: "", password: "" } }
            onSubmit={ values => onLogin(values) }
            validationSchema={ SigninSchema }
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
                  keyboardType="email-address"
                />

                <IconInput
                  placeholder="Password"
                  icon={ <LockIcon /> }
                  marginBottom={ 2 }
                  value={ values.password }
                  handleChange={ handleChange("password") }
                  handleBlur={ handleBlur("password") }
                  errorMessage={ errors.password }
                  touched={ touched.password }
                  secure
                />

                <TouchableOpacity style={ styles.forgetButtonWrapper } onPress={ onPasswordForgot }>
                  <Text style={ styles.passwordForgot }>Forgot password?</Text>
                </TouchableOpacity>

                <BrandButton loading={ isSignupLoading } onPress={ handleSubmit } text="Login" />
              </>
            ) }
          </Formik>
        </View>

        <View style={ styles.socialLoginContainer }>
          <Text><Text style={ styles.blueDashText }>-</Text> Or Login
            with <Text style={ styles.blueDashText }>-</Text>
          </Text>

          <View style={ styles.socialButtonsContainer }>
            <SocialLoginButton type="google" onPress={ onGoogleSignin } />
          </View>

          <View style={ styles.signupContainer }>
            <Text style={ styles.hintText }>Don't have an account? </Text>
            <TouchableOpacity onPress={ onSignupPress }>
              <Text style={ styles.signupText }>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  </SafeAreaWrapper>;
};

const styles = StyleSheet.create({
  hintText: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18
  },
  signupText: {
    color: brandColors.blue,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18
  },
  signupContainer: {
    flexDirection: "row"
  },
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
  forgetButtonWrapper: {
    marginBottom: 30
  },
  passwordForgot: {
    fontSize: 10,
    alignSelf: "flex-end",
    color: brandColors.paleBlue,
    lineHeight: 15
  },
  headerText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 50,
    marginTop: 60
  },
  loginContainer: {
    paddingHorizontal: 15
  },
  contentContainer: {
    paddingVertical: 60
  }
});

export default SigninScreen;
