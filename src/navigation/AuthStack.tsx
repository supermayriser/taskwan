import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthStackScreensList } from "./screens";
import WelcomeScreen from "../screens/AuthScreens/WelcomeScreen";
import SigninScreen from "../screens/AuthScreens/SigninScreen";
import SignupScreen from "../screens/AuthScreens/SignupScreen";
import VerifyEmailScreen from "../screens/AuthScreens/VerifyEmailScreen";
import ForgotPasswordScreen from "../screens/AuthScreens/ForgotPasswordScreen";

export type AuthStackNavigationList = {
  WelcomeScreen: undefined,
  SigninScreen: undefined,
  SignupScreen: undefined,
  VerifyEmail: { email: string },
  ForgotPassword: undefined
}

const Stack = createNativeStackNavigator<AuthStackNavigationList>();

const AuthStack: React.FC = () => {
  return <>
    <Stack.Navigator
      initialRouteName={ AuthStackScreensList.SigninScreen }
      screenOptions={ { header: () => null, fullScreenGestureEnabled: true } }
    >
      <Stack.Screen name={ AuthStackScreensList.WelcomeScreen } component={ WelcomeScreen } />
      <Stack.Screen name={ AuthStackScreensList.SigninScreen } component={ SigninScreen } />
      <Stack.Screen name={ AuthStackScreensList.SignupScreen } component={ SignupScreen } />
      <Stack.Screen name={ AuthStackScreensList.VerifyEmail } component={ VerifyEmailScreen } />
      <Stack.Screen name={ AuthStackScreensList.ForgotPassword } component={ ForgotPasswordScreen } />
    </Stack.Navigator>
  </>;
};

export default AuthStack;
