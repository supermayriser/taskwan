import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";
import TaskwanLogo from "../../components/common/TaskwanLogo";
import { AuthStackNavigationList } from "../../navigation/AuthStack";
import { AuthStackScreensList } from "../../navigation/screens";
import EmailVerificationSVG from "../../../assets/svg/emailVerification.svg";
import FloatingHeader from "../../components/common/FloatingHeader";
import { brandColors } from "../../utils/colors";
import BrandButton from "../../components/common/BrandButton";

const { width } = Dimensions.get("window");

interface IProps {
  navigation: NativeStackNavigationProp<AuthStackNavigationList, AuthStackScreensList.VerifyEmail>;
  route: RouteProp<AuthStackNavigationList, AuthStackScreensList.VerifyEmail>;
}

const VerifyEmailScreen: React.FC<IProps> = ({ navigation, route }) => {
  const onPress = (): void => navigation.navigate(AuthStackScreensList.SigninScreen);

  return <SafeAreaWrapper>
    <FloatingHeader />

    <ScrollView
      contentContainerStyle={ styles.contentContainer }
      showsVerticalScrollIndicator={ false }
    >
      <TaskwanLogo />

      <View style={ styles.descriptionContainer }>
        <Text style={ styles.headerText }>Verify account</Text>

        <EmailVerificationSVG />

        <Text style={ styles.descriptionText }>Please click the verification link we send to your email
          : <Text style={ styles.emailHighlight }>{ route.params.email }</Text></Text>
      </View>

      <View style={ styles.buttonsContainer }>
        <BrandButton onPress={ onPress } text="Ok" />
      </View>
    </ScrollView>
  </SafeAreaWrapper>;
};

const styles = StyleSheet.create({
  emailHighlight: {
    textDecorationLine: "underline",
    color: brandColors.blue
  },
  buttonsContainer: {
    paddingHorizontal: 16,
    marginTop: 35
  },
  descriptionText: {
    color: brandColors.darkGrey,
    fontWeight: "500",
    lineHeight: 18,
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: width * 0.1,
    marginTop: 35
  },
  contentContainer: {
    paddingTop: 60
  },
  descriptionContainer: {
    paddingHorizontal: 15,
    alignItems: "center"
  },
  headerText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 50,
    marginTop: 60
  }
});

export default VerifyEmailScreen;
